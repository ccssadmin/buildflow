import React, { useState } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Material = () => {
  const [selectedSite, setSelectedSite] = useState('MRM Site');

  const sites = ['MRM Site', 'ABC Site', 'XYZ Site'];

  const navigate = useNavigate();


  const materials = [
    { id: "01", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "High", status: "Pending", action: "View" },
    { id: "02", name: "Steel Rods (10mm)", stock: "150 Units", required: "200 Units", level: "Medium", status: "Approval", action: "View" },
    { id: "03", name: "Sand (Ton)", stock: "5 Tons", required: "8 Tons", level: "Low", status: "Low Stock", action: "Create" },
    { id: "04", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Rejected", action: "View" },
    { id: "05", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "06", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "07", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "08", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "09", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "10", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "11", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "12", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
    { id: "13", name: "Cement", stock: "200 Bags", required: "500 Bags", level: "Urgent", status: "Pending", action: "Create" },
  ];

  const getLevelBadge = (level) => {
    const levelColors = {
      High: "#D00416",
      Medium: "#F1C300",
      Low: "#30A335",
      Urgent: "#D00416",
    };
    return (
      <span className="level-badge" style={{ backgroundColor: levelColors[level], padding: "2px", borderRadius: "3px", color: "white" }}>
        {level}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "#F1C300",
      Approval: "#30A335",
      "Low Stock": "#606060",
      Rejected: "#D00416",
    };
    return (
      <span className="status-badge" style={{ color: statusColors[status] || "black" }}>
        {status}
      </span>
    );
  };

  return (
    <div className="container mt-4">
      <div className="header-section">
        <div className="site-dropdown-container" style={{ marginLeft: '15px' }}>
          <select
            className="form-select select-custom"
            style={{ backgroundColor: '#E8E8E8' }}
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
          >
            {sites.map((site, index) => (
              <option key={index} value={site}>{site}</option>
            ))}
          </select>
        </div>
        <Button className="create-button"
          onClick={() => navigate('/admin/engineermaterialcreate')}
        >Create</Button>
      </div>

      <div className="table-responsive">
        <Table bordered className="material-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Material List</th>
              <th>In Stock Quantity</th>
              <th>Required Quantity</th>
              <th>Level</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={index}>
                <td>{material.id}</td>
                <td>{material.name}</td>
                <td>{material.stock}</td>
                <td>{material.required}</td>
                <td>{getLevelBadge(material.level)}</td>
                <td>{getStatusBadge(material.status)}</td>
                <td>
                  <a href="#" className={material.action === "View" ? "text-primary" : "text-success"}
                    onClick={() => navigate('/admin/engineermaterialview')}
                  >
                    {material.action}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Material;
