import { Calendar } from "lucide-react";
import React, { useState } from "react";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { profile } from "../../../assets/images";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Permission and Finance Approval data
const permissionData = [
  { id: 1, role: "MD", employee: "Kristin Watson", amount: "" },
  { id: 2, role: "Directors", employee: "Floyd Miles", amount: "" },
  { id: 3, role: "Head Finance", employee: "Jerome Bell", amount: "" },
  { id: 4, role: "CEO", employee: "Albert Flores", amount: "" },
  {
    id: 5,
    role: "General Manager (Technology)",
    employee: "Bessie Cooper",
    amount: "",
  },
  {
    id: 6,
    role: "General Manager (Operation)",
    employee: "Robert Fox",
    amount: "",
  },
  { id: 7, role: "Finance", employee: "Jane Cooper", amount: "" },
];
const ProjectSummary = ({
  formData,
  onBackClick,
  createTicket,
  createNotify,
  fetchroles,
  fetchAllEmployees,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dynamicRoles, setDynamicRoles] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState([]);

  const navigate = useNavigate();
  const users = [
    { id: 1, name: "Jacob Jones", role: "Managing Director" },
    { id: 2, name: "Robert Fox", role: "Director" },
    { id: 3, name: "Floyd Miles", role: "Director" },
    { id: 4, name: "Devon Lane", role: "Finance Head" },
    { id: 5, name: "Cody Fisher", role: "GM Technology", image: "T" },
  ];
  const PROJECT_TYPES = {
    1: "Residential",
    2: "Industrial",
  };
  const PROJECT_SECTORS = {
    1: "Public",
    2: "Private",
  };
  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };
  // Get Project Type name from ID
  const getProjectTypeName = () => {
    if (!formData.projectTypeId) return "Not provided";
    return PROJECT_TYPES[formData.projectTypeId] || "Not provided";
  };

  // Get Project Sector name from ID
  const getProjectSectorName = () => {
    if (!formData.projectSectorId) return "Not provided";
    return PROJECT_SECTORS[formData.projectSectorId] || "Not provided";
  };
  return (
    <div className="project-summary">
      <div className="breadcrumb-container pb-3 d-flex align-items-center">
        <span className="breadcrumb-item">Projects</span>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
        </svg>
        <span className="breadcrumb-item">Creation</span>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
        </svg>
        <span className="breadcrumb-item active">Project Summary</span>
      </div>

      <div className="summary-section mt-4">
        <div className="summary-header">
          <h3>01. Project Basic Details</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => onBackClick(0)}
          >
            Edit
          </Button>
        </div>
        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Name</label>
              <Form.Control
                disabled
                type="text"
                placeholder={formData.projectName || "Not provided"}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Location</label>
              <Form.Control
                disabled
                type="text"
                placeholder={formData.projectLocation || "Not provided"}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Type</label>
              <Form.Control
                disabled
                type="text"
                placeholder={getProjectTypeName()}
              />
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Sector</label>
              <Form.Control
                disabled
                type="text"
                placeholder={getProjectSectorName()}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Start Date</label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  placeholder={formData.projectStartDate || "Not provided"}
                />
                <Calendar className="date-icon" />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field position-relative ">
              <label>Expected Completion Date</label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  placeholder={
                    formData.expectedCompletionDate || "Not provided"
                  }
                />
                <Calendar className="date-icon" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="summary-field">
              <label>Description</label>
              <Form.Control
                disabled
                type="text"
                placeholder={formData.description || "Not provided"}
              />
            </div>
          </Col>
        </Row>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h3>02. Budget & Financial Allocation</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => onBackClick(1)}
          >
            Edit
          </Button>
        </div>
        <Row className="mb-3">
          <Col md={6}>
            <div className="summary-field">
              <label className="text-dark fs-26-700">
                Total Project Budget
              </label>
              <Form.Control
                disabled
                type="text"
                placeholder={`(₹) ${formData.totalBudget || "Not provided"}`}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="summary-field">
              <label className="text-dark fs-26-700">Send To</label>
              <Form.Control
                disabled
                type="text"
                placeholder={formData.sendTo || "Not provided"}
              />
            </div>
          </Col>
        </Row>
        <div className="budget-breakdown-summary">
          <h3 className="text-dark-gray fs-22-700 mb-0">Budget Breakdown</h3>
          <table bordered responsive className="tbl mt-4 w-100">
            <thead>
              <tr>
                <th className="text-center text-dark fs-18-500">S.No</th>
                <th className="text-center text-dark fs-18-500">
                  Expense Category
                </th>
                <th className="text-center text-dark fs-18-500">
                  Estimated Cost (₹)
                </th>
                <th className="text-center text-dark fs-18-500">
                  Approved Budget (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.budgetBreakdown.map((item) => (
                <tr key={item.id}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {String(item.id).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.category}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.estimatedCost || "-"}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.approvedBudget || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h3>03. Project Team & Stakeholder Assignment</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => onBackClick(2)}
          >
            Edit
          </Button>
        </div>
        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Manager</label>
              <div className="summary-multi-selectn ">
                {formData.projectManager.length > 0 ? (
                  formData.projectManager.map((item) => (
                    <div key={item.id} className="summary-tag width-100">
                      <Form.Control
                        disabled
                        type="text"
                        placeholder={item.name || "Not assigned"}
                      />
                    </div>
                  ))
                ) : (
                  <p>Not assigned</p>
                )}
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Assistant Project Manager</label>
              <div className="summary-multi-select">
                {formData.assistantProjectManager.length > 0 ? (
                  formData.assistantProjectManager.map((item) => (
                    <div key={item.id} className="summary-tag width-100">
                      <Form.Control
                        disabled
                        className=" width-100"
                        type="text"
                        placeholder={item.name || "Not assigned"}
                      />
                    </div>
                  ))
                ) : (
                  <p>Not assigned</p>
                )}
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Lead Engineer</label>
              <div className="summary-multi-select">
                {formData.leadEngineer.length > 0 ? (
                  formData.leadEngineer.map((item) => (
                    <div key={item.id} className="summary-tag width-100">
                      <Form.Control
                        disabled
                        type="text"
                        placeholder={item.name || "Not assigned"}
                      />
                    </div>
                  ))
                ) : (
                  <p>Not assigned</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <div className="permission-approval-summary">
          <h4>Permission and Finance Approval</h4>
          <table bordered responsive className="tbl mt-4 w-100">
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
                    {item.amount || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h3>04. Timeline & Milestone Planning</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => onBackClick(3)}
          >
            Edit
          </Button>
        </div>
        <table bordered responsive className="tbl mt-4 w-100">
          <thead>
            <tr>
              <th className="text-center text-dark fs-18-500">Milestone</th>
              <th className="text-center text-dark fs-18-500">Description</th>
              <th className="text-center text-dark fs-18-500">Start Date</th>
              <th className="text-center text-dark fs-18-500">End Date</th>
              <th className="text-center text-dark fs-18-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {formData.milestones.map((milestone) => (
              <tr key={milestone.id}>
                <td className="text-center text-dark-gray fs-16-500">
                  {milestone.name}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  {milestone.description}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  {milestone.startDate || "Not set"}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  {milestone.endDate || "Not set"}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  <div
                    className={`status-badge ${milestone.status.toLowerCase()}`}
                  >
                    {milestone.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary-section">
        <div className="summary-header">
          <h3>05. Risk & Compliance Assessment</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => onBackClick(4)}
          >
            Edit
          </Button>
        </div>
        <table bordered responsive className="tbl mt-4 w-100">
          <thead>
            <tr>
              <th className="text-center text-dark fs-18-500">S. No</th>
              <th className="text-center text-dark fs-18-500">Category</th>
              <th className="text-center text-dark fs-18-500">Status</th>
              <th className="text-center text-dark fs-18-500">File</th>
            </tr>
          </thead>
          <tbody>
            {formData.risks.map((risk) => (
              <tr key={risk.id}>
                <td className="text-center text-dary fs-16-500">
                  {String(risk.id).padStart(2, "0")}
                </td>
                <td className="text-center text-dark fs-16-500">
                  {risk.category}
                </td>
                <td className="text-center text-dark fs-16-500">
                  <div className={`status-badge ${risk.status.toLowerCase()}`}>
                    {risk.status === "Completed" && (
                      <span className="status-icon">✓</span>
                    )}
                    {risk.status === "Pending" && (
                      <span className="status-icon">!</span>
                    )}
                    {risk.status}
                  </div>
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  {risk.file ? (
                    risk.file.name
                  ) : (
                    <Button variant="link" className="upload-btn">
                      Upload
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-actions text-center mt-4">
        <Button
          variant="primary"
          className="submit-btn"
          onClick={async () => {
            try {
              const rolesResponse = await fetchroles();

              if (rolesResponse?.data) {
                const targetRoles = [
                  "Managing Director",
                  "Director",
                  "Finance Head",
                  "GM Technology",
                ];

                const filteredRoles = rolesResponse.data.filter((role) =>
                  targetRoles.includes(role.roleName)
                );

                console.log("🎯 Filtered Roles:", filteredRoles);

                const allEmployees = [];

                for (const role of filteredRoles) {
                  const empResponse = await fetchAllEmployees(role.roleId);

                  console.log("👀 empResponse:", empResponse);

                  const employeesByRole = empResponse?.data?.employeesByRole;

                  if (employeesByRole) {
                    const employeesForExactRole =
                      employeesByRole[role.roleName]; // 🔥 exact match

                    if (Array.isArray(employeesForExactRole)) {
                      console.log(
                        `👀 Employees for role (${role.roleName}):`,
                        employeesForExactRole
                      );

                      allEmployees.push(
                        ...employeesForExactRole.map((emp) => ({
                          ...emp,

                          roleName: role.roleName, // keep correct roleName
                        }))
                      );
                    } else {
                      console.warn(
                        `⚠️ No employees found under role: ${role.roleName}`
                      );
                    }
                  }
                }

                console.log("🎯 All Employees collected:", allEmployees);

                setEmployeesByRole(allEmployees);

                setShowModal(true);
              } else {
                console.error("❌ No roles fetched");
              }
            } catch (error) {
              console.error("❌ Error fetching roles/employees:", error);
            }
          }}
        >
          Submit for Approval
        </Button>
      </div>

      {/* Modal popup  */}

      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          {employeesByRole.length > 0 ? (
            employeesByRole.map((emp) => (
              <div key={emp.empId} className="d-flex align-items-center mb-3">
                <Form.Check
                  type="checkbox"
                  className="me-3"
                  checked={selectedUsers.includes(emp.empId)}
                  onChange={() => handleCheckboxChange(emp.empId)}
                />

                <img
                  src={profile}
                  alt={`${emp.name || "Employee"}'s profile`}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />

                <p className="mb-0 fs-22-700 text-dark">
                  {emp.employeeName}

                  <span className="d-block fs-14-400 text-dark-grey">
                    {emp.roleName}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No employees found under selected roles.</p>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className={`d-flex justify-content-center ${
              selectedUsers.length > 0 ? "btn-allow" : "btn-not-allow"
            }`}
            onClick={async () => {           
              try {
                for (const empId of selectedUsers) {
                  const selectedEmployee = employeesByRole.find(emp => emp.empId === empId);
                  if (!selectedEmployee) continue;
            
                  // 1. Create Ticket for THIS employee only
                  const ticketResponse = await createTicket({
                    projectId: formData.projectId,
                    ticketType: "submit",
                    assignTo: selectedUsers,
                    createdBy: 1
                  });
                  
                  const ticketId = ticketResponse?.data?.ticketId; 
            
                  // 2. Create Notification for THIS employee only
                  await createNotify({
                    empId: [empId],  // ✅ Only this user's id
                    notificationType: "approval-request",
                    sourceEntityId: 0,
                    message: `Approval requested for project ${formData.projectName}`
                  });

                  if (ticketId) {
                    Swal.fire({
                      icon: "success",
                      title: "Tickets and Notifications Created",
                      text: "Tickets and notifications successfully submitted.",
                      timer: 1500,
                      showConfirmButton: false,
                    });
                  
                    setShowModal(false);
                    navigate(`/ceo/ticketdetails/${ticketId}`);
                  }
                }
            
                
                
              } catch (error) {
                console.error("❌ Failed to create ticket/notification:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went wrong. Please try again.",
                });
              }
            }}
            disabled={selectedUsers.length === 0}
            
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectSummary;
