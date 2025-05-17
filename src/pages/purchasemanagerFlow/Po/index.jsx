import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllPurchaseOrder } from "../../../store/actions/Purchase/purcharseorderidaction";

export default function PurchaseOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allPurchaseOrders, loading, error } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(getAllPurchaseOrder());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#333" }}>All POs</h1>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              style={{
                width: "150px",
                height: "40px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ced4da",
                borderRadius : "none",
              }}
            >
              <option>All</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Pending</option>
            </select>
            <button
              className="btn"
              style={{
                width: "150px",
                height: "40px",
                backgroundColor: "#ff6600",
                color: "white",
                fontWeight: "500",
                borderRadius: "none"
              }}
              onClick={() => navigate("/purchasemanager/poCreate")}
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
              <th className="text-center">PO ID</th>
              <th className="text-center">Project</th>
              <th className="text-center">Vendor</th>
              <th className="text-center">Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Contact</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allPurchaseOrders?.length > 0 ? (
              allPurchaseOrders.map((po, index) => (
                <tr key={index}>
                  <td className="text-center">{po.poId || "-"}</td>
                  <td className="text-center">{po.projectName || "-"}</td>
                  <td className="text-center">{po.vendor || "-"}</td>
                  <td className="text-center">{po.deliveryStatusDate || "-"}</td>
                  <td className="text-center">
                    <span className="text-success">
                      {po.deliveryStatus ? po.deliveryStatus : "Pending"}
                    </span>
                  </td>
                  <td className="text-center">{po.vendorMobileNumber || "-"}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-link"
                      style={{ color: "#0d6efd", textDecoration: "none" }}
                      onClick={() => navigate(`/purchasemanager/poDetails/${po.purchaseOrderId}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No Purchase Orders found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
