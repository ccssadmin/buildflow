import React from "react";

const MaterialScreen = () => {
  const tableStyle = {
    marginBottom: "2rem",
    border: "1px solid #dee2e6",
  };

  const headerStyle = {
    fontWeight: "bold",
    marginBottom: "1rem",
    fontSize: "20px",
  };

  const approvedStyle = { color: "green", fontWeight: "bold" };
  const pendingStyle = { color: "orange", fontWeight: "bold" };

  const cardStyle = {
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  const topBarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  };

  const indentRequests = [
    { material: "Cement (OPC 43)", unit: "Bags", qty: "100 Bags", status: "Approved" },
    { material: "TMT Bar 16mm", unit: "Tons", qty: "2 Tons", status: "Pending" },
  ];

  const materialsIssued = [
    {
      material: "Cement (OPC 43)",
      qty: "100 Bags",
      date: "16–04–2025",
      issuedBy: "Store In–Charge",
      issuedPerson: "Savannah Nguyen",
      receivedPerson: "Esther Howard",
    },
    {
      material: "TMT Bar 16mm",
      qty: "1.5 Tons",
      date: "16–04–2025",
      issuedBy: "Store In–Charge",
      issuedPerson: "Cody Fisher",
      receivedPerson: "Ralph Edwards",
    },
  ];

  const returnLogs = [
    { material: "Shuttering Ply", qty: "10 Sheets", reason: "Not used today" },
  ];

  const shortages = [
    { material: "TMT Bar 16mm", qty: "0.5 Tons", remark: "Partial Delivery" },
  ];

  return (
    <div className="container mt-4" style={{ fontFamily: "sans-serif" }}>
      <div style={topBarStyle}>
        <h4 className="fw-bold">MRM Site</h4>
        <div className="d-flex align-items-center gap-2">
          <input
            id="report-date"
            type="date"
            className="form-control"
            style={{ width: "160px", marginRight: "10px" }}
          />
          <button
            className="btn fw-bold"
            style={{ backgroundColor: "#FF6F00", color: "#FFFFFF" }}
          >
            Generate Report
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>Indent Requests</div>
        <table className="table table-bordered" style={tableStyle}>
          <thead className="thead-light">
            <tr>
              <th className="text-center">Material</th>
              <th className="text-center">Unit</th>
              <th className="text-center">Required Qty</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {indentRequests.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.material}</td>
                <td className="text-center">{item.unit}</td>
                <td className="text-center">{item.qty}</td>
                <td
                  className="text-center"
                  style={item.status === "Approved" ? approvedStyle : pendingStyle}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={headerStyle}>Material Issued</div>
        <table className="table table-bordered" style={tableStyle}>
          <thead className="thead-light">
            <tr>
              <th className="text-center">Material</th>
              <th className="text-center">Qty Issued</th>
              <th className="text-center">Date</th>
              <th className="text-center">Issued By</th>
              <th className="text-center">Issued Person</th>
              <th className="text-center">Received Person</th>
            </tr>
          </thead>
          <tbody>
            {materialsIssued.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.material}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.issuedBy}</td>
                <td className="text-center">{item.issuedPerson}</td>
                <td className="text-center">{item.receivedPerson}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={headerStyle}>Return Log</div>
        <table className="table table-bordered" style={tableStyle}>
          <thead className="thead-light">
            <tr>
              <th className="text-center">Material</th>
              <th className="text-center">Qty Returned</th>
              <th className="text-center">Reason</th>
            </tr>
          </thead>
          <tbody>
            {returnLogs.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.material}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={headerStyle}>Shortage / Pending Deliveries</div>
        <table className="table table-bordered" style={tableStyle}>
          <thead className="thead-light">
            <tr>
              <th className="text-center">Material</th>
              <th className="text-center">Qty Short</th>
              <th className="text-center">Remark</th>
            </tr>
          </thead>
          <tbody>
            {shortages.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center">{item.material}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-center">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialScreen;