import React from "react";
import { Form, Table, Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

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

    return (
        <div className="container mt-4">
            <div style={{ paddingTop: '20px', paddingBottom: '20px', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                    <span
                        onClick={() => navigate('/admin/engineermaterial')}
                        style={{ cursor: 'pointer' }}
                    >BOQ
                    </span> &gt; <span style={{ color: '#FF6F00' }}>View BOQ</span>
                </h2>
            </div>


            <h3 className="mt-3">New BOQ</h3>

            {/* Form Section */}
            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-black fs-5">Title <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" placeholder="BOQ TITLE" />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-black fs-5">Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter description" rows={1} />
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-black fs-5">Vendor</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle className="w-100 text-start border-0 custom-dropdown">
                                <span className="text-danger me-2">⬤</span>
                                <span>RK Enterprises</span>   <RiArrowDropDownLine />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Vendor 1</Dropdown.Item>
                                <Dropdown.Item>Vendor 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-3">
                        <Form.Label className="text-black fs-5">Send Approve</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle className="w-100 text-start border-0 custom-dropdown">
                                CEO   <RiArrowDropDownLine />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item>Manager</Dropdown.Item>
                                <Dropdown.Item>Director</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive">
                <Table bordered className="mt-3">
                    <thead className="table-light">
                        <tr>
                            <th style={{ textAlign: 'center' }}>S. No</th>
                            <th style={{ textAlign: 'center' }}>Item Name</th>
                            <th style={{ textAlign: 'center' }}>Unit</th>
                            <th style={{ textAlign: 'center' }}>Rate ₹</th>
                            <th style={{ textAlign: 'center' }}>Quantity</th>
                            <th style={{ textAlign: 'center' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boqData.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{item.id}</td>
                                <td style={{ textAlign: 'center' }}>{item.name}</td>
                                <td style={{ textAlign: 'center' }}>{item.unit}</td>
                                <td style={{ textAlign: 'center' }}>{item.rate}</td>
                                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'center' }}>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* Total & Action Buttons Section */}
            <div className="d-flex justify-content-between align-items-center bg-burnt-orange text-white p-3 rounded-bottom">
                <div className="text-white">Total</div>
                <div className="text-white">{boqData.reduce((acc, item) => acc + item.total, 0).toLocaleString()}</div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-outline-secondary d-flex align-items-center">
                    📝 Go Approval
                </button>
                <button className="btn btn-warning text-white d-flex align-items-center">
                    ⬇️ Download .xlsx
                </button>
            </div>

        </div>
    );
};

export default MaterialViewScreen;
