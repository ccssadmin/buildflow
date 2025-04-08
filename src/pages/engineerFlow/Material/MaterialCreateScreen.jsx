import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { classNames } from './../../../utils/customHelpers';

const MaterialCreateScreen = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { rows });
    alert("BOQ Submitted Successfully!");
  };

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
              <Form.Control type="text" placeholder="BOQ TITLE" required />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Description</Form.Label>
              <Form.Control type="text" placeholder="Write a description" />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Vendor</Form.Label>
              <Form.Select style={{ backgroundColor: '#FFFFFF' }}>
                <option>Select Vendor</option>
                <option>Vendor 1</option>
                <option>Vendor 2</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="text-black fs-5">Approved By</Form.Label>
              <Form.Select style={{ backgroundColor: '#FFFFFF' }}>
                <option>Select Team</option>
                <option>Team 1</option>
                <option>Team 2</option>
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
                <td className="border-0 bg-transparent" type="text" name="itemName" value={row.itemName} onChange={(e) => handleInputChange(index, e)}></td>
                <td className="border-0 bg-transparent" type="text" name="unit" value={row.unit} onChange={(e) => handleInputChange(index, e)} ></td>
                <td className="border-0 bg-transparent" type="number" name="rate" value={row.rate} onChange={(e) => handleInputChange(index, e)} ></td>
                <td className="border-0 bg-transparent" type="number" name="quantity" value={row.quantity} onChange={(e) => handleInputChange(index, e)} ></td>
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
