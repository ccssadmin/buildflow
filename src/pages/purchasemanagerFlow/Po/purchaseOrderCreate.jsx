import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { upsertPurchaseOrder } from "../../../store/actions/Purchase/purcharseorderidaction";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTicket } from "../../../hooks/Ceo/useTicket";

const PurchasemanagerPoCreate = () => {
  const location = useLocation();
  const { boqData, ticket } = location.state || {};
  const { createTicket } = useTicket();
  const [poData, setPoData] = useState({
    poNumber: "",
    poDate: new Date().toISOString().split("T")[0],
    vendorName: boqData?.vendorName || "",
    items: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize PO data from BOQ data if available
    if (boqData) {
      setPoData((prev) => ({
        ...prev,
        vendorName: boqData.vendorName || "",
        items:
          boqData.boqItems?.map((item) => ({
            itemId: item.boqItemsId,
            itemName: item.itemName,
            unit: item.unit,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
          })) || [],
      }));
    }
  }, [boqData]);

  // Generate a PO number when component mounts
  useEffect(() => {
    const generatePoNumber = () => {
      const prefix = "PO";
      const timestamp = Date.now().toString().slice(-6);
      return `${prefix}-${timestamp}`;
    };

    setPoData((prev) => ({
      ...prev,
      poNumber: generatePoNumber(),
    }));
  }, []);

  const handleCreatePO = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const empId = userData?.empId;
    const payload = {
      purchaseOrderId: 0,
      poId: poData.poNumber, // Ensure this is the correct name expected by the API
      poDate: poData.poDate,
      vendorName: poData.vendorName,
      boqId: boqData?.boqId || "",
      boqTitle: boqData?.boqName || "",
      createdBy: empId,
      Items: poData.items.map((item) => ({
        // itemId: item.itemId,
        itemName: item.itemName,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
      })),
    };

    const response = await dispatch(upsertPurchaseOrder(payload));
    if (response?.payload?.success) {
      toast.success("PO Created Successfully");
      const ticketResponse = await createTicket({
        poId: response?.payload?.data?.purchaseOrderId,
        ticketType: "PO_APPROVAL",
        assignTo: [1,2,7], // ✅ array of empIds
        createdBy: userData?.empId, // replace with actual logged-in user ID
      });

      console.log("ticketResponse", ticketResponse);
    }
    console.log("response", response);
  };

  return (
    <div className="container mt-4">
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "16px", color: "#333" }}>
          Purchase Order &gt;{" "}
          <span style={{ color: "#FF6F00" }}>Create PO</span>
        </h2>
      </div>

      <h3 className="mt-3">Create Purchase Order</h3>

      {/* Display message if no BOQ data was passed */}
      {!boqData && (
        <div className="alert alert-warning">
          No BOQ data found. Please select a BOQ to convert to a PO.
        </div>
      )}

      {/* Form Section */}
      <div className="row">
        <div className="col-md-4">
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">PO Number</Form.Label>
            <Form.Control type="text" value={poData.poNumber} disabled />
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">PO Date</Form.Label>
            <Form.Control
              type="date"
              value={poData.poDate}
              onChange={(e) => setPoData({ ...poData, poDate: e.target.value })}
            />
          </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group className="mb-3">
            <Form.Label className="text-black fs-5">Vendor</Form.Label>
            <Form.Control
              type="text"
              value={poData.vendorName}
              onChange={(e) =>
                setPoData({ ...poData, vendorName: e.target.value })
              }
            />
          </Form.Group>
        </div>
      </div>

      {boqData && (
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">BOQ Reference</Form.Label>
              <Form.Control
                type="text"
                value={boqData?.boqCode || ""}
                disabled
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">BOQ Title</Form.Label>
              <Form.Control
                type="text"
                value={boqData?.boqName || ""}
                disabled
              />
            </Form.Group>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="table-responsive mt-4">
        <Table bordered>
          <thead className="table-light">
            <tr>
              <th style={{ textAlign: "center" }}>S. No</th>
              <th style={{ textAlign: "center" }}>Item Name</th>
              <th style={{ textAlign: "center" }}>Unit</th>
              <th style={{ textAlign: "center" }}>Rate ₹</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "center" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {poData.items.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "center" }}>{item.itemName}</td>
                <td style={{ textAlign: "center" }}>{item.unit}</td>
                <td style={{ textAlign: "center" }}>{item.price}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Control
                    type="number"
                    size="sm"
                    value={item.quantity}
                    onChange={(e) => {
                      const updatedItems = [...poData.items];
                      updatedItems[index].quantity = Number(e.target.value);
                      updatedItems[index].total =
                        updatedItems[index].price * Number(e.target.value);
                      setPoData({ ...poData, items: updatedItems });
                    }}
                  />
                </td>
                <td style={{ textAlign: "center" }}>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Total Section */}
      <div
        className="d-flex justify-content-between align-items-center text-white p-3 mt-3"
        style={{ backgroundColor: "#ff6600" }}
      >
        <div>Total</div>
        <div>
          {poData.items
            .reduce((acc, item) => acc + (item.total || 0), 0)
            .toLocaleString()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button
          className="btn text-white"
          style={{ backgroundColor: "#ff6600" }}
          onClick={handleCreatePO}
        >
          Create PO
        </button>
      </div>
    </div>
  );
};

export default PurchasemanagerPoCreate;
