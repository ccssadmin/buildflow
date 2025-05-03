import React, { useEffect } from "react";
import "../../../styles/components/css/hr/hrms.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getEmployees } from "../../../store/actions/hr/createemployeaction";
import { FileEdit } from "lucide-react";

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employeeList = [], loading, error } = useSelector((state) => state.employee);
  const navigate = useNavigate();

  console.log("employee:",employeeList);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);


  const handleDelete = (empId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(empId))
        .unwrap()
        .then((res) => {
          console.log("Delete success:", res);
          alert("Employee deleted successfully.");
        })
        .catch((err) => {
          console.error("Delete failed:", err);
          alert("Failed to delete employee.");
        });
        
    }
    
  };
  
  
  
  
  return (
    <div className="hrms-container">
      <div className="hrms-header">
        <h3 className="hrms-title">All Employee</h3>

        <div className="hrms-header-controls">
          <select className="hrms-dropdown">
            <option value="all">All</option>
            <option value="active">Allocated</option>
            <option value="inactive">Unallocated</option>
          </select>

          <Link to="/hr/addemployee" className="hrms-btn-orange">
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
            <th>Allocated</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="7">Loading employees...</td>
            </tr>
          )}

          {error && (
            <tr>
              <td colSpan="7" style={{ color: "red" }}>
                Error: {error}
              </td>
            </tr>
          )}

          {!loading && employeeList.length === 0 && (
            <tr>
              <td colSpan="7">No employees found.</td>
            </tr>
          )}

          {!loading &&
            employeeList.length > 0 &&
            employeeList.map((emp, index) => (
              <tr key={index}>
                <td>{emp.employeeCode}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.deptName || "N/A"}</td>
                <td>{emp.roleName || "N/A"}</td>
                <td className={emp.status === "allocated" ? "hrms-text-success" : "hrms-text-danger"}>
                  {emp.status || "unallocated"}
                </td>
                <td>{emp.phone || "N/A"}</td>
                <td>
  <button
    className="edit-btn"
    onClick={() => navigate("/hr/addemployee", { state: { employeeData: emp } })}
  >
    <FileEdit />
  </button>
  <button
  className=""
  onClick={() => handleDelete(emp.empId)}
>
  Delete
</button>

</td>


              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
