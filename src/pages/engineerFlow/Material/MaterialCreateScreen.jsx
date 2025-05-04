import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { classNames } from './../../../utils/customHelpers';
import { useDispatch, useSelector } from "react-redux";
import { getVendorsAndSubcontractors } from "../../../store/actions/vendor/getvendoraction";
import { fetchRoles } from "../../../store/actions/hr/designationaction";
import { upsertBoq } from "../../../store/actions/Engineer/upsertboqaction";

const MaterialCreateScreen = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([{ itemName: "", unit: "", rate: "", quantity: "", total: "" }]);
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.role);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [selectedVendorId, setSelectedVendorId] = useState("");


  const { vendors, loading, error } = useSelector((state) => state.vendor);

  const handleAddRow = () => {
    setRows([...rows, { itemName: "", unit: "", rate: "", quantity: "", total: "" }]);
  };
  const [approvedBy, setApprovedBy] = useState([]);

  const handleApproverChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setApprovedBy(selectedOptions);
  };

  const approverRoles = roles.filter(role =>
    ["CEO", "Head Finance", "Managing Director", "Project Manager"].includes(role.roleName)
  );

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
  
    // Auto-update total if rate or quantity changes
    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(updatedRows[index].rate) || 0;
      const quantity = parseFloat(updatedRows[index].quantity) || 0;
      updatedRows[index].total = rate * quantity;
    }
  
    setRows(updatedRows);
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      empId: 0,
      boqId: 0,
      boqName: title,
      boqDescription: description,
      boqItems: rows.map((row) => ({
        boqItemsId: 0,
        itemName: row.itemName,
        unit: row.unit,
        price: parseFloat(row.rate) || 0,
        quantity: parseFloat(row.quantity) || 0,
      })),
      assignTo: approvedBy.map(Number), // assuming approvedBy is an array of selected user IDs
      ticketType: "string", // adjust this if you have an actual type
      vendorId: parseInt(selectedVendorId),
    };
  
    dispatch(upsertBoq(data));
  };
  
  

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);
  


useEffect(() => {
  dispatch(getVendorsAndSubcontractors());
}, [dispatch]);

  return (
    <div className="container boq-form">
      <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
          <span
            onClick={() => navigate('/admin/engineermaterial')}
            style={{ cursor: 'pointer' }}
          >Material
          </span> &gt; <span style={{ color: '#FF6F00' }}>Create</span>
        </h2>
      </div>


      <h2 className="form-title">New BOQ</h2>

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Title <span className="text-danger">*</span></Form.Label>
              <Form.Control
  type="text"
  placeholder="BOQ TITLE"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  required
/>            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Description</Form.Label>
              <Form.Control
  type="text"
  placeholder="Write a description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Vendor</Form.Label>
              <Form.Select
  value={selectedVendorId}
  onChange={(e) => setSelectedVendorId(e.target.value)}
>  <option>Select Vendor</option>
  {vendors.map((vendor) => (
    <option key={vendor.id} value={vendor.id}>
      {vendor.vendorName}
    </option>
  ))}
</Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
<Form.Group className="mb-3">
  <Form.Label className="text-black fs-5">Approved By</Form.Label>
  <Form.Select style={{ backgroundColor: '#FFFFFF' }}>
    <option>Select Approver</option>
    {approverRoles.map((role) => (
      <option key={role.roleId} value={role.roleId}>
        {role.roleName}
      </option>
    ))}
  </Form.Select>
</Form.Group>

          </div>
        </div>


        <Table bordered className="boq-table">
          <thead className=" bg-orange text-white">
            <tr>
              <th className="text-center">S. No</th>
              <th className="text-center">Item Name</th>
              <th className="text-center">Unit</th>
              <th className="text-center">Rate</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody className="tbl">
  {rows.map((row, index) => (
    <tr key={index}>
      <td className="text-center">{index + 1}</td>

      <td className="border-0 bg-transparent">
        <input
          type="text"
          name="itemName"
          value={row.itemName}
          onChange={(e) => handleInputChange(index, e)}
          className="form-control"
        />
      </td>

      <td className="border-0 bg-transparent">
        <input
          type="text"
          name="unit"
          value={row.unit}
          onChange={(e) => handleInputChange(index, e)}
          className="form-control"
        />
      </td>

      <td className="border-0 bg-transparent">
        <input
          type="number"
          name="rate"
          value={row.rate}
          onChange={(e) => handleInputChange(index, e)}
          className="form-control"
        />
      </td>

      <td className="border-0 bg-transparent">
        <input
          type="number"
          name="quantity"
          value={row.quantity}
          onChange={(e) => handleInputChange(index, e)}
          className="form-control"
        />
      </td>

      <td className="text-center">{row.total}</td>
    </tr>
  ))}
</tbody>

        </Table>


        <div className="d-flex flex-column align-items-end mt-3">
          <Button
            variant=""
            className="text-orange bg-orange add-column-btn p-0 mb-3"
            onClick={handleAddRow}
          >
            + Add Column
          </Button>
          <Button type="submit" className="submit-btn">
          <FontAwesomeIcon icon={faPaperPlane} className="icon" style={{ color: 'white' }} />
            Submit
          </Button>
        </div>



      </Form>
    </div>
  );
};

export default MaterialCreateScreen;
