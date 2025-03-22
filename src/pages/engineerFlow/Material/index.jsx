import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { profile , icon_dropdown_arrow } from '../../../assets/images';
import { Dropdown } from "react-bootstrap";
export const roleCheck = { role: "admin" };


const Material = () => {

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
    <Fragment>
      <main className="page-engineer-material d-flex">
        <div className="left-container left-container-100">
          <div className="row mt-4">
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
              <Dropdown>
                <Dropdown.Toggle className="dropdown-toggle fs-24-700">
                  MRM Site <img src={icon_dropdown_arrow} alt="" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>MRM Site 1</Dropdown.Item>
                  <Dropdown.Item>MRM Site 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="text-end btn-remove-add-group d-flex justify-content-end">
                <button className="btn btn-primary bg-primary text-light border-0 border-radius-2 fs-14-600 me-0" onClick={ () => navigate('/admin/engineermaterialcreate')} >Create</button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="tbl-container table-responsive">
                <table  className="text-center tbl-material ">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-dark text-center h-44">S.No</th>
                      <th className="fs-16-500 text-dark text-center h-44">Material List</th>
                      <th className="fs-16-500 text-dark text-center h-44">In Stock Quantity</th>
                      <th className="fs-16-500 text-dark text-center h-44">Required Quantity</th>
                      <th className="fs-16-500 text-dark text-center h-44">Level</th>
                      <th className="fs-16-500 text-dark text-center h-44">Request Status</th>
                      <th className="fs-16-500 text-dark text-center h-44">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <tr key={index}>
                        <td  className="fs-16-500 text-dark text-center h-44">{material.id}</td>
                        <td className="fs-16-500 text-dark text-center h-44">{material.name}</td>
                        <td className="fs-16-500 text-dark text-center h-44">{material.stock}</td>
                        <td className="fs-16-500 text-dark text-center h-44">{material.required}</td>
                        <td className="fs-16-500 text-dark text-center h-44"><sapn className="fs-12-400">{getLevelBadge(material.level)}</sapn></td>
                        <td className="fs-16-500 text-dark text-center h-44">{getStatusBadge(material.status)}</td>
                        <td className="fs-16-500 text-dark text-center h-44">
                          <a href="#" className="text-bright-royal-blue"  onClick={ () => navigate('/admin/engineermaterialview')}>
                            {material.action}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Material;
