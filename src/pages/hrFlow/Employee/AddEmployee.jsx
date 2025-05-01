import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../../store/actions/Department/departmentaction";
import { fetchRoles } from "../../../store/actions/Designation/designationaction";
import { fetchProjects } from "../../../store/actions/Project/projectaction";

const AddEmployee = () => {const dispatch = useDispatch();
  const { departments = [], loading, error } = useSelector((state) => state.department || {});
  const { roles = [] } = useSelector((state) => state.role || {});
  const { projects = [] } = useSelector((state) => state.project);


      const [employee, setEmployee] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    project: "",
  });



  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRoles());
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
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Employee:", employee);

    setSuccessMessage("Employee added successfully!");

    // Reset form
    setEmployee({
      name: "",
      dob: "",
      gender: "",
      mobile: "",
      email: "",
      employeeId: "",
      department: "",
      designation: "",
      project: "",
    });

    // Clear message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleCancel = () => {
    setEmployee({
      name: "",
      dob: "",
      gender: "",
      mobile: "",
      email: "",
      employeeId: "",
      department: "",
      designation: "",
      project: "",
    });
  };

  return (
    <div className="addemployee-container">
      <div className="addemployee-breadcrumb">
        <span className="addemployee-link" onClick={() => navigate("/ceo/hrms")}>Employee</span>
        <span className="addemployee-separator">&gt;</span>
        <span className="addemployee-current">Add Employee</span>
      </div>

      {successMessage && <div className="addemployee-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="addemployee-form">
        <h6 className="addemployee-section-title">Personal Info</h6>

        <div className="addemployee-form-row">
          <div className="addemployee-form-group">
            <label>Name <span className="addemployee-required">*</span></label>
            <input type="text" name="name" placeholder="Employee Name" value={employee.name} onChange={handleChange} required />
          </div>

          <div className="addemployee-form-group">
            <label>Date of Birth <span className="addemployee-required">*</span></label>
            <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
          </div>

          <div className="addemployee-form-group">
            <label>Gender <span className="addemployee-required">*</span></label>
            <select name="gender" value={employee.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="addemployee-form-group">
            <label>Mobile No</label>
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

          <div className="addemployee-form-group">
          <label>Email ID</label>
  <input
    type="email"
    name="email"
    value={employee.email}
    onChange={handleChange}
    placeholder="Enter Email Id"
    className="email-input"
  />
</div>
        </div>

        <h6 className="addemployee-section-title">Employment Details</h6>

        <div className="addemployee-form-row">
          <div className="addemployee-form-group">
            <label>Employee ID</label>
            <input type="text" placeholder="EMP001025" name="employeeId" value={employee.employeeId} onChange={handleChange} />
          </div>


          <div className="addemployee-form-group">
            <label>Department <span className="addemployee-required">*</span></label>
            <select
              name="department"
              value={employee.department}
              onChange={handleChange}
              required
            >
              {loading ? (
                <option disabled>Loading departments...</option>
              ) : Array.isArray(departments) && departments.length > 0 ? (
                departments.map((dept) => (
                  <option key={dept.deptId} value={dept.deptName.trim()}>
                    {dept.deptName.trim()}
                  </option>
                ))
              ) : (
                <option disabled>No departments available</option>
              )}
            </select>
          </div>


          <div className="addemployee-form-group">
  <label>
    Designation <span className="addemployee-required">*</span>
  </label>
  <select
    name="designation"
    value={employee.designation}
    onChange={handleChange}
    required
  >
    <option value="">Select Designation</option>
    {roles.map((role) => (
      <option key={role.roleId} value={role.roleName}>
        {role.roleName}
      </option>
    ))}
  </select>
</div>


          <div className="addemployee-form-group">
            <label >Projects <span className="addemployee-required">*</span></label>
            <select name="project" value={employee.project} onChange={handleChange} required>
  <option value="">Select Project</option>
  {projects.map((proj) => (
    <option key={proj.project_id} value={proj.project_name}>
      {proj.project_name}
    </option>
  ))}
</select>
          </div>
        </div>

        <div className="addemployee-form-actions">
          <button type="button" className="addemployee-btn-cancel" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="addemployee-btn-save">Save</button>
        </div>
      </form>
    </div>
  );
};


export default AddEmployee;
