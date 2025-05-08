import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPurchaseOrderDetails } from "../../../store/actions/vendorflow/po-vendroaction";

const VendorEditPurchaseOrder = () => {
  const dispatch = useDispatch();
  const { purchaseOrderId } = useParams();

  const { selectedPurchaseOrder, loading, error } = useSelector(
    (state) => state.purchaseOrder
  );

  useEffect(() => {
    if (purchaseOrderId) {
      dispatch(getPurchaseOrderDetails(purchaseOrderId));
    }
  }, [dispatch, purchaseOrderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedPurchaseOrder) return <p>No data found</p>;

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">All PO</li>
            <li className="breadcrumb-item active text-warning" aria-current="page">
              Open
            </li>
          </ol>
        </nav>
      </div>

      <h3>Purchase Order</h3>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">PO Id <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            value={selectedPurchaseOrder.poId}
            readOnly
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Project</label>
          <input
            type="text"
            className="form-control"
            value={selectedPurchaseOrder.projectName}
            readOnly
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Status</label>
          <div className="form-control text-warning bg-light">
            {selectedPurchaseOrder.status || "Pending"}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-bold">Dispatch Date</label>
          <input
            type="text"
            className="form-control"
            value={selectedPurchaseOrder.dispatchDate || "N/A"}
            readOnly
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Additional Notes</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Write a note……"
          value={selectedPurchaseOrder.notes || ""}
          readOnly
        ></textarea>
      </div>

      <h5 className="mb-3 fw-bold">Item Details</h5>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>S. No</th>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Rate ₹</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedPurchaseOrder.purchaseOrderItems?.map((item, idx) => (
            <tr key={item.purchaseOrderItemsId || idx}>
              <td>{String(idx + 1).padStart(2, "0")}</td>
              <td>{item.itemName}</td>
              <td>{item.unit}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Status Button */}
      <div className="mt-4">
        <button className="btn btn-success">Update Status</button>
      </div>
    </div>
  );
};

export default VendorEditPurchaseOrder;
