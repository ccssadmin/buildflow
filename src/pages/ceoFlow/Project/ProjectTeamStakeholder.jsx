import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner, Table } from "react-bootstrap";
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp";
import { useProject } from "../../../hooks/Ceo/useCeoProject";

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

  // Initialize with empty array - will be populated dynamically
  const [permissionData, setPermissionData] = useState([]);

  useEffect(() => {
    if (!dataLoaded) {
      const loadAllData = async () => {
        try {
          await fetchAllEmployees();
          await fetchVendorsAndSubcontractors();
          generateFinanceApprovalRoles(); // ✅ Call here after fetching employees
          setDataLoaded(true);
        } catch (error) {
          console.error("Error loading role data:", error);
        }
      };
      loadAllData();
    }
  }, [dataLoaded, fetchAllEmployees, fetchVendorsAndSubcontractors]);
  



  // This function dynamically generates the finance approval roles based on employee data
  const generateFinanceApprovalRoles = () => {
    // Start with an empty array for the new permission data
    const newPermissionData = [];
    let idCounter = 1;

    // Process all employee types to find unique roles
    const roleMap = new Map();

    // Extract all roles from all employee types
    Object.keys(employees).forEach(empType => {
      if (Array.isArray(employees[empType])) {
        employees[empType].forEach(emp => {
          if (emp.role && !roleMap.has(emp.role)) {
            roleMap.set(emp.role, {
              employeeName: emp.employeeName,
              employeeId: emp.empId
            });
          }
        });
      }
    });

    // Add important roles first if they exist
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
        // Remove from map so we don't add it twice
        roleMap.delete(role);
      }
    });

    // Then add any remaining roles
    roleMap.forEach((empData, role) => {
      newPermissionData.push({
        id: idCounter++,
        role: role,
        employee: empData.employeeName,
        employeeId: empData.employeeId,
        amount: ""
      });
    });

    // Handle specific employee data if available
    handleSpecificEmployeeData(newPermissionData);

    // Only update if we have roles
    if (newPermissionData.length > 0) {
      setPermissionData(newPermissionData);
    } else {
      // Fallback to placeholder structure with loading state
      const fallbackData = [
        { id: 1, role: "MD", employee: "Loading...", employeeId: null, amount: "" },
        { id: 2, role: "Directors", employee: "Loading...", employeeId: null, amount: "" },
        { id: 3, role: "Head Finance", employee: "Loading...", employeeId: null, amount: "" },
        { id: 4, role: "CEO", employee: "Loading...", employeeId: null, amount: "" },
        { id: 5, role: "General Manager (Technology)", employee: "Loading...", employeeId: null, amount: "" },
        { id: 6, role: "General Manager (Operation)", employee: "Loading...", employeeId: null, amount: "" },
        { id: 7, role: "Finance", employee: "Loading...", employeeId: null, amount: "" },
      ];
      setPermissionData(fallbackData);
    }
  };

  // Process the specific employee data structure
  const handleSpecificEmployeeData = (permissionDataArray) => {
    // If we have specific CEO data
    if (employees?.CEOEmployees && employees.CEOEmployees.length > 0) {
      const ceoEmployee = employees.CEOEmployees[0];

      // Look for CEO in existing data
      const ceoIndex = permissionDataArray.findIndex(item => item.role === "CEO");

      if (ceoIndex >= 0) {
        // Update existing CEO entry
        permissionDataArray[ceoIndex] = {
          ...permissionDataArray[ceoIndex],
          employee: ceoEmployee.employeeName,
          employeeId: ceoEmployee.empId
        };
      } else {
        // Add CEO if not found
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

  const closeAllDropdowns = () => {
    setLocalDropdownVisible({});
  };

  const handleLocalSelectItem = (field, item) => {
    handleSelectItem(field, item);
    setLocalDropdownVisible(prev => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleAmountChange = (id, value) => {
    // Allow only numbers and a decimal point
    const validValue = value.replace(/[^0-9.]/g, "");
  
    const updatedPermissionData = permissionData.map(item =>
      item.id === id ? { ...item, amount: validValue } : item
    );
    setPermissionData(updatedPermissionData);
  };

  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);
      setErrorMessage(null);
  
      const projectId = localStorage.getItem("projectId");
      if (!projectId) {
        throw new Error("Project ID not found. Please create a project first.");
      }
  
      const projectTeamData = {
        projectId: Number(projectId),
        pmId: formData.projectManager?.map(item => item.empId || item.id) || [],
        apmId: formData.assistantProjectManager?.map(item => item.empId || item.id) || [],
        leadEnggId: formData.leadEngineer?.map(item => item.empId || item.id) || [],
        siteSupervisorId: formData.siteSupervisor?.map(item => item.empId || item.id) || [],
        qsId: formData.qs?.map(item => item.empId || item.id) || [],
        aqsId: formData.assistantQs?.map(item => item.empId || item.id) || [],
        siteEnggId: formData.siteEngineer?.map(item => item.empId || item.id) || [],
        enggId: formData.engineer?.map(item => item.empId || item.id) || [],
        designerId: formData.designer?.map(item => item.empId || item.id) || [],
        vendorId: formData.vendors?.map(item => item.empId || item.id) || [],
        subcontractorId: formData.subcontractors?.map(item => item.empId || item.id) || [],
      };
  
      const financeApprovalData = {
        projectId: Number(projectId),
        projectPermissionFinanceApprovalList: permissionData.map(item => ({
          empId: item.employeeId,  // <-- Correct field name
          amount: item.amount ? parseFloat(item.amount) : 0,  // <-- Make sure amount is number
        })),
      };
  
      // Send the API requests concurrently
      const [teamResult, financeResult] = await Promise.all([
        createProjectteams(projectTeamData),
        createProjectFinanceApprove(financeApprovalData),
      ]);
  
      if (!teamResult.success || !financeResult.success) {
        throw new Error("Failed to save project data");
      }
  
      if (onNext) onNext();
    } catch (error) {
      console.error("Error saving project data:", error);
      setErrorMessage(error.message || "An error occurred while saving data");
    } finally {
      setSubmitLoading(false);
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
      case 'projectManager': return employees.projectManagerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'assistantProjectManager': return employees.assistantProjectManagerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'leadEngineer': return employees.leadEngineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'siteSupervisor': return employees.siteSupervisorEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'qs': return employees.qsEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'assistantQs': return employees.assistantQsEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'siteEngineer': return employees.siteEngineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'engineer': return employees.engineerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'designer': return employees.designerEmployees?.map(emp => ({ id: emp.empId, name: emp.employeeName, empId: emp.empId, employeeCode: emp.employeeCode, role: emp.role })) || [];
      case 'vendors': return vendors?.map(v => ({ id: v.id, name: v.vendorName || v.name, empId: v.id })) || [];
      case 'subcontractors': return subcontractors?.map(s => ({ id: s.id, name: s.subcontractorName || s.name, empId: s.id })) || [];
      default: return [];
    }
  };

  const getFilteredItems = (field) => {
    const itemsList = getEmployeesByField(field);
    if (!searchFilters[field]) {
      return itemsList;
    }
    return itemsList.filter(item => item.name?.toLowerCase().includes(searchFilters[field]?.toLowerCase()));
  };

  const isItemSelected = (field, itemId) => {
    if (!formData[field] || !Array.isArray(formData[field])) return false;
    return formData[field].some(item => item.id === itemId || item.empId === itemId);
  };

  const MultiSelect = ({ field, label, required = false }) => {
    const isDropdownVisible = localDropdownVisible[field] || false;

    return (
      <Form.Group>
        <Form.Label className="text-dark">
          {label} {required && <span className="required">*</span>}
        </Form.Label>
        <div className="multi-select-container">
          <div className="selected-items">
            {formData[field]?.map(item => (
              <div key={item.id || item.empId} className="selected-item">
                <span>{item.name}</span>
                <input type="hidden" name={`${field}Ids[]`} value={item.empId || item.id} />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveItem(field, item.id || item.empId)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="search-container">
            <Form.Control
              type="text"
              placeholder={loading ? "Loading..." : "Search..."}
              value={searchFilters[field] || ""}
              onChange={(e) => handleSearchFilterChange(e, field)}
              onFocus={() => handleToggleDropdown(field)}
            />
            {isDropdownVisible && (
              <div className="dropdown-menu show">
                {getFilteredItems(field).map(item => (
                  <div
                    key={item.id}
                    className={`dropdown-item ${isItemSelected(field, item.id) ? 'selected' : ''}`}
                    onClick={() => handleLocalSelectItem(field, item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Form.Group>
    );
  };

  return (
    <Form>
      <Row>
        <Col md={6}>
          <MultiSelect field="projectManager" label="Project Manager" required />
          <MultiSelect field="assistantProjectManager" label="Assistant Project Manager" />
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
            <th width="5%">#</th>
            <th width="30%">Role</th>
            <th width="35%">Employee</th>
            <th width="30%">Amount Limit</th>
          </tr>
        </thead>
        <tbody>
          {permissionData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.role}</td>
              <td>
                {item.employee}
                <input type="hidden" name={`finance_employeeId_${item.id}`} value={item.employeeId} />
              </td>
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

      {errorMessage && (
        <div className="text-danger mt-2">{errorMessage}</div>
      )}

      <div className="text-end mt-3">
        <Button variant="primary" onClick={handleSubmit} disabled={submitLoading}>
          {submitLoading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Submit & Continue"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default ProjectTeamStakeholder;