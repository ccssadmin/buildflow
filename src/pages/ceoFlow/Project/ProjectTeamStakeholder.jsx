import React, { useEffect, useState, useRef } from "react";
import { Form, Row, Col, Button, Spinner, Table, Modal } from "react-bootstrap";
import { useRoleBasedEmp } from "../../../hooks/Ceo/useRoleBasedEmp";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import Swal from "sweetalert2";
import {
  createProjectFinanceApprovedAction,
  createProjectTeamAction,
} from "../../../store/actions/Ceo/ceoprojectAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profile } from "../../../assets/images";

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
  fetchroles,
  createTicket,
  createNotify,
}) => {
  const {
    employees,
    vendors,
    subcontractors,
    loading,
    fetchAllEmployees,
    fetchVendorsAndSubcontractors,
  } = useRoleBasedEmp();

  const {
    createProjectteams,
    createProjectFinanceApprove,
    loading: projectActionLoading,
  } = useProject();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [localDropdownVisible, setLocalDropdownVisible] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [permissionData, setPermissionData] = useState([]);
  const isSubmitting = useRef(false);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [localProjectId, setLocalProjectId] = useState(null);
  const [employee, setEmployees] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const getRoleNameById = (id) => {
    const role = filteredRoles.find((r) => r.roleId === parseInt(id));
    return role?.roleName || null;
  };

  useEffect(() => {
    const getFilteredRoles = async () => {
      try {
        const { success, data } = await fetchroles();
        console.log("Roles fetched in BudgetFinancialAllocation:", data); // Add this log
        if (success && data) {
          const filtered = data.filter(
            (r) => r.roleName === "HR" 
          );
          setFilteredRoles(filtered);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    getFilteredRoles();
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { success, data } = await fetchAllEmployees();
        const roleName = getRoleNameById(formData.sendTo);
        if (
          success &&
          data?.employeesByRole &&
          data.employeesByRole[roleName]
        ) {
          const filteredEmployees = data.employeesByRole[roleName];
          console.log("employee", filteredEmployees);
          setEmployees(filteredEmployees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (formData.sendTo) {
      getEmployees();
    }
  }, [formData.sendTo]);

  const handleTicketSubmission = async () => {
    const projectId = formData.projectId || localProjectId || parseInt(localStorage.getItem("projectId"));
    const createdBy = parseInt(localStorage.getItem("userRoleId")); 
  
    if (selectedUsers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Employees Selected",
        text: "Please select at least one employee to assign the ticket.",
      });
      return;
    }
  
    const ticketPayload = {
      projectId,
      ticketType: "permissionFinanceApproval",
      assignTo: selectedUsers,
      createdBy: createdBy,
    };
  
    try {
      const ticketResponse = await createTicket(ticketPayload);
      const ticketId = ticketResponse?.data?.data?.ticketId; 
      const projectName = ticketResponse?.data?.data?.projectName;
  
      if (!ticketId) {
        throw new Error("Ticket ID not returned from createTicket");
      }
  
      const notificationPayload = {
        empId: selectedUsers,
        notificationType: "Resource_Allocation",
        sourceEntityId: ticketId,
        message: `We would like you to Allocate Resources for our ${projectName} Project with consideration to all criteria’s required.Kindly  provide your confirmation at the earliest to avoid any delays in the process.`,
      };
  
      await createNotify(notificationPayload);
      console.log("🔔 Notification created");
  
      Swal.fire({
        icon: "success",
        title: "Tickets and Notifications Created",
        text: "Tickets and notifications successfully submitted.",
        timer: 1500,
        showConfirmButton: false,
      });
  
      setShowModal(false);
    } catch (err) {
      console.error("❌ Failed to create ticket or notification:", err);
    }
  };
  
  // Helper function to find the role mapping for a position in the finance table
  const getRoleMapping = (position) => {
    const roleMapping = {
      projectManager: "Project Manager",
      assistantProjectManager: "Assistant Project Manager",
      leadEngineer: "Lead Engineer",
      siteSupervisor: "Site Supervisor",
      qs: "QS",
      assistantQs: "Assistant QS",
      siteEngineer: "Site Engineer",
      engineer: "Engineer",
      designer: "Designer"
    };
    return roleMapping[position] || position;
  };

  // Function to update the finance approval table when team selection changes
  const updateFinanceApprovalWithSelectedTeam = () => {
    const newPermissionData = [...permissionData];
    
    // Process each role in the formData
    Object.keys(formData).forEach((field) => {
      if (
        ["projectManager", "assistantProjectManager", "leadEngineer", 
         "siteSupervisor", "qs", "assistantQs", "siteEngineer", 
         "engineer", "designer"].includes(field) &&
        Array.isArray(formData[field]) && 
        formData[field].length > 0
      ) {
        const roleName = getRoleMapping(field);
        
        // Check if the role already exists in permission data
        const existingRoleIndex = newPermissionData.findIndex(
          (item) => item.role === roleName
        );
        
        // Get the first employee from the field
        const selectedEmployee = formData[field][0];
        
        if (existingRoleIndex >= 0) {
          // Update existing entry
          newPermissionData[existingRoleIndex] = {
            ...newPermissionData[existingRoleIndex],
            employee: selectedEmployee.name || selectedEmployee.employeeName,
            employeeId: selectedEmployee.id || selectedEmployee.empId,
          };
        } else {
          // Add new entry if role doesn't exist
          newPermissionData.push({
            id: newPermissionData.length > 0 
               ? Math.max(...newPermissionData.map(item => item.id)) + 1 
               : 1,
            role: roleName,
            employee: selectedEmployee.name || selectedEmployee.employeeName,
            employeeId: selectedEmployee.id || selectedEmployee.empId,
            amount: "",
          });
        }
      }
    });
    
    setPermissionData(newPermissionData);
  };

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
          setErrorMessage(
            "Failed to load employee data. Please refresh and try again."
          );
        }
      };
      loadAllData();
    }
  }, [dataLoaded]);

  const generateFinanceApprovalRoles = () => {
    const newPermissionData = [];
    let idCounter = 1;
    const roleMap = new Map();

    // Process all employee types
    Object.keys(employees).forEach((empType) => {
      if (Array.isArray(employees[empType])) {
        employees[empType].forEach((emp) => {
          if (emp.role && !roleMap.has(emp.role)) {
            roleMap.set(emp.role, {
              employeeName: emp.employeeName,
              employeeId: Number(emp.empId), // Ensure ID is a number
            });
          }
        });
      }
    });

    const priorityRoles = [
      "CEO",
      "MD",
      "Directors",
      "Head Finance",
      "Finance",
      "General Manager (Technology)",
      "General Manager (Operation)",
    ];

    priorityRoles.forEach((role) => {
      if (roleMap.has(role)) {
        const empData = roleMap.get(role);
        newPermissionData.push({
          id: idCounter++,
          role: role,
          employee: empData.employeeName,
          employeeId: empData.employeeId,
          amount: "",
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
        amount: "",
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
      const ceoIndex = permissionDataArray.findIndex(
        (item) => item.role === "CEO"
      );

      if (ceoIndex >= 0) {
        permissionDataArray[ceoIndex] = {
          ...permissionDataArray[ceoIndex],
          employee: ceoEmployee.employeeName,
          employeeId: ceoEmployee.empId,
        };
      } else {
        permissionDataArray.unshift({
          id:
            permissionDataArray.length > 0
              ? Math.max(...permissionDataArray.map((item) => item.id)) + 1
              : 1,
          role: "CEO",
          employee: ceoEmployee.employeeName,
          employeeId: ceoEmployee.empId,
          amount: "",
        });
      }
    }
  };

  const handleToggleDropdown = (field) => {
    setLocalDropdownVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (toggleDropdown) {
      toggleDropdown(field);
    }
  };

  const closeAllDropdowns = () => setLocalDropdownVisible({});

  const handleAmountChange = (id, value) => {
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    setPermissionData((prevData) =>
      prevData.map((item) =>
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

    const projectId = Number(
      localStorage.getItem("projectId") || formData.projectId
    );
    if (!projectId) {
      setErrorMessage("Missing Project ID. Please create a project first.");
      setSubmitLoading(false);
      isSubmitting.current = false;
      return;
    }

    try {
      const teamData = {
        projectId,
        pmId: (formData.projectManager || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        apmId: (formData.assistantProjectManager || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        LeadEnggId: (formData.leadEngineer || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        SiteSupervisorId: (formData.siteSupervisor || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        qsId: (formData.qs || []).map((emp) => Number(emp.empId || emp.id)),
        aqsId: (formData.assistantQs || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        SiteEnggId: (formData.siteEngineer || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        EnggId: (formData.engineer || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        designerId: (formData.designer || []).map((emp) =>
          Number(emp.empId || emp.id)
        ),
        vendorId: (formData.vendors || []).map((emp) => Number(emp.id)),
        subcontractorId: (formData.subcontractors || []).map((emp) =>
          Number(emp.id)
        ),
      };

      const financeData = {
        projectId,
        projectPermissionFinanceApprovalList: permissionData
          .filter((emp) => emp.employeeId)
          .map((emp) => ({
            empId: Number(emp.employeeId),
            amount: parseFloat(emp.amount || 0),
          })),
      };

      // Execute both actions
      const [teamResult, financeResult] = await Promise.all([
        dispatch(createProjectTeamAction(teamData)),
        dispatch(createProjectFinanceApprovedAction(financeData)),
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
        showConfirmButton: false,
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
          replace: true,
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
      if (!event.target.closest(".multi-select-container")) {
        closeAllDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Watch for changes in formData team selections and update finance table
  useEffect(() => {
    if (dataLoaded) {
      updateFinanceApprovalWithSelectedTeam();
    }
  }, [
    formData.projectManager,
    formData.assistantProjectManager,
    formData.leadEngineer,
    formData.siteSupervisor,
    formData.qs,
    formData.assistantQs,
    formData.siteEngineer,
    formData.engineer,
    formData.designer,
    dataLoaded
  ]);

  const getEmployeesByField = (field) => {
    switch (field) {
      case "projectManager":
        return (
          employees.projectManagerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
            value: emp.isAllocated,
          })) || []
        );
      case "assistantProjectManager":
        return (
          employees.assistantProjectManagerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "leadEngineer":
        return (
          employees.leadEngineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "siteSupervisor":
        return (
          employees.siteSupervisorEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "qs":
        return (
          employees.qsEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "assistantQs":
        return (
          employees.assistantQsEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "siteEngineer":
        return (
          employees.siteEngineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "engineer":
        return (
          employees.engineerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "designer":
        return (
          employees.designerEmployees?.map((emp) => ({
            id: emp.empId,
            name: emp.employeeName,
          })) || []
        );
      case "vendors":
        return (
          vendors?.map((v) => ({ id: v.id, name: v.vendorName || v.name })) ||
          []
        );
      case "subcontractors":
        return (
          subcontractors?.map((s) => ({
            id: s.id,
            name: s.subcontractorName || s.name,
          })) || []
        );
      default:
        return [];
    }
  };

  // Replace the existing handleLocalSelectItem function with this one
  const handleLocalSelectItem = (field, item) => {
    setFormData((prevState) => {
      const currentSelection = prevState[field] || [];

      // Check if the item is already selected
      const isSelected = currentSelection.some(
        (selected) =>
          (selected.id && String(selected.id) === String(item.id)) ||
          (selected.empId && String(selected.empId) === String(item.id))
      );

      // If already selected, keep the current selection
      // Otherwise add the new item to the selection
      const updatedSelection = isSelected
        ? currentSelection
        : [...currentSelection, item];

      return {
        ...prevState,
        [field]: updatedSelection,
      };
    });

    // Keep the dropdown open for further selection
    setLocalDropdownVisible((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Also update the isItemSelected function for better checking
  const isItemSelected = (field, itemId) => {
    return (formData[field] || []).some(
      (item) =>
        (item.id && String(item.id) === String(itemId)) ||
        (item.empId && String(item.empId) === String(itemId))
    );
  };

  const getFilteredItems = (field) => {
    const itemsList = getEmployeesByField(field);
    if (!searchFilters[field]) return itemsList;
    return itemsList.filter((item) =>
      item.name.toLowerCase().includes(searchFilters[field].toLowerCase())
    );
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
      handleLocalSelectItem(field, item); // Add the selected item
      // Clear search input immediately after selecting
      handleSearchFilterChange({ target: { value: '' } }, field);
      handleToggleDropdown(field);
    };

    return (
      <Form.Group style={{ position: "relative", marginBottom: "15px" }}>
        <Form.Label className="text-dark">{label}</Form.Label>
        <div className="multi-select-container" style={{ position: "relative" }}>
          {/* Render selected items */}
          <div className="selected-items mb-2">
            {formData[field]?.map((item) => (
              <div
                key={item.id || item.empId}
                className="selected-item d-inline-block bg-light p-1 me-2 mb-1 rounded"
              >
                <span>{item.name}</span>
                <span className="badge bg-info ms-2">
                  {item.isAllocated ? "Allocated" : "Not Allocated"}
                </span>
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

          {/* Search input */}
          <Form.Control
            ref={inputRef}
            type="text"
            className="dropdown-toggle w-100"
            placeholder={
              (formData[field] && formData[field].length > 0) ? "" : (loading ? "Loading..." : "Search...")
            }
            value={searchFilters[field] || ""}
            onChange={(e) => handleSearchFilterChange(e, field)}
            onClick={() => handleToggleDropdown(field)}
            disabled={loading}
            autoComplete="off"
          />

          {/* Dropdown list */}
          {isDropdownVisible && (
            <div
              className="dropdown-menu show w-100"
              style={{ maxHeight: "200px", overflowY: "auto", zIndex: "9999" }}
            >
              {getFilteredItems(field).length > 0 ? (
                getFilteredItems(field).map((item) => (
                  <div
                  key={item.id}
                  className={`dropdown-item ${isItemSelected(field, item.id) ? "active" : ""}`}
                  onClick={() => handleItemClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex justify-content-between">
                    <span>{item.name}</span>
                    <span className="text-muted small">
                      {item.value ? "Allocated" : "Not Allocated"}
                    </span>
                  </div>
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
            <Col md={6} lg={4}>
              <MultiSelect
                field="projectManager"
                label="Project Manager"
                required
              />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect
                field="assistantProjectManager"
                label="Assistant Project Manager"
                required
              />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="leadEngineer" label="Lead Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="siteSupervisor" label="Site Supervisor" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="qs" label="QS" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="assistantQs" label="Assistant QS" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="siteEngineer" label="Site Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="engineer" label="Engineer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="designer" label="Designer" />
            </Col>
            <Col md={6} lg={4}>
              <MultiSelect field="vendors" label="Vendors" />
            </Col>
            <Col md={6} lg={4}>
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
                <th>Amount Limit (%)</th>
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
                      onChange={(e) =>
                        handleAmountChange(item.id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <div
        className="d-flex justify-content-end align-items-end"
        style={{ minHeight: "80px", marginTop: "20px" }}
      >
        <Button 
          className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2"
          onClick={async () => {
            const roleKey = "HR";
            const { success, data } = await fetchAllEmployees();
          
            if (
              !success ||
              !data?.employeesByRole ||
              !data.employeesByRole[roleKey] ||
              data.employeesByRole[roleKey].length === 0
            ) {
              Swal.fire({
                icon: "info",
                title: "No Employees",
                text: `No employees found in HR team.`,
              });
              return;
            }
          
            setEmployees(data.employeesByRole[roleKey]);
            setShowModal(true);
          }}
        >
          <svg
            className="me-2"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3.33464C9.22645 3.33464 8.48459 3.64193 7.93761 4.18891C7.39062 4.73589 7.08333 5.47775 7.08333 6.2513C7.08333 7.02485 7.39062 7.76672 7.93761 8.3137C8.48459 8.86068 9.22645 9.16797 10 9.16797C10.7735 9.16797 11.5154 8.86068 12.0624 8.3137C12.6094 7.76672 12.9167 7.02485 12.9167 6.2513C12.9167 5.47775 12.6094 4.73589 12.0624 4.18891C11.5154 3.64193 10.7735 3.33464 10 3.33464ZM5.41667 6.2513C5.41667 5.03573 5.89955 3.86994 6.75909 3.0104C7.61864 2.15085 8.78442 1.66797 10 1.66797C11.2156 1.66797 12.3814 2.15085 13.2409 3.0104C14.1004 3.86994 14.5833 5.03573 14.5833 6.2513C14.5833 7.46688 14.1004 8.63267 13.2409 9.49221C12.3814 10.3518 11.2156 10.8346 10 10.8346C8.78442 10.8346 7.61864 10.3518 6.75909 9.49221C5.89955 8.63267 5.41667 7.46688 5.41667 6.2513ZM2.5 15.8346C2.5 14.7296 2.93899 13.6698 3.72039 12.8884C4.50179 12.107 5.5616 11.668 6.66667 11.668H13.3333C14.4384 11.668 15.4982 12.107 16.2796 12.8884C17.061 13.6698 17.5 14.7296 17.5 15.8346V18.3346H2.5V15.8346ZM6.66667 13.3346C6.00363 13.3346 5.36774 13.598 4.8989 14.0669C4.43006 14.5357 4.16667 15.1716 4.16667 15.8346V16.668H15.8333V15.8346C15.8333 15.1716 15.5699 14.5357 15.1011 14.0669C14.6323 13.598 13.9964 13.3346 13.3333 13.3346H6.66667Z"
              fill="#FF6F00"
            />
          </svg>
          Send To
        </Button>
        <Button
          className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
          onClick={async () => {
            if (!submitLoading) {
              await handleSubmit();
              if (onNext) {
                onNext();
              }
            }
          }}
          disabled={submitLoading}
        >
          {submitLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Next >"
          )}
        </Button>
      </div>

      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          {employee.map((user) => (
            <div key={user.empId} className="d-flex align-items-center mb-3">
              <Form.Check
                type="checkbox"
                className="me-3"
                checked={selectedUsers.includes(user.empId)}
                onChange={() => handleCheckboxChange(user.empId)}
              />
              <img
                src={profile}
                alt={`${user.employeeName}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <p className="mb-0 fs-22-700 text-dark">
                {user.employeeName}
                <span className="d-block fs-14-400 text-dark-grey">
                  {user.role}
                </span>
              </p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className={`d-flex justify-content-center ${
              selectedUsers.length > 0 ? "btn-allow" : "btn-not-allow"
            }`}
            onClick={handleTicketSubmission}
            disabled={selectedUsers.length === 0}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default ProjectTeamStakeholder;