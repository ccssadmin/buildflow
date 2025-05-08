import React, { useEffect, useState } from "react";
import "../../../styles/components/css/hr/hrms.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchDepartments } from "../../../store/actions/hr/departmentaction";
import { createEmployee, createOrUpdateEmployee, deleteEmployee, getEmployees, getNewEmpId } from "../../../store/actions/hr/createemployeaction";
import { fetchRolesByDepartment } from "../../../store/actions/hr/designationaction";
import { fetchProjects } from "../../../store/actions/hr/projectaction";


const AddEmployee = () => {

  const { empId } = useParams();
  const dispatch = useDispatch();
  const { departments = [], loading, error } = useSelector((state) => state.department || {});
  const { roles = [] } = useSelector((state) => state.role || {});
  const { projects = [] } = useSelector((state) => state.project);
  const [validationErrors, setValidationErrors] = useState({});
  const location = useLocation();

  const [editingEmployee, setEditingEmployee] = useState(location.state?.employeeData || null);
  

  
const [employee, setEmployee] = useState({
  name: "",
  dob: "",
  gender: "",
  mobile: "",
  email: "",
  EmployeeCode: "",
  department: "",
  designation: "",
  project: "",
});

useEffect(() => {
  if (location.state?.employeeData) {
    const emp = location.state.employeeData;
    setEditingEmployee(emp);
    setEmployee({
      name: emp.firstName || "",
      dob: emp.dateOfBirth || "",
      gender: emp.gender || "",
      mobile: emp.phone || "",
      email: emp.email || "",
      EmployeeCode: emp.employeeCode || "",
      department: emp.deptId?.toString() || "",
      designation: emp.roleName?.toString() || "",
      project: emp.project_id?.toString() || "",
    });
  } else if (empId) {
    dispatch(getEmployees()).then((res) => {
      const employeeList = res.payload || [];
      const found = employeeList.find(emp => emp.empId.toString() === empId.toString());
      if (found) {
        setEditingEmployee(found);
        setEmployee({
          name: found.firstName || "",
          dob: found.dateOfBirth || "",
          gender: found.gender || "",
          mobile: found.phone || "",
          email: found.email || "",
          EmployeeCode: found.employeeCode || "",
          department: found.deptId?.toString() || "",
          designation: found.roleId?.toString() || "",
          project: found.project_id?.toString() || "",
        });
      }
    });
  }
}, [empId, location.state, dispatch]);





  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (employee.department && employee.department !== "0") {
      dispatch(fetchRolesByDepartment(employee.department));
    }
  }, [employee.department, dispatch]);
  

  useEffect(() => {
    console.log("Roles for department", employee.department, ":", roles);
  }, [roles]);
  

  useEffect(() => {
    console.log("Editing Employee: ", editingEmployee);
    console.log("Employee state set to: ", employee);
  }, [employee]);
  
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // dispatch delete action here (you need to implement or import it)
      dispatch(deleteEmployee(editingEmployee.empId))
        .then(() => {
          alert("Employee deleted successfully.");
          navigate("/hr/employee"); // redirect after deletion
        })
        .catch(() => {
          alert("Failed to delete employee. Please try again.");
        });
    }
  };


   useEffect(() => {
      dispatch(getEmployees());
    }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("Fetched departments:", departments);
  }, [departments]);
  
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "designation" || name === "project" || name === "department"
        ? Number(value)
        : value,
      ...(name === "department" ? { designation: "" } : {}),
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = {};
    if (!employee.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(employee.name)) {
      errors.name = "Name must contain only letters";
    }
    
    if (employee.mobile && !/^\d{10}$/.test(employee.mobile)) {
      errors.mobile = "Enter valid 10-digit mobile number";
    }
    
    if (employee.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!employee.email) {
      errors.email = "Email is required";
    }
    
    if (!employee.department) {
      errors.department = "Department is required";
    }
    
    if (!employee.designation) {
      errors.designation = "Designation is required";
    }
    
    // 'project' is optional, no validation needed
    // 'dob' and 'gender' are optional, no validation needed
    
  
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
  
    const formattedData = {
    
        EmpId: editingEmployee?.empId || 0,
        FirstName: employee.name,
        DateOfBirth: employee.dob,
        Gender: employee.gender,
        Phone: employee.mobile,
        Email: employee.email,
        Department: Number(employee.department),
        Designation: Number(employee.designation),
        Project: Number(employee.project),
        EmployeeCode: employee.EmployeeCode,
      
    };
    
    


    
    
