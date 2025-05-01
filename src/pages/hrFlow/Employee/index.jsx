import { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeTable = () => {const [employees, setEmployees] = useState([
    { id: "EMP001", name: "Savannah Nguyen", status: "Active" },
    { id: "EMP002", name: "Jenny Wilson", status: "Inactive" },
    { id: "EMP003", name: "Robert Fox", status: "Active" },
    { id: "EMP004", name: "Esther Howard", status: "Active" },
    { id: "EMP005", name: "Arlene McCoy", status: "Active" },
    { id: "EMP006", name: "Annette Black", status: "Active" },
    { id: "EMP007", name: "Cameron Williamson", status: "Active" },
    { id: "EMP008", name: "Theresa Webb", status: "Active" },
    { id: "EMP009", name: "Jacob Jones", status: "Active" },
    { id: "EMP010", name: "Ralph Edwards", status: "Active" },
    { id: "EMP011", name: "Floyd Miles", status: "Active" },
    { id: "EMP012", name: "Bessie Cooper", status: "Active" },
    { id: "EMP013", name: "Devon Lane", status: "Active" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    department: "Civil",
    designation: "Site Engineer",
    status: "Active",
    contact: "",
  });

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (newEmployee.id && newEmployee.name) {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        id: "",
        name: "",
        department: "Civil",
        designation: "Site Engineer",
        status: "Active",
        contact: "",
      });
      setIsAdding(false);
    } else {
      alert("Please enter ID and Name");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewEmployee({
      id: "",
      name: "",
      department: "Civil",
      designation: "Site Engineer",
      status: "Active",
      contact: "",
    });
  };
  
  return (
    <div className="hrms-container">
      <div className="hrms-header">
        <h3 className="hrms-title">All Employee</h3>

        <div className="hrms-header-controls">
          <select className="hrms-dropdown">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <Link to="/ceo/addemployee" className="hrms-btn-orange  ">
  + Add Employee
</Link>
        </div>
      </div>

      <table className="hrms-table">
        <thead className="hrms-thead">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department || "Civil"}</td>
              <td>{emp.designation || "Site Engineer"}</td>
              <td className={emp.status === "Active" ? "hrms-text-success" : "hrms-text-danger"}>
                {emp.status}
              </td>
              <td>{emp.contact || "9876XXXXXX"}</td>
              <td>
                {emp.status === "Inactive" ? (
                  <a href="#" className="hrms-text-link">Assign</a>
                ) : (
                  "Assigned"
                )}
              </td>
            </tr>
          ))}

          {isAdding && (
            <tr>
              <td><input name="id" value={newEmployee.id} onChange={handleChange} className="hrms-input" /></td>
              <td><input name="name" value={newEmployee.name} onChange={handleChange} className="hrms-input" /></td>
              <td><input name="department" value={newEmployee.department} onChange={handleChange} className="hrms-input" /></td>
              <td><input name="designation" value={newEmployee.designation} onChange={handleChange} className="hrms-input" /></td>
              <td>
                <select name="status" value={newEmployee.status} onChange={handleChange} className="hrms-input">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
              <td><input name="contact" value={newEmployee.contact} onChange={handleChange} className="hrms-input" /></td>
              <td>
                <button onClick={handleSave} className="hrms-btn-save">Save</button>
                <button onClick={handleCancel} className="hrms-btn-cancel">Cancel</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeeTable ;