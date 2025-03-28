import React, { Fragment, useState } from "react";
import { x_mark, icon_gantt, icon_plus, icon_down_radius } from '../../../assets/images';
import { Button, Form } from "react-bootstrap";

export const roleCheck = { role: "admin" };

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
    <Fragment>
      <main className="page-add-task full-width d-flex">
        <div className="left-container">
            <div className="row mt-4 border-color-gray border-bottom border-2">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
                    <h2 className="fs-22-700">Chennai Site (A Block)</h2>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pe-0">
                    <div className="text-end btn-remove-add-group d-flex justify-content-end">
                        <button className="btn fs-16-500 text-dark-gray-color me-5"><img src={x_mark} alt="" />  Remove</button>
                        <button className="btn btn-primary bg-primary text-light border-0 border-radius-2 fs-14-600 me-0" >Add Task</button>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 text-left">
                    <h2 className="fs-22-700">Foundation Work</h2>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pe-0">
                    <div className="text-end btn-remove-add-group d-flex justify-content-end">
                        <button className="btn fs-16-500 btn-secondary border-radius-2 text-dark-gray border-0 me-0 bg-platinum-gray"><img src={icon_gantt} className="me-2" alt="" />  Gantt</button>
                    </div>
                </div>
            </div>
            <div className="row pt-0">
                <div className="tbl-container table-responsive pe-0">
                    <table  className="text-center tbl foundation-work">
                        <thead>
                            <tr className="">
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Work ID</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Active Name</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Start Date</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Planned End Days</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Finished Date</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Duration Days</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Delayed Days</th>
                                <th className="bg-platinum-gray-dark fs-16-500 text-center">Status Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <React.Fragment key={item.id}>
                                    <tr className="">
                                        <td className="text-light bg-burnt-orange text-center fs-16-500">{item.id}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange ">
                                            <div className="justify-content-between align-items-center d-flex">
                                                <div className="text-light">{item.name} <img src={icon_down_radius} className="ms-1" /></div>
                                                <Button className="cursor-pointer w-auto p-0 h-auto bg-transparent border-0" size="sm" onClick={() => addEmptyRow(item.id)}><img src={icon_plus} alt=""  /></Button>
                                            </div>
                                        </td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">{item.startDate}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">{item.endDate}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">{item.finishedDate}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">{item.duration}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">{item.delayedDays}</td>
                                        <td className="fs-16-500 text-light bg-burnt-orange text-center">
                                            Active
                                        </td>
                                    </tr>
                                        {item.subRows.map((subItem, index) => (
                                            <tr key={index} className="">
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="text" value={subItem.id} onChange={(e) => handleInputChange(item.id, index, "id", e.target.value)} />
                                                    ) : subItem.id}
                                                </td>
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="text"  value={subItem.name} onChange={(e) => handleInputChange(item.id,index, "name", e.target.value)} />
                                                    ) : subItem.name}
                                                </td>
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="date" value={subItem.startDate} onChange={(e) => handleInputChange(item.id, index, "startDate", e.target.value)} />
                                                        ) : subItem.startDate}
                                                </td>
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="date" value={subItem.endDate} onChange={(e) => handleInputChange(item.id, index, "endDate", e.target.value)} />
                                                    ) : subItem.endDate}
                                                </td>
                                                <td className="bg-white">    
                                                    {subItem.isNew ? (
                                                        <Form.Control type="date" value={subItem.finishedDate} onChange={(e) => handleInputChange(item.id, index, "finishedDate", e.target.value)} />
                                                    ) : subItem.finishedDate}
                                                </td>
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="text" value={subItem.duration} onChange={(e) => handleInputChange(item.id, index, "duration", e.target.value)} />
                                                    ) : subItem.duration}
                                                </td>
                                                <td className="bg-white">
                                                    {subItem.isNew ? (
                                                        <Form.Control type="text" value={subItem.delayedDays} onChange={(e) => handleInputChange(item.id, index, "delayedDays", e.target.value)} />
                                                    ) : subItem.delayedDays}
                                                </td>
                                                <td className="bg-white">
                                                    <Form.Select value={subItem.status} onChange={(e) => handleStatusChange(item.id, index, e.target.value)} >
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
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </Fragment>
  );
};
export default TaskTable;