const action = editingEmployee ? createOrUpdateEmployee : createOrUpdateEmployee;

  
    dispatch(action(formattedData))      .then(() => {
        setSuccessMessage(
          editingEmployee ? "Employee updated successfully!" : "Employee added successfully!"
        );
        setValidationErrors({});
        setTimeout(() => setSuccessMessage(""), 3000);
        setEmployee({
          name: "",
          dob: "",
          gender: "",
          mobile: "",
          email: "",
          EmployeeCode: "",
          department: "",
          designation: "",
          project: "",
        });
        
        // Optional: clear location.state to remove edit context
      
        
        
      })
      .catch(() => {
        setSuccessMessage("Operation failed. Try again.");
      });
  };
  
  const newEmpId = useSelector((state) => state.employee.newEmpId);
  useEffect(() => {
    if (!editingEmployee) {
      dispatch(getNewEmpId());
    }
  }, [dispatch, editingEmployee]);

  
  useEffect(() => {
    if (!editingEmployee && newEmpId) {
      setEmployee((prev) => ({
        ...prev,
        EmployeeCode: `${newEmpId}`
      }));
    }
  }, [newEmpId, editingEmployee]);
  



  const handleCancel = () => {
    setEmployee({
      name: "",
      dob: "",
      gender: "",
      mobile: "",
      email: "",
      EmployeeCode: "",
      department: "",
      designation: "",
      project: 0,
    });
  };

  return (
    <div className="addemployee-container">
      <div className="addemployee-breadcrumb">
        <span className="addemployee-link" onClick={() => navigate("/hr/employee")}>Employee</span>
        <span className="addemployee-separator">&gt;</span>
        <span className="addemployee-current">Add Employee</span>
      </div>

      {successMessage && <div className="addemployee-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="addemployee-form">
        <h6 className="addemployee-section-title">Personal Info</h6>

        <div className="addemployee-form-row">
          <div className="addemployee-form-group">
            <label>Name <span className="addemployee-required">*</span></label>
         
            <input type="text" name="name" placeholder="Employee Name" value={employee.name} onChange={handleChange}  />
            {validationErrors.name && <p className="error-text">{validationErrors.name}</p>}
          </div>

          <div className="addemployee-form-group">
            <label>Date of Birth <span className="addemployee-required"></span></label>
            <input type="date" name="dob" value={employee.dob} onChange={handleChange}  />
            {validationErrors.dob && <p className="error-text">{validationErrors.dob}</p>}
          </div>

          <div className="addemployee-form-group">
            <label>Gender <span className="addemployee-required"></span></label>
            <select name="gender" value={employee.gender} onChange={handleChange}>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

          </div>

          <div className="addemployee-form-group">
            <label>Mobile No  <span className="addemployee-required">*</span></label>
  <div className="mobile-input-wrapper">
    <img
      src="https://flagcdn.com/w40/in.png"
      alt="India Flag"
      className="flag-icon"
    />
    <span className="country-code">+91</span>
    <input
      type="text"
      name="mobile"
      value={employee.mobile}
      onChange={handleChange}
      placeholder="92xxx xxxxx"
      className="mobile-input"
    />
      </div>
          </div>

          <div className="addemployee-form-group-email">
          <label className="addemployee-form-group-label">Email ID <span className="addemployee-required">*</span> </label>
  <input
    type="email"
    name="email"
    value={employee.email}
    onChange={handleChange}
    placeholder="Enter Email Id"
    className="email-input"
  />
      {validationErrors.email && <p className="error-text">{validationErrors.email}</p>}

</div>
        </div>

        <h6 className="addemployee-section-title">Employment Details</h6>

        <div className="addemployee-form-row">
        <div className="addemployee-form-group">
  <label>Employee ID</label>
  <input
    type="text"
    name="EmployeeCode"
    value={employee.EmployeeCode}
    onChange={handleChange}
    readOnly // optional: make it read-only
  />
</div>

          <div className="addemployee-form-group">
            <label>Department <span className="addemployee-required">*</span></label>
            <select
  name="department"
  value={employee.department}
  onChange={handleChange}
  
>

  <option value="">Select Department</option>
  {loading ? (
    <option disabled>Loading departments...</option>
  ) : Array.isArray(departments) && departments.length > 0 ? (
    departments.map((dept) => (
      <option key={dept.deptId} value={dept.deptId}>
        {dept.deptName.trim()}
      </option>
    ))
  ) : (
    <option disabled>No departments available</option>
  )}
</select>
{validationErrors.department && <p className="error-text">{validationErrors.department}</p>}
          </div>


          <div className="addemployee-form-group">
  <label>
    Designation <span className="addemployee-required">*</span>
  </label>
  <select
  name="designation"
  value={employee.designation}
  onChange={handleChange}
  disabled={!employee.department}
>

  
    <option value="0">Select Designation</option>
    {Array.isArray(roles) ? (
  roles.map((roles) => (
    <option key={roles.roleId} value={roles.roleId}>
    {roles.roleName}
  </option>
  ))
) : (
  <option disabled>Loading roles...</option>
)}

  
  </select>
  {validationErrors.designation && <p className="error-text">{validationErrors.designation}</p>}

</div>


          <div className="addemployee-form-group">
            <label >Projects </label>
            <select  className="project"  name="project" value={employee.project} onChange={handleChange} >
  <option value="">Select Project</option>
  {projects.map((proj) => (
    <option key={proj.project_id} value={proj.project_id}>
    {proj.project_name}
    </option>
    
  ))}
</select>


          </div>
        </div>
       {editingEmployee && (
          <div className="addemployee-form-actions">
  <button
    type="button"

    className="addemployee-btn-delete"
    onClick={handleDelete}
  >
    Delete
  </button>
  </div>
)}




        <div className="addemployee-form-actions">
          <button type="button" className="addemployee-btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="addemployee-btn-save">Save</button>
        </div>
        
      </form>
    </div>
  );
};

export default AddEmployee;
