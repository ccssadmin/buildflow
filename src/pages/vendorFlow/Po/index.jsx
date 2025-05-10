import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrdersByVendorId } from "../../../store/actions/vendorflow/po-vendroaction";
import { Link } from "react-router-dom";

export default function VendorPurchaseOrder() {
  const dispatch = useDispatch();
  const { purchaseOrders, loading, error } = useSelector((state) => state.purchaseOrder);
  const vendorId = localStorage.getItem("vendorId");
  localStorage.setItem("vendorId", vendorId);

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const vendorId = userData?.vendorId;
  
  if (vendorId) {
    dispatch(getPurchaseOrdersByVendorId(vendorId));
  }
}, [dispatch]);

  

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Po</h3>

      {loading ? (
        <p>Loading purchase orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : purchaseOrders.length === 0 ? (
        <p>No purchase orders found for this vendor.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>PO Number</th>
                <th>Project Name</th>
                <th>Contact No.</th>
                <th>Date Received</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.purchaseOrderId}>
                  <td>{po.poId}</td>
                  <td>{po.projectName}</td>
                  <td>9123212135</td> {/* Static as in your image */}
                  <td>{formatDate(po.createdAt)}</td>
                  <td>{formatDate(po.createdAt)}</td> {/* Delivery date not in response, using same */}
                  <td className={`text-capitalize fw-semibold ${getStatusColorClass(po.status)}`}>
                    {po.status}
                  </td>
                  <td>
                    {po.status === "completed" ? (
                      <a href="#" className="text-primary text-decoration-none">View</a>
                    ) : <Link
                    to={`/vendor/editpo/${po.purchaseOrderId}`}
                    className="text-primary text-decoration-none"
                  >
                    Update Status
                  </Link>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const getStatusColorClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending": return "text-warning";
    case "completed": return "text-success";
    case "dispatched": return "text-info";
    default: return "text-secondary";
  }
};
