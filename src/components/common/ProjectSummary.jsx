import { Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal, Spinner, Table } from "react-bootstrap";
import { profile } from "../../assets/images";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailsAction } from "../../store/actions/Ceo/ceoprojectAction";
import { fetchRoles } from "../../store/actions/hr/designationaction";
import { useRoleBasedEmp } from "../../hooks/Ceo/useRoleBasedEmp";
import { useTicket } from "../../hooks/Ceo/useTicket";
import { useNotification } from "../../hooks/Ceo/useNotification";

const ProjectSummary = ({ formData, onBackClick }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createTicket } = useTicket();
  const { fetchAllEmployees } = useRoleBasedEmp();
  const { createNotify } = useNotification();

  console.log("Project ID from URL:", projectId);

  const { loading, data: projectDetails } = useSelector(
    (state) => state.project.getProjectDetails
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dynamicRoles, setDynamicRoles] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState([]);
  const [localFormData, setLocalFormData] = useState({
    project: {},
    budget_details: [],
    team_details: [],
    finance_approval_data: [],
    milestone_details: [],
    risk_management_data: [],
  });

  const [projectData, setProjectData] = useState();

  const PROJECT_TYPES = {
    1: "Residential",
    2: "Industrial",
  };

  const PROJECT_SECTORS = {
    1: "Public",
    2: "Private",
  };

  useEffect(() => {
    if (projectId) {
      getProjectDetails();
    }
  }, [projectId]);

  const getProjectDetails = async () => {
    const result = await dispatch(getProjectDetailsAction(projectId));
    setProjectData(result?.payload?.value);
  };

  useEffect(() => {
    if (projectDetails) {
      setLocalFormData({
        project: projectDetails.project || {},
        budget_details: projectDetails.budget_details || [],
        team_details: projectDetails.team_details || [],
        finance_approval_data: projectDetails.finance_approval_data || [],
        milestone_details: projectDetails.milestone_details || [],
        risk_management_data: projectDetails.risk_management_data || [],
      });
    }
  }, [projectDetails]);

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const getProjectTypeName = () => {
    if (!projectData?.project?.project_type_id) return "Not provided";
    return (
      PROJECT_TYPES[projectData?.project?.project_type_id] || "Not provided"
    );
  };

  const getProjectSectorName = () => {
    if (!localFormData.project.project_sector_id) return "Not provided";
    return (
      PROJECT_SECTORS[localFormData.project.project_sector_id] || "Not provided"
    );
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // if (!localFormData.project.project_id) {
  //   return <Navigate to="/projects" />;
  // }

  return (
    <div className="project-summary p-5">
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

      {/* 01. Project Basic Details */}
      <div className="summary-section mt-4">
        <div className="summary-header">
          <h3>01. Project Basic Details</h3>
          <Button
            variant="link"
            className="edit-btn"
            onClick={() => navigate(`../createproject/${projectId}`)}
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
                value={projectData?.project?.project_name || "Not provided"}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Location</label>
              <Form.Control
                disabled
                type="text"
                value={projectData?.project?.project_location || "Not provided"}
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Type</label>
              <Form.Control disabled type="text" value={getProjectTypeName()} />
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
                value={
                  projectData?.project?.project_sector_name || "Not provided"
                }
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
                  value={
                    projectData?.project?.project_start_date || "Not provided"
                  }
                />
                <Calendar className="date-icon" />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field position-relative">
              <label>Expected Completion Date</label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  value={
                    projectData?.project?.project_end_date || "Not provided"
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
                as="textarea"
                rows={3}
                value={
                  projectData?.project?.project_description || "Not provided"
                }
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* 02. Budget & Financial Allocation */}
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
                value={`₹ ${
                  projectData?.project?.project_total_budget?.toLocaleString() ||
                  "Not provided"
                }`}
              />
            </div>
          </Col>
        </Row>
        <div className="budget-breakdown-summary">
          <h3 className="text-dark-gray fs-22-700 mb-0">Budget Breakdown</h3>
          <Table bordered responsive className="mt-4 w-100">
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
              {projectData?.budget_details?.map((item, index) => (
                <tr key={index}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.project_expense_category}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.estimated_cost?.toLocaleString() || "-"}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.approved_budget?.toLocaleString() || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 03. Project Team & Stakeholder Assignment */}
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
              <div className="summary-multi-selectn">
                {projectData?.team_details
                  ?.filter((t) => t.role === "Project Manager")
                  .map((item) => (
                    <div key={item.emp_id} className="summary-tag width-100">
                      <Form.Control
                        disabled
                        type="text"
                        value={item.emp_name || "Not assigned"}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
        <div className="permission-approval-summary">
          <h4>Permission and Finance Approval</h4>
          <Table bordered responsive className="mt-4 w-100">
            <thead>
              <tr>
                <th className="text-center text-dark fs-18-500">S.No</th>
                <th className="text-center text-dark fs-18-500">Employee</th>
                <th className="text-center text-dark fs-18-500">Amount %</th>
              </tr>
            </thead>
            <tbody>
              {projectData?.finance_approval_data?.map((item, index) => (
                <tr key={item.permission_finance_approval_id}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div className="employee-cell">
                      <div className="employee-avatar"></div>
                      <span>{item.emp_name}</span>
                    </div>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {item.amount || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 04. Timeline & Milestone Planning */}
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
        {!projectData?.milestone_details ? (
          <div className="text-center py-4">
            <p>No Timeline & Milestone data available</p>
          </div>
        ) : (
          <Table bordered responsive className="mt-4 w-100">
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
              {projectData?.milestone_details?.map((milestone) => (
                <tr key={milestone.milestone_id}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {milestone.milestone_name}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {milestone.milestone_description}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {milestone.milestone_start_date || "Not set"}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {milestone.milestone_end_date || "Not set"}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div
                      className={`status-badge ${milestone.milestone_status?.toLowerCase()}`}
                    >
                      {milestone.milestone_status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* 05. Risk & Compliance Assessment */}
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
        {projectData?.risk_management_data ? (
          <Table bordered responsive className="mt-4 w-100">
            <thead>
              <tr>
                <th className="text-center text-dark fs-18-500">S. No</th>
                <th className="text-center text-dark fs-18-500">Category</th>
                <th className="text-center text-dark fs-18-500">Status</th>
                <th className="text-center text-dark fs-18-500">File</th>
              </tr>
            </thead>
            <tbody>
              {projectData?.risk_management_data?.map((risk, index) => (
                <tr key={risk.id || index}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {risk.category_name}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div
                      className={`status-badge ${risk.risk_status?.toLowerCase()}`}
                    >
                      {risk.risk_status === "Completed" && (
                        <span className="status-icon">✓</span>
                      )}
                      {risk.risk_status === "Pending" && (
                        <span className="status-icon">!</span>
                      )}
                      {risk.risk_status}
                    </div>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {risk.image_url ? (
                      <a
                        href={risk?.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        {risk?.image_url.slice(-15)}
                      </a>
                    ) : (
                      <Button variant="link" className="upload-btn">
                        Not Uploaded
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center py-4">
            <p>No risk management data available</p>
          </div>
        )}
      </div>

      <div className="form-actions text-center mt-4 w-100 flex-end d-flex  justify-content-end">
        <Button
          className="submit-btn  w-auto  border-0 "
          onClick={async () => {
            try {
              const rolesResponse = await dispatch(fetchRoles());
              console.log("Roles Response:", rolesResponse);

              if (rolesResponse?.payload?.length > 0) {
                const targetRoles = [
                  "Managing Director",
                  "Director",
                  "Head Finance",
                  "GM Technology",
                ];

                const filteredRoles = rolesResponse?.payload?.filter((role) =>
                  targetRoles.includes(role.roleName)
                );

                const allEmployees = [];

                for (const role of filteredRoles) {
                  const empResponse = await fetchAllEmployees(role.roleId);

                  const employeesByRole = empResponse?.data?.employeesByRole;

                  if (employeesByRole) {
                    const employeesForExactRole =
                      employeesByRole[role.roleName];
                    if (Array.isArray(employeesForExactRole)) {
                      allEmployees.push(
                        ...employeesForExactRole.map((emp) => ({
                          ...emp,
                          roleName: role.roleName,
                        }))
                      );
                    }
                  }
                }

                console.log("All Employees:", allEmployees);

                setEmployeesByRole(allEmployees);
                setShowModal(true);
              }
            } catch (error) {
              console.error("Error fetching roles/employees:", error);
            }
          }}
        >
          Submit for Approval
        </Button>
      </div>

      {/* Approval Modal */}
      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Approvers</Modal.Title>
        </Modal.Header>
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
            variant="primary"
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              if (selectedUsers.length === 0) {
                Swal.fire({
                  icon: "warning",
                  title: "No Employees Selected",
                  text: "Please select at least one employee.",
                });
                return;
              }

              try {
                const userData = JSON.parse(localStorage.getItem("userData"));

                // 1. Create Ticket
                const createdBy = parseInt(localStorage.getItem("userRoleId"));

                // 1. Create Ticket for all selected users at once
                const ticketResponse = await createTicket({
                  projectId: projectData?.project.project_id,
                  ticketType: "submit",
                  assignTo: selectedUsers,
                  createdBy: userData.empId,
                  assignTo: selectedUsers, // ✅ array of empIds
                  createdBy: createdBy,
                });

                console.log("Ticket Response:", ticketResponse);

                const createdTicketId = ticketResponse?.data?.data?.ticketId;

                // 2. Create notification
                await createNotify({
                  empId: selectedUsers,
                  notificationType: "approval-request",
                  sourceEntityId: 0,
                  message: `Approval requested for project ${localFormData.project.project_name}`,
                  notificationType: "Project_Finalisation_Approval",
                  sourceEntityId: createdTicketId,
                  message: `We would like to update you that we are currently awaiting approval on the Project Finalisation Report submitted for  ${localFormData.projectName}. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.`,
                });

                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Project submitted for approval",
                  timer: 1500,
                  showConfirmButton: false,
                });

                setShowModal(false);
                console.log("createdTicketId_createdTicketId", createdTicketId);

                if (createdTicketId) {
                  setTimeout(() => {
                    navigate(`../ticket/${createdTicketId}`);
                  }, 100);
                }
              } catch (error) {
                console.error("Failed to create ticket/notification:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Could not submit for approval",
                });
              }
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectSummary;
