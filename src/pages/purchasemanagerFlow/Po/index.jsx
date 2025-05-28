import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <div className="po-container">
      <div className="row mb-4">
        <div className="col-md-6">
          <h1 className="po-header-title">All POs</h1>
        </div>
        <div className="col-md-6">
          <div className="po-filter-action-bar">
            <select className="po-filter-select">
              <option>All</option>
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Pending</option>
            </select>
            <button
              className="po-create-btn"
              onClick={() => navigate("/purchasemanager/poCreate")}
            >
              + Create PO
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="po-table">
          <thead>
            <tr>
              <th>PO ID</th>
              <th>Project</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Contact No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPurchaseOrders?.length > 0 ? (
              allPurchaseOrders.map((po, index) => (
                <tr key={index}>
                  <td>{po.poId || "-"}</td>
                  <td>{po.projectName || "-"}</td>
                  <td>{po.vendor || "-"}</td>
                  <td>{po.deliveryStatusDate || "-"}</td>
                  <td>
                    <span className="po-status">
                      {po.deliveryStatus ? po.deliveryStatus : "Pending"}
                    </span>
                  </td>
                  <td>{po.vendorMobileNumber || "-"}</td>
                  <td>
                    <button
                      className="po-view-link"
                      onClick={() => navigate(`/purchasemanager/poDetails/${po.purchaseOrderId}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="po-empty">
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
