import React, { useEffect, useState } from "react";
import "../../../styles/components/css/hr/hrms.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../../../store/actions/hr/createemployeaction";
import { FileEdit } from "lucide-react";


const EmployeeTable = () => {
  const dispatch = useDispatch();
  const { employeeList = [], loading, error } = useSelector((state) => state.employee);
  const navigate = useNavigate();

  // State for sorting and pagination
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  // Sorting logic
  const sortedEmployees = [...employeeList].sort((a, b) => {
    return b.empId - a.empId; // Latest employee first
  });
  // Pagination logic
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirst, indexOfLast);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
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
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Employee ID {sortOrder === "asc" ? "↑" : "↓"}
            </th>
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
    <tr><td colSpan="7">Loading employees...</td></tr>
  )}

  {error && (
    <tr><td colSpan="7" style={{ color: "red" }}>Error: {error}</td></tr>
  )}

  {!loading && currentEmployees.length === 0 && (
    <tr><td colSpan="7">No employees found.</td></tr>
  )}

  {!loading && currentEmployees.map((emp, index) => (
    <tr key={index}>
      <td>{emp.employeeCode}</td>
      <td>{emp.firstName} {emp.lastName}</td>
      <td>{emp.deptName || "N/A"}</td>
      <td>{emp.roleName || "N/A"}</td>
      <td className={emp.isAllocated ? "hrms-text-success" : "hrms-text-danger"}>
  {emp.isAllocated ? "Allocated" : "Unallocated"}
</td>

      <td>{emp.phone || "N/A"}</td>
      <td>
        <button
          onClick={() => navigate(`/hr/addemployee/${emp.empId}`)}
          style={{
            background: "none",
            border: "none",
            color: "#0456D0",
            cursor: "pointer",
            textDecoration: "underline",
            paddingLeft: "10px",
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>


      </table>

      <div className="pagination-controls" style={{ marginTop: "1rem", textAlign: "center" }}>
  <button
    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    style={{
      margin: "0 5px",
      padding: "6px 12px",
      backgroundColor: "#eee",
      border: "none",
      borderRadius: "4px",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
    }}
  >
    Previous
  </button>

  {/* First Page */}
  <button
    onClick={() => handlePageChange(1)}
    style={{
      margin: "0 5px",
      padding: "6px 12px",
      backgroundColor: currentPage === 1 ? "#0456D0" : "#eee",
      color: currentPage === 1 ? "#fff" : "#000",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    }}
  >
    1
  </button>

  {/* Ellipsis if currentPage > 4 */}
  {currentPage > 4 && <span style={{ margin: "0 5px" }}>...</span>}

  {/* Pages around current page */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (page) =>
        page !== 1 &&
        page !== totalPages &&
        Math.abs(page - currentPage) <= 1
    )
    .map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        style={{
          margin: "0 5px",
          padding: "6px 12px",
          backgroundColor: currentPage === page ? "#0456D0" : "#eee",
          color: currentPage === page ? "#fff" : "#000",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {page}
      </button>
    ))}

  {/* Ellipsis if not near the end */}
  {currentPage < totalPages - 3 && <span style={{ margin: "0 5px" }}>...</span>}

  {/* Last Page */}
  {totalPages > 1 && (
    <button
      onClick={() => handlePageChange(totalPages)}
      style={{
        margin: "0 5px",
        padding: "6px 12px",
        backgroundColor: currentPage === totalPages ? "#0456D0" : "#eee",
        color: currentPage === totalPages ? "#fff" : "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {totalPages}
    </button>
  )}

  <button
    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={{
      margin: "0 5px",
      padding: "6px 12px",
      backgroundColor: "#eee",
      border: "none",
      borderRadius: "4px",
      cursor: currentPage === totalPages ? "not-allowed" : "pointer",
    }}
  >
    Next
  </button>
</div>



    </div>
  );
};

export default EmployeeTable;
