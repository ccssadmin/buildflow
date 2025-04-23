import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp";

const ProjectTeamStakeholder = ({
  formData,
  searchFilters,
  dropdownVisible,
  handleSearchFilterChange,
  toggleDropdown,
  handleSelectItem,
  handleRemoveItem
}) => {
  // Use our custom hook
  const { 
    employees, 
    vendors, 
    subcontractors, 
    loading, 
    fetchAllEmployees,
    fetchVendorsAndSubcontractors 
  } = useRoleBasedEmp();

  // Track data loading state
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Local state to handle dropdown visibility instead of relying on props
  const [localDropdownVisible, setLocalDropdownVisible] = useState({});

  useEffect(() => {
    // Fetch all role data in a single API call
    const loadAllData = async () => {
      try {
        // Single API call to get all employees by roles
        await fetchAllEmployees();
        
        // Fetch vendors and subcontractors
        await fetchVendorsAndSubcontractors();
        
        // Mark data as loaded
        setDataLoaded(true);
      } catch (error) {
        console.error("Error loading role data:", error);
      }
    };
    
    loadAllData();
  }, []);

  // Handle local dropdown toggling
  const handleToggleDropdown = (field) => {
    setLocalDropdownVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    
    // Also call parent toggle function to maintain state sync
    if (toggleDropdown) {
      toggleDropdown(field);
    }
  };
  
  // Close all dropdowns
  const closeAllDropdowns = () => {
    setLocalDropdownVisible({});
  };
  
  // Handle item selection with local state
  const handleLocalSelectItem = (field, item) => {
    // Call the parent handler with the complete item data including empId
    handleSelectItem(field, item);
    
    // Close the dropdown
    setLocalDropdownVisible(prev => ({
      ...prev,
      [field]: false
    }));
  };

  // Map employee data to field names for easier access
  const getEmployeesByField = (field) => {
    switch(field) {
      case 'projectManager':
        return employees.projectManagerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'assistantProjectManager':
        return employees.assistantProjectManagerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'leadEngineer':
        return employees.leadEngineerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'siteSupervisor':
        return employees.siteSupervisorEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'qs':
        return employees.qsEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'assistantQs':
        return employees.assistantQsEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'siteEngineer':
        return employees.siteEngineerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'engineer':
        return employees.engineerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'designer':
        return employees.designerEmployees?.map(emp => ({
          id: emp.empId,
          name: emp.employeeName,
          empId: emp.empId,
          employeeCode: emp.employeeCode,
          role: emp.role
        })) || [];
      case 'vendors':
        return vendors?.map(v => ({ 
          id: v.id, 
          name: v.vendorName || v.name,
          empId: v.id // For consistency in storing IDs
        })) || [];
      case 'subcontractors':
        return subcontractors?.map(s => ({ 
          id: s.id, 
          name: s.subcontractorName || s.name,
          empId: s.id // For consistency in storing IDs
        })) || [];
      default:
        return [];
    }
  };

  // Get filtered items based on search
  const getFilteredItems = (field) => {
    const itemsList = getEmployeesByField(field);
    
    // If no search filter, return all items
    if (!searchFilters[field]) {
      return itemsList;
    }
    
    // Filter based on search text
    return itemsList.filter(item => 
      item.name?.toLowerCase().includes(searchFilters[field]?.toLowerCase())
    );
  };

  // Fixed function to check if an item is already selected
  const isItemSelected = (field, itemId) => {
    // Make sure we're actually checking against the current formData
    if (!formData[field] || !Array.isArray(formData[field])) {
      return false;
    }
    
    // Check if this specific itemId exists in the formData for this field
    return formData[field].some(item => item.id === itemId || item.empId === itemId);
  };

  // Modified MultiSelect component with hidden input for storing empId
  const MultiSelect = ({ field, label, required = false }) => {
    const isDropdownVisible = localDropdownVisible[field] || false;
    const inputRef = React.useRef(null);
  
    // Focus the input when dropdown opens
    useEffect(() => {
      if (isDropdownVisible && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isDropdownVisible]);
  
    return (
      <Form.Group>
        <Form.Label className="text-dark">
          {label} {required && <span className="required">*</span>}
        </Form.Label>
        <div className="multi-select-container">
          <div className="selected-items">
            {formData[field]?.map((item) => (
              <div key={item.id || item.empId} className="selected-item">
                <span>{item.name}</span>
                <input 
                  type="hidden" 
                  name={`${field}Ids[]`} 
                  value={item.empId || item.id} 
                />
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
              ref={inputRef}
              type="text"
              placeholder={loading ? "Loading..." : "Search..."}
              value={searchFilters[field] || ""}
              onChange={(e) => {
                handleSearchFilterChange(e, field);
                if (!isDropdownVisible) {
                  handleToggleDropdown(field);
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDropdownVisible) {
                  handleToggleDropdown(field);
                }
              }}
              onFocus={() => {
                if (!isDropdownVisible) {
                  handleToggleDropdown(field);
                }
              }}
              disabled={loading}
              style={{ cursor: "text" }}
            />
            {isDropdownVisible && (
              <div 
                className="dropdown-menu show"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking dropdown
              >
                {loading ? (
                  <div className="dropdown-item no-results">Loading...</div>
                ) : getFilteredItems(field).length > 0 ? (
                  getFilteredItems(field).map((item) => {
                    const selected = isItemSelected(field, item.id || item.empId);
                    return (
                      <div
                        key={item.id || item.empId}
                        className={`dropdown-item ${selected ? "selected" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLocalSelectItem(field, item);
                        }}
                      >
                        {item.name}
                        {selected && <span className="check-mark">✓</span>}
                      </div>
                    );
                  })
                ) : (
                  <div className="dropdown-item no-results">
                    No results found for "{searchFilters[field]}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Form.Group>
    );
  };

  // Add click listener to close dropdowns when clicking outside
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

  // Permission and Finance Approval data
  const permissionData = [
    { id: 1, role: "MD", employee: "Kristin Watson", amount: "" },
    { id: 2, role: "Directors", employee: "Floyd Miles", amount: "" },
    { id: 3, role: "Head Finance", employee: "Jerome Bell", amount: "" },
    { id: 4, role: "CEO", employee: "Albert Flores", amount: "" },
    { id: 5, role: "General Manager (Technology)", employee: "Bessie Cooper", amount: "" },
    { id: 6, role: "General Manager (Operation)", employee: "Robert Fox", amount: "" },
    { id: 7, role: "Finance", employee: "Jane Cooper", amount: "" },
  ];

  return (
    <div className="form-section">
      <h2 className="section-title">Project Team & Stakeholder Assignment</h2>
      {loading && !dataLoaded ? (
        <div className="text-center my-4">
          <p>Loading employee data...</p>
        </div>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <MultiSelect field="projectManager" label="Project Manager" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect
                field="assistantProjectManager"
                label="Assistant Project Manager"
              />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="leadEngineer" label="Lead Engineer" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <MultiSelect field="siteSupervisor" label="Site Supervisor" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="qs" label="QS" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="assistantQs" label="Assistant QS" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <MultiSelect field="siteEngineer" label="Site Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="engineer" label="Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="designer" label="Designer" />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6} lg={4}>
              <MultiSelect field="vendors" label="Vendors" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="subcontractors" label="Subcontractors" />
            </Col>
          </Row>
          <div className="permission-approval">
            <h3>Permission and Finance Approval</h3>
            <table className="tbl mt-4 w-100">
              <thead>
                <tr>
                  <th className="text-center text-dark fs-18-500">S.No</th>
                  <th className="text-center text-dark fs-18-500">Roles</th>
                  <th className="text-center text-dark fs-18-500">Employee</th>
                  <th className="text-center text-dark fs-18-500">Amount %</th>
                </tr>
              </thead>
              <tbody>
                {permissionData.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center text-dark-gray fs-16-500">
                      {String(item.id).padStart(2, "0")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      {item.role}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      <div className="employee-cell">
                        <div className="employee-avatar"></div>
                        <span>{item.employee}</span>
                      </div>
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      <Form.Control
                        type="text"
                        value={item.amount}
                        onChange={(e) => {
                          // Handle amount change
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectTeamStakeholder;