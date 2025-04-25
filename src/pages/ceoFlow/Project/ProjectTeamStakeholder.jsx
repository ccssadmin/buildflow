import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button, Spinner, Table } from "react-bootstrap";
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import Swal from "sweetalert2";
import { createProjectFinanceApprovedAction, createProjectTeamAction } from "../../../store/actions/Ceo/ceoprojectAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProjectTeamStakeholder = ({
  formData,
  setFormData,
  searchFilters,
  dropdownVisible,
  handleSearchFilterChange,
  toggleDropdown,
  handleSelectItem,
  handleRemoveItem,
  onNext,
}) => {
  const {
    employees,
    vendors,
    subcontractors,
    loading,
    fetchAllEmployees,
    fetchVendorsAndSubcontractors
  } = useRoleBasedEmp();

  const { createProjectteams, createProjectFinanceApprove, loading: projectActionLoading } = useProject();


  const [dataLoaded, setDataLoaded] = useState(false);
  const [localDropdownVisible, setLocalDropdownVisible] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [permissionData, setPermissionData] = useState([]);
  const isSubmitting = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataLoaded) {
      const loadAllData = async () => {
        try {
          await fetchAllEmployees();
          await fetchVendorsAndSubcontractors();
          generateFinanceApprovalRoles();
          setDataLoaded(true);
        } catch (error) {
          console.error("Error loading role data:", error);
          setErrorMessage("Failed to load employee data. Please refresh and try again.");
        }
      };
      loadAllData();
    }
  }, [dataLoaded, fetchAllEmployees, fetchVendorsAndSubcontractors]);

  const generateFinanceApprovalRoles = () => {
    const newPermissionData = [];
    let idCounter = 1;
    const roleMap = new Map();

    // Process all employee types
    Object.keys(employees).forEach(empType => {
      if (Array.isArray(employees[empType])) {
        employees[empType].forEach(emp => {
          if (emp.role && !roleMap.has(emp.role)) {
            roleMap.set(emp.role, {
              employeeName: emp.employeeName,
              employeeId: Number(emp.empId) // Ensure ID is a number
            });
          }
        });
      }
    });

    const priorityRoles = ["CEO", "MD", "Directors", "Head Finance", "Finance",
      "General Manager (Technology)", "General Manager (Operation)"];

    priorityRoles.forEach(role => {
      if (roleMap.has(role)) {
        const empData = roleMap.get(role);
        newPermissionData.push({
          id: idCounter++,
          role: role,
          employee: empData.employeeName,
          employeeId: empData.employeeId,
          amount: ""
        });
        roleMap.delete(role);
      }
    });

    roleMap.forEach((empData, role) => {
      newPermissionData.push({
        id: idCounter++,
        role: role,
        employee: empData.employeeName,
        employeeId: empData.employeeId,
        amount: ""
      });
    });

    handleSpecificEmployeeData(newPermissionData);
    setPermissionData(newPermissionData.length > 0 ? newPermissionData : []);

    // Debug info
    console.log("Generated permission data:", newPermissionData);
  };

  const handleSpecificEmployeeData = (permissionDataArray) => {
    if (employees?.CEOEmployees && employees.CEOEmployees.length > 0) {
      const ceoEmployee = employees.CEOEmployees[0];
      const ceoIndex = permissionDataArray.findIndex(item => item.role === "CEO");

      if (ceoIndex >= 0) {
        permissionDataArray[ceoIndex] = {
          ...permissionDataArray[ceoIndex],
          employee: ceoEmployee.employeeName,
          employeeId: ceoEmployee.empId
        };
      } else {
        permissionDataArray.unshift({
          id: permissionDataArray.length > 0 ? Math.max(...permissionDataArray.map(item => item.id)) + 1 : 1,
          role: "CEO",
          employee: ceoEmployee.employeeName,
          employeeId: ceoEmployee.empId,
          amount: ""
        });
      }
    }
  };

  const handleToggleDropdown = (field) => {
    setLocalDropdownVisible(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (toggleDropdown) {
      toggleDropdown(field);
    }
  };

  const closeAllDropdowns = () => setLocalDropdownVisible({});

  const handleLocalSelectItem = (field, item) => {
    handleSelectItem(field, item);
    setLocalDropdownVisible(prev => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleAmountChange = (id, value) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setPermissionData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, amount: sanitizedValue } : item
      )
    );
  };
  
  // Modified handleSubmit function to ensure navigation to the project milestone page
  const handleSubmit = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    
    console.log("🔁 Submitting project team and finance data...");
    setSubmitLoading(true);
    setErrorMessage(null);
  
    const projectId = Number(localStorage.getItem("projectId") || formData.projectId);
    if (!projectId) {
      setErrorMessage("Missing Project ID. Please create a project first.");
      setSubmitLoading(false);
      isSubmitting.current = false;
      return;
    }
  
    try {
      const teamData = {
        projectId,
        pmId: (formData.projectManager || []).map(emp => Number(emp.empId || emp.id)),
        apmId: (formData.assistantProjectManager || []).map(emp => Number(emp.empId || emp.id)),
        LeadEnggId: (formData.leadEngineer || []).map(emp => Number(emp.empId || emp.id)),
        SiteSupervisorId: (formData.siteSupervisor || []).map(emp => Number(emp.empId || emp.id)),
        qsId: (formData.qs || []).map(emp => Number(emp.empId || emp.id)),
        aqsId: (formData.assistantQs || []).map(emp => Number(emp.empId || emp.id)),
        SiteEnggId: (formData.siteEngineer || []).map(emp => Number(emp.empId || emp.id)),
        EnggId: (formData.engineer || []).map(emp => Number(emp.empId || emp.id)),
        designerId: (formData.designer || []).map(emp => Number(emp.empId || emp.id)),
        vendorId: (formData.vendors || []).map(emp => Number(emp.id)),
        subcontractorId: (formData.subcontractors || []).map(emp => Number(emp.id)),
      };
  
      const financeData = {
        projectId,
        projectPermissionFinanceApprovalList: permissionData
          .filter(emp => emp.employeeId)
          .map(emp => ({
            empId: Number(emp.employeeId),
            amount: parseFloat(emp.amount || 0),
          })),
      };
  
      // Execute both actions
      const [teamResult, financeResult] = await Promise.all([
        dispatch(createProjectTeamAction(teamData)),
        dispatch(createProjectFinanceApprovedAction(financeData))
      ]);
  
      // Check if both actions were successful
      const teamSuccess = teamResult?.payload?.success;
      const financeSuccess = financeResult?.payload?.success;
  
      if (!teamSuccess || !financeSuccess) {
        throw new Error("One or more operations failed");
      }
  
      // Show success message
      await Swal.fire({
        title: "Success!",
        text: "Project team and finance data saved successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
      const nextPath = `/ceo/project/timelinemilestone/${projectId}`;
    console.log("Navigating to:", nextPath); // Debug log
      // Navigate after success
      if (onNext) {
        const nextPath = `/ceo/project/timelinemilestone/${projectId}`;
        console.log("Navigating to:", nextPath); // Debug log
        // onNext(); // Use the provided navigation function if available
      } else {
        // Fallback navigation
        navigate(`/ceo/project/timelinemilestone/${projectId}`, {
          state: { projectId },
          replace: true
        });
      }
  
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitLoading(false);
      isSubmitting.current = false;
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.multi-select-container')) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getEmployeesByField = (field) => {
    switch (field) {
      case 'projectManager': return employees.projectManagerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'assistantProjectManager': return employees.assistantProjectManagerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'leadEngineer': return employees.leadEngineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'siteSupervisor': return employees.siteSupervisorEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'qs': return employees.qsEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'assistantQs': return employees.assistantQsEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'siteEngineer': return employees.siteEngineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'engineer': return employees.engineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'designer': return employees.designerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName })) || [];
      case 'vendors': return vendors?.map(v => ({ id: v.id, name: v.vendorName || v.name })) || [];
      case 'subcontractors': return subcontractors?.map(s => ({ id: s.id, name: s.subcontractorName || s.name })) || [];
      default: return [];
    }
  };

  const getFilteredItems = (field) => {
    const itemsList = getEmployeesByField(field);
    if (!searchFilters[field]) return itemsList;
    return itemsList.filter(item => item.name.toLowerCase().includes(searchFilters[field].toLowerCase()));
  };

  const isItemSelected = (field, itemId) => {
    if (!formData[field] || !Array.isArray(formData[field])) return false;
    return formData[field].some(item => String(item.id) === String(itemId) || String(item.empId) === String(itemId));
  };

  const MultiSelect = ({ field, label }) => {
    const inputRef = useRef(null);
    const isDropdownVisible = localDropdownVisible[field] || false;

    useEffect(() => {
      if (isDropdownVisible && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isDropdownVisible]);

    const handleItemClick = (item) => {
      handleLocalSelectItem(field, item);
    };

    return (
      <Form.Group style={{ position: "relative", marginBottom: "15px" }}>
        <Form.Label className="text-dark">{label}</Form.Label>
        <div className="multi-select-container" style={{ position: "relative" }}>
          <div className="selected-items mb-2">
            {formData[field]?.map(item => (
              <div key={item.id || item.empId} className="selected-item d-inline-block bg-light p-1 me-2 mb-1 rounded">
                <span>{item.name}</span>
                <button
                  type="button"
                  className="remove-btn ms-1 border-0 bg-transparent text-danger"
                  onClick={() => handleRemoveItem(field, item.id || item.empId)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <Form.Control
            ref={inputRef}
            type="text"
            className="dropdown-toggle"
            placeholder={loading ? "Loading..." : "Search..."}
            value={searchFilters[field] || ""}
            onChange={(e) => handleSearchFilterChange(e, field)}
            onClick={() => handleToggleDropdown(field)}
            disabled={loading}
            autoComplete="off"
          />

          {isDropdownVisible && (
            <div
              className="dropdown-menu show w-100"
              style={{ maxHeight: "200px", overflowY: "auto", zIndex: "9999" }}
            >
              {getFilteredItems(field).length > 0 ? (
                getFilteredItems(field).map(item => (
                  <div
                    key={item.id}
                    className={`dropdown-item ${isItemSelected(field, item.id) ? "active" : ""}`}
                    onClick={() => handleItemClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="dropdown-item text-muted">No results found</div>
              )}
            </div>
          )}
        </div>
      </Form.Group>
    );
  };

  return (
    <Form>
      <h4 className="mb-4">Project Team & Stakeholder Assignment</h4>

      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" role="status" />
          <p>Loading team data...</p>
        </div>
      )}

      {!loading && (
        <>
          {errorMessage && (
            <div className="alert alert-danger mb-3">{errorMessage}</div>
          )}
          
          <Row>
            <Col md={6}>
              <MultiSelect field="projectManager" label="Project Manager" required />
              <MultiSelect field="assistantProjectManager" label="Assistant Project Manager" required />
              <MultiSelect field="leadEngineer" label="Lead Engineer" />
              <MultiSelect field="siteSupervisor" label="Site Supervisor" />
              <MultiSelect field="qs" label="QS" />
              <MultiSelect field="assistantQs" label="Assistant QS" />
            </Col>
            <Col md={6}>
              <MultiSelect field="siteEngineer" label="Site Engineer" />
              <MultiSelect field="engineer" label="Engineer" />
              <MultiSelect field="designer" label="Designer" />
              <MultiSelect field="vendors" label="Vendors" />
              <MultiSelect field="subcontractors" label="Subcontractors" />
            </Col>
          </Row>

          <h5 className="mt-4 mb-3">Finance Approvals</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Role</th>
                <th>Employee</th>
                <th>Amount Limit</th>
              </tr>
            </thead>
            <tbody>
              {permissionData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.role}</td>
                  <td>{item.employee || "Not assigned"}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={item.amount}
                      placeholder="Amount"
                      onChange={(e) => handleAmountChange(item.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <div className="d-flex justify-content-end align-items-end" style={{ minHeight: '80px', marginTop: '20px' }}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={submitLoading}
          className="me-2"
        >
          {submitLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
        <Button onClick={() => navigate('/ceo/projectmilestone')}>
  Test Navigation
</Button>
      </div>
    </Form>
  );
};

export default ProjectTeamStakeholder;