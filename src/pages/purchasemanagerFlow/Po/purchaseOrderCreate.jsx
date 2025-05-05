"use client"
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getNewPoId } from "../../../store/actions/Purchase/purcharseorderidaction";

export default function POViewPage({ params }) {
  
  
   const navigate = useNavigate();
   const { poId, loading } = useSelector((state) => state.purchase);
   const dispatch = useDispatch();
  

   useEffect(() => {
    dispatch(getNewPoId());
  }, [dispatch]);

  // Sample line items data
  const [lineItems, setLineItems] = useState([]);


  const handleInputChange = (index, field, value) => {
    const updatedItems = [...lineItems];
    updatedItems[index][field] = value;
  
    const rate = parseFloat(updatedItems[index].rate) || 0;
    const quantity = parseFloat(updatedItems[index].quantity) || 0;
  
    updatedItems[index].total = rate * quantity;
  
    setLineItems(updatedItems);
  };
  


  const handleAddRow = () => {
    const newId = lineItems.length + 1;
    const newRow = {
      id: newId,
      name: "",
      unit: "",
      rate: "",
      quantity: "",
      total: "",
    };
    setLineItems([...lineItems, newRow]);
  };

  return (
    <div className="container mt-4 mb-5">
      <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333", marginBottom: "24px" }}>Purchase Order</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
        <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              PO Id <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={loading ? "Loading..." : poId || ""}
              readOnly
              style={{
                padding: "10px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </div>

        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>Project</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                
                readOnly
                style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
              />
              <span className="input-group-text" style={{ backgroundColor: "white" }}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>
              Title <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
             
              readOnly
              style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>Description</label>
            <textarea
              className="form-control"
               readOnly
              style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px", minHeight: "38px" }}
            />
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>Vendor</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
              
                readOnly
                style={{ paddingLeft: "40px", padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
              />
              <div style={{ position: "absolute", left: "12px", top: "10px", zIndex: "5" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#ff6666",
                    borderRadius: "50%",
                    color: "white",
                    textAlign: "center",
                    lineHeight: "20px",
                    fontSize: "12px",
                  }}
                >
                  R
                </span>
              </div>
             
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label style={{ fontWeight: "500", marginBottom: "8px" }}>Send Approve</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
              
                readOnly
                style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
              />
              <span className="input-group-text" style={{ backgroundColor: "white" }}>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "80px" }}>S. No</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Item Name</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Unit</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Rate ₹</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Quantity</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555", width: "120px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
  {lineItems.map((item, index) => (
    <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
      <td className="text-center" style={{ padding: "12px 16px" }}>{item.id}</td>

      <td className="text-center">
        <input
          type="text"
          className="form-control"
          value={item.name}
          onChange={(e) => handleInputChange(index, "name", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="text"
          className="form-control"
          value={item.unit}
          onChange={(e) => handleInputChange(index, "unit", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={item.rate}
          onChange={(e) => handleInputChange(index, "rate", e.target.value)}
        />
      </td>

      <td className="text-center">
        <input
          type="number"
          className="form-control"
          value={item.quantity}
          onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
        />
      </td>

      <td className="text-center" style={{ padding: "12px 16px" }}>
        ₹ {(item.total || 0).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

      </table>
      
      <button
        className="btn"
        onClick={handleAddRow}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
        + Add New Row
      </button>
      </div>

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={() => navigate('../po')} style={{ padding: "8px 16px" }}>
            Back
          </button>
          <button className="btn" style={{ backgroundColor: "#ff6600", color: "white", padding: "8px 16px" }}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}