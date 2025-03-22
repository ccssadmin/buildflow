import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile , icon_breadcrumb_arrow, cil_send } from '../../../assets/images';
import { Button, Form, Table } from "react-bootstrap";
export const roleCheck = { role: "admin" };

  
const RepMaterialCreateScreenrt = () => {

  const navigate = useNavigate();
  
  const reports = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    reportId: "Daily Report - DPR2025",
    projectName: "MAA - A Block",
    date: "14-03-2025",
    time: "06:00 pm",
    reportedBy: "Darrell",
    avatar: profile, 
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { rows });
    alert("BOQ Submitted Successfully!");
  };

  const [rows, setRows] = useState([{ itemName: "", unit: "", rate: "", quantity: "", total: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { itemName: "", unit: "", rate: "", quantity: "", total: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(newRows[index].rate) || 0;
      const quantity = parseFloat(newRows[index].quantity) || 0;
      newRows[index].total = rate * quantity;
    }

    setRows(newRows);
  };


  return (
    <Fragment>
      <main className="page-engineer-material create d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-left">
              <nav className="breadcrumb">
                <span className="fs-16-500 text-dark-gray">Material</span><img className="mx-2" src={icon_breadcrumb_arrow} alt="" /> <span className="fs-16-500 text-primary">Create</span>
              </nav>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-left">
              <h2 className="fs-28-700 my-3">New BOQ</h2>
            </div>
          </div>
          
          <div className="row mt-2">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label className="fs-20-500 text-dark mb-1">Title <span className="text-danger">*</span></Form.Label>
                      <Form.Control  className="text-neutral-gray fs-14-400 border-radius-4" type="text" placeholder="BOQ TITLE" required />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label  className="fs-20-500 text-dark mb-1">Description</Form.Label>
                      <Form.Control  className="text-neutral-gray fs-14-400 border-radius-4" type="text" placeholder="Write a description" />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label  className="fs-20-500 text-dark mb-1">Vendor</Form.Label>
                      <Form.Select className="border-radius-4">
                        <option className="text-neutral-gray fs-14-400">Select Vendor</option>
                        <option className="text-neutral-gray fs-14-400">Vendor 1</option>
                        <option className="text-neutral-gray fs-14-400">Vendor 2</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-4s">
                      <Form.Label  className="fs-20-500 text-dark mb-1">Approved By</Form.Label>
                      <Form.Select className="border-radius-4">
                        <option className="text-neutral-gray fs-14-400">Select Team</option>
                        <option className="text-neutral-gray fs-14-400">Team 1</option>
                        <option className="text-neutral-gray fs-14-400">Team 2</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Table bordered className="boq-table">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-light">S. No</th>
                      <th className="fs-16-500 text-light">Item Name</th>
                      <th className="fs-16-500 text-light">Unit</th>
                      <th className="fs-16-500 text-light">Rate</th>
                      <th className="fs-16-500 text-light">Quantity</th>
                      <th className="fs-16-500 text-light">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><Form.Control type="text" name="itemName" value={row.itemName} onChange={(e) => handleInputChange(index, e)} /></td>
                        <td><Form.Control type="text" name="unit" value={row.unit} onChange={(e) => handleInputChange(index, e)} /></td>
                        <td><Form.Control type="number" name="rate" value={row.rate} onChange={(e) => handleInputChange(index, e)} /></td>
                        <td><Form.Control type="number" name="quantity" value={row.quantity} onChange={(e) => handleInputChange(index, e)} /></td>
                        <td>{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="text-end">
                  <Button variant="link" className="text-primary btn-add-row my-4 me-0 p-0 border-0 fs-16-500 text-decoration-none" onClick={handleAddRow}>+ Add Column</Button>
                </div>

                <div className="text-end">
                  <Button type="submit" className="btn-primary bg-primary text-light border-0 border-radius-4"><img src={cil_send} alt="" className="me-2" /> Submit</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default RepMaterialCreateScreenrt;
