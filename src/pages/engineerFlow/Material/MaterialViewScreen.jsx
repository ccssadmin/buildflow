import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { profile , icon_breadcrumb_arrow, icon_approval, icon_download } from '../../../assets/images';
import { Form, Table } from "react-bootstrap";
export const roleCheck = { role: "admin" };

  
const MaterialViewScreen = () => {

  const navigate = useNavigate();
  const boqData = [
    { id: "01", name: "Dalmia Cements", unit: "Bag", rate: 321, quantity: 12, total: 3852 },
    { id: "02", name: "MTR TMT Rod", unit: "Piece", rate: 86, quantity: 54, total: 4644 },
    { id: "03", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "04", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "05", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "06", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "07", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "08", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
    { id: "09", name: "Engineer Helmet", unit: "Piece", rate: 300, quantity: 12, total: 3600 },
];
 // Calculate the total sum dynamically
 const totalSum = boqData.reduce((acc, item) => acc + item.total, 0);

 // Function to export table data to Excel
 const exportToExcel = () => {
   const ws = XLSX.utils.json_to_sheet(boqData); // Convert table data to sheet format
   const wb = XLSX.utils.book_new(); // Create a new workbook
   XLSX.utils.book_append_sheet(wb, ws, "BOQ Data"); // Append the sheet to the workbook

   // Write the workbook to a file
   XLSX.writeFile(wb, "boq_data.xlsx");
 };

  return (
    <Fragment>
      <main className="page-engineer-material create view d-flex">
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
              <Form>
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
                      <Form.Label  className="fs-20-500 text-dark mb-1">Send Approve</Form.Label>
                      <Form.Select className="border-radius-4">
                        <option className="text-neutral-gray fs-14-400">Select Approver</option>
                        <option className="text-neutral-gray fs-14-400">MD</option>
                        <option className="text-neutral-gray fs-14-400">CEO</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>

                <Table bordered className="boq-table tbl">
                  <thead>
                    <tr>
                      <th className="fs-16-500 text-light">S. No</th>
                      <th className="fs-16-500 text-light">Item Name</th>
                      <th className="fs-16-500 text-light">Unit</th>
                      <th className="fs-16-500 text-light">Rate ₹</th>
                      <th className="fs-16-500 text-light">Quantity</th>
                      <th className="fs-16-500 text-light">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                        {boqData.map((item, index) => (
                            <tr key={index}>
                                <td className="fs-16-500 text-dark-gray">{item.id}</td>
                                <td className="fs-16-500 text-dark-gray">{item.name}</td>
                                <td className="fs-16-500 text-dark-gray">{item.unit}</td>
                                <td className="fs-16-500 text-dark-gray">{item.rate}</td>
                                <td className="fs-16-500 text-dark-gray">{item.quantity}</td>
                                <td className="fs-16-500 text-dark-gray">{item.total}</td>
                            </tr>
                        ))}
                  </tbody>
                </Table>
                <div className="tbl-footer bg-primary h40px d-flex justify-content-between align-items-center ps-3">
                    <div className="fs-16-500 text-light">
                        Total
                    </div>
                    <div className="fs-16-500 amt text-light">
                    {totalSum.toLocaleString()}
                    </div>
                </div>
                <div className="btn-group-footer d-flex justify-content-end my-5">
                    <Link className="btn btn-approvel me-3 "><img src={icon_approval} className="me-2" alt="" />Go Approval</Link>
                    <Link className="btn btn-download m-0"><img src={icon_download} className="me-2" alt="" />Download . xslx</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default MaterialViewScreen;
