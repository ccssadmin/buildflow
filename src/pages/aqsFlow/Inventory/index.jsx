import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


const Inventory = () => {
  const [selectedSite, setSelectedSite] = useState("MRM Site");

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  const stockInward = [
    {
      grn: "GRN-10234",
      item: "Cement (50kg)",
      vendor: "SK Constructions",
      quantity: "500 Bags",
      date: "10 March 2025",
      receivedBy: "Site Engineer",
      status: "Approved",
    },
    {
      grn: "GRN-10235",
      item: "Steel Rods (10mm)",
      vendor: "KL Materials",
      quantity: "200 Units",
      date: "12 March 2025",
      receivedBy: "Store Manager",
      status: "Pending",
    },
    {
      grn: "GRN-10234",
      item: "Sand (Ton)",
      vendor: "SK Constructions",
      quantity: "5 Tons",
      date: "15 March 2025",
      receivedBy: "Site Engineer",
      status: "Rejected",
    },
  ];

  const stockOutward = [
    {
      issueNo: "ISS-5021",
      item: "Cement (50kg)",
      requestedBy: "Site Engineer",
      quantity: "250 Bags",
      issuedTo: "Site A",
      date: "11 March 2025",
      status: "Approved",
    },
    {
      issueNo: "ISS-5022",
      item: "Steel Rods (10mm)",
      requestedBy: "Civil Supervisor",
      quantity: "100 Units",
      issuedTo: "Site B",
      date: "13 March 2025",
      status: "Pending",
    },
    {
      issueNo: "ISS-5023",
      item: "Sand (Ton)",
      requestedBy: "Site Engineer",
      quantity: "2 Tons",
      issuedTo: "Site A",
      date: "16 March 2025",
      status: "Rejected",
    },
  ];

  return (
    <div className="inventory-container">
      {/* MRM Site Dropdown */}
      <div className="site-header">
      <div className="site-dropdown-container">
        <select className="site-dropdown" value={selectedSite} onChange={handleSiteChange}>
          <option>MRM Site</option>
          <option>ABC Construction</option>
          <option>XYZ Builders</option>
        </select>
      </div>
      </div>

      {/* Stock Inward */}
      <div className="table-header">
        <h3>Stock Inward</h3>
        <button className="add-stock-btn">+ Add Stock</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>GRN</th>
              <th>Item Name</th>
              <th>Vendor Name</th>
              <th>Quantity Received</th>
              <th>Date Received</th>
              <th>Received By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {stockInward.map((stock, index) => (
    <tr key={index}>
      <td>{stock.grn}</td>
      <td>{stock.item}</td>
      <td>
      {stock.vendor}
      <div className="d-flex">
        <img 
          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // Replace with the correct image path
          alt={stock.vendor}
          className="vendor-image"
        />
        <span>Sri Karthi</span>
      </div>
       
      </td>
      <td>{stock.quantity}</td>
      <td>{stock.date}</td>
      <td>{stock.receivedBy}
      <div className="d-flex">
        <img 
          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // Replace with the correct image path
          alt={stock.vendor}
          className="vendor-image"
        />
        <span>Sri Karthi</span>
      </div></td>
      <td className={`status ${stock.status.toLowerCase()}`}>
        {stock.status}
      </td>
      <td className="view-action">
        <a href={`/inventory/${stock.grn}`} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Stock Outward */}
      <div className="table-header">
        <h3>Stock Outward</h3>
        <button className="issue-stock-btn">+ Issue Stock</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Issue No.</th>
              <th>Item Name</th>
              <th>Requested By</th>
              <th>Issued Quantity</th>
              <th>Issued To</th>
              <th>Date Issued</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockOutward.map((stock, index) => (
              <tr key={index}>
                <td>{stock.issueNo}</td>
                <td>{stock.item}</td>
                <td>{stock.requestedBy}
                <div className="d-flex">
        <img 
          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // Replace with the correct image path
          alt={stock.vendor}
          className="vendor-image"
        />
        <span>Sri Karthi</span>
      </div></td>
                <td>{stock.quantity}</td>
                <td>{stock.issuedTo}</td>
                <td>{stock.date}</td>
                <td className={`status ${stock.status.toLowerCase()}`}>
                  {stock.status}
                </td>
                <td className="view-action"><a href={`/inventory/${stock.grn}`} target="_blank" rel="noopener noreferrer">
                    View
                  </a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;