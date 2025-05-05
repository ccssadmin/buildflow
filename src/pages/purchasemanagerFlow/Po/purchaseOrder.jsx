"use client"
import { useNavigate, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"

export default function POViewPage({ params }) {
  
  
   const navigate = useNavigate();

   const { purchaseOrderId } = useParams();

   console.log("Received Purchase Order ID:", purchaseOrderId);

  // Sample line items data
  const lineItems = [
    { id: "01", name: "Dalmia Cements", unit: "Bag", rate: 321, quantity: 12, total: 3852 },
    { id: "02", name: "MTR TMT Rod", unit: "", rate: 86, quantity: 54, total: 4644 },
    { id: "03", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "04", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "05", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "06", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "07", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "08", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
  ]

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
              value="PO-10234"
              readOnly
              style={{ padding: "10px 12px", border: "1px solid #ced4da", borderRadius: "4px" }}
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
                value="NRM Site"
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
              value="BOQ TITLE"
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
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
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
                value="RK Enterprises"
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
                value="CEO"
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
            {lineItems.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.id}</td>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.name}</td>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.unit}</td>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.rate}</td>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.quantity}</td>
                <td className="text-center" style={{ padding: "12px 16px" }}>{item.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
