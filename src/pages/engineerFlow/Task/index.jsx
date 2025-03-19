import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button ,Form} from "react-bootstrap";


const TaskTable = () => {
    const initialData = [
        { 
            id: "MA-00125", name: "2 Floor ", startDate: "14-03-2025", endDate: "18-04-2025", finishedDate: "-", duration: "34 Days", delayedDays: "4 Days", status: "Active", 
            subRows: [
                { id: "ID-001", name: "Block Work", startDate: "14-03-2025", endDate: "20-03-2025", finishedDate: "22-03-2025", duration: "6 Days", delayedDays: "8 Days", status: "Completed" },
                { id: "ID-002", name: "Plastering", startDate: "23-03-2025", endDate: "26-03-2025", finishedDate: "-", duration: "3 Days", delayedDays: "-", status: "To Do" },
                { id: "ID-003", name: "Flooring", startDate: "27-03-2025", endDate: "30-03-2025", finishedDate: "-", duration: "3 Days", delayedDays: "-", status: "To Do" },
                { id: "ID-004", name: "Joineries", startDate: "31-03-2025", endDate: "02-04-2025", finishedDate: "-", duration: "2 Days", delayedDays: "-", status: "To Do" },
                { id: "ID-005", name: "False Ceiling", startDate: "04-04-2025", endDate: "08-04-2025", finishedDate: "-", duration: "2 Days", delayedDays: "-", status: "To Do" }
            ]
        },
        { 
            id: "MA-00126", name: "3 Floor", startDate: "14-03-2025", endDate: "18-04-2025", finishedDate: "21-03-2025", duration: "7 Days", delayedDays: "-", status: "To Do", 
            subRows: [
                { id: "ID-100", name: "Joineries", startDate: "31-03-2025", endDate: "02-04-2025", finishedDate: "-", duration: "2 Days", delayedDays: "-", status: "To Do" },
                { id: "ID-200", name: "Painting", startDate: "10-04-2025", endDate: "18-04-2025", finishedDate: "-", duration: "2 Days", delayedDays: "-", status: "To Do" }
            ]
        }
    ];

    const [data, setData] = useState(initialData);
    // Remove this line
    // const [hoveredRow, setHoveredRow] = useState(null);

    const addTaskRow = () => {
        const newTask = {
            id: "", 
            name: "", 
            startDate: "", 
            endDate: "", 
            finishedDate: "", 
            duration: "", 
            delayedDays: "", 
            status: "To Do", 
            subRows: [],
            isNew: true // Add this to enable input fields
        };
        setData([...data, newTask]);
    };
     

  
   
    const addEmptyRow = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        subRows: [...item.subRows, {
                            id: "", name: "", startDate: "", endDate: "", finishedDate: "", duration: "", delayedDays: "", status: "To Do", isNew: true
                        }]
                    }
                    : item
            )
        );
    };

    const handleInputChange = (mainId, subIndex, field, value) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === mainId
                    ? {
                        ...item,
                        subRows: item.subRows.map((subItem, index) =>
                            index === subIndex ? { ...subItem, [field]: value } : subItem
                        )
                    }
                    : item
            )
        );
    };

    const handleMainStatusChange = (mainId, newStatus) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === mainId ? { ...item, status: newStatus } : item
            )
        );
    };

    const handleStatusChange = (mainId, subIndex, value) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === mainId
                    ? { ...item, subRows: item.subRows.map((subItem, index) => index === subIndex ? { ...subItem, status: value } : subItem) }
                    : item
            )
        );
    };

    
    return (
        <div className="container mt-4" style={{ width: "1220px", height: "787px" }}>
            {/* Header Section */}
            <div className="header-section d-flex justify-content-between align-items-center">
                <h2>Chennai Site (A Block)</h2>
                <div>
                    <button className="btn btn-outline-secondary me-2">x  Remove</button>
                    <button className="btn btn-warning" onClick={addTaskRow}>Add Task</button>
                </div>
            </div>

            <div className="flex items-center justify-between">
  {/* Title */}
  <div style={{ borderTop: "2px solid black", paddingTop: "10px" }} className="d-flex justify-content-between align-items-center">
  <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-black pl-3">
    Foundation Work
  </h3>
  <button 
    className="btn d-flex align-items-center px-3 py-1" 
    style={{ 
      backgroundColor: "#e9ecef", 
      color: "black", 
      border: "none", 
      borderRadius: "5px",
      fontWeight: "bold"
    }}
  >
    <span className="me-2">☰</span> Gantt
  </button>
</div>


  
</div>


            {/* Task Table */}
            <div className="container mt-4">
                <Table striped bordered hover className="table-responsive text-center">
                    <thead>
                        <tr className="table-header">
                            <th>Work ID</th>
                            <th>Active Name</th>
                            <th>Start Date</th>
                            <th>Planned End Days</th>
                            <th>Finished Date</th>
                            <th>Duration Days</th>
                            <th>Delayed Days</th>
                            <th>Status Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr
                                    className="fw-bold"
                                
                                >
                                    <td>{item.id}</td>
                                    <td>
                                        {item.name}{" "}
                                        <Button variant="outline-dark" size="sm" onClick={() => addEmptyRow(item.id)}>+</Button>
                                    </td>
                                    <td>{item.startDate}</td>
                                    <td>{item.endDate}</td>
                                    <td>{item.finishedDate}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.delayedDays}</td>
                                    <td>
                                        <Form.Select
                                            value={item.status}
                                            onChange={(e) => handleMainStatusChange(item.id, e.target.value)}
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                        </Form.Select>
                                    </td>
                                </tr>

                            {item.subRows.map((subItem, index) => (
                                <tr key={index} className="bg-light">
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="text"
                                                value={subItem.id}
                                                onChange={(e) => handleInputChange(item.id, index, "id", e.target.value)}
                                            />
                                        ) : subItem.id}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="text"
                                                value={subItem.name}
                                                onChange={(e) => handleInputChange(item.id, index, "name", e.target.value)}
                                            />
                                        ) : subItem.name}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="date"
                                                value={subItem.startDate}
                                                onChange={(e) => handleInputChange(item.id, index, "startDate", e.target.value)}
                                            />
                                        ) : subItem.startDate}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="date"
                                                value={subItem.endDate}
                                                onChange={(e) => handleInputChange(item.id, index, "endDate", e.target.value)}
                                            />
                                        ) : subItem.endDate}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="date"
                                                value={subItem.finishedDate}
                                                onChange={(e) => handleInputChange(item.id, index, "finishedDate", e.target.value)}
                                            />
                                        ) : subItem.finishedDate}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="text"
                                                value={subItem.duration}
                                                onChange={(e) => handleInputChange(item.id, index, "duration", e.target.value)}
                                            />
                                        ) : subItem.duration}
                                    </td>
                                    <td>
                                        {subItem.isNew ? (
                                            <Form.Control
                                                type="text"
                                                value={subItem.delayedDays}
                                                onChange={(e) => handleInputChange(item.id, index, "delayedDays", e.target.value)}
                                            />
                                        ) : subItem.delayedDays}
                                    </td>
                                    <td>
                                        <Form.Select
                                            value={subItem.status}
                                            onChange={(e) => handleStatusChange(item.id, index, e.target.value)}
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="To Do">To Do</option>
                                            <option value="Progress">Progress</option>
                                            <option value="Fail">Fail</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default TaskTable;