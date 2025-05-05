import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"

export default function PurchaseOrdersPage() {
  
      const navigate = useNavigate();

  // Sample data based on the screenshot

  const purchaseOrders = Array(13).fill({
    id: "#PO001",
    project: "Chennai Site",
    vendor: "SS Enterprise",
    date: "24-04-2025",
    status: "In Transit",
    contactNo: "9876XXXXXX",
  })

 

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>All POs</h1>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="d-flex gap-2">
            <div className="position-relative">
              <select
                className="form-select"
                style={{ minWidth: "120px", backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
              >
                <option>All</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Pending</option>
              </select>
            </div>
            <button 
            className="btn" style={{ backgroundColor: "#ff6600", color: "white", fontWeight: "500" }}
            onClick={() => navigate('/purchasemanager/poCreate')}
            >
              + Create PO
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th className="text-center"  style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>PO ID</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Project</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Vendor</th>
              <th className="text-center"  style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Date</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Status</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Contact No</th>
              <th className="text-center" style={{ padding: "12px 16px", fontWeight: "500", color: "#555" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={{ padding: "12px 16px" }}>{po.id}</td>
                <td style={{ padding: "12px 16px" }}>{po.project}</td>
                <td style={{ padding: "12px 16px" }}>{po.vendor}</td>
                <td style={{ padding: "12px 16px" }}>{po.date}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ color: "#28a745", fontWeight: "500" }}>{po.status}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>{po.contactNo}</td>
                <td style={{ padding: "12px 16px" }}>
                  <a
                    href="#"
                    
                    style={{ color: "#0d6efd", textDecoration: "none" }}
                    onClick={() => navigate('/purchasemanager/poDetails')}
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
