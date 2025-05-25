"use client";

import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button, Row, Col, Form, Modal, Spinner, Table } from "react-bootstrap";
import { profile } from "../../assets/images";
import { useNavigate, useParams } from "react-router-dom";
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

  const { loading } = useSelector((state) => state.project.getProjectDetails);

  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [employeesByRole, setEmployeesByRole] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Enhanced data mapping constants
  const PROJECT_TYPES = {
    1: "Residential",
    2: "Industrial",
    3: "Commercial",
    4: "Infrastructure",
  };

  const PROJECT_SECTORS = {
    1: "Public",
    2: "Private",
    3: "Government",
    4: "Corporate",
  };

  const ALL_PROJECT_ROLES = [
    "Project Manager",
    "Assistant Project Manager",
    "Lead Engineer",
    "Site Supervisor",
    "Quantity Surveyor",
    "Assistant Quantity Surveyor",
    "Site Engineer",
    "Engineer",
    "Designer",
  ];

  // Enhanced helper functions
  const isEmpty = (value) => {
    if (value === null || value === undefined || value === "") return true;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    if (typeof value === "string") return value.trim() === "";
    return false;
  };

  const displayValue = (value, fallback = "Not Available") => {
    if (isEmpty(value)) return fallback;
    if (typeof value === "string") return value.trim();
    return String(value);
  };

  const displayAmount = (value, prefix = "₹ ") => {
    if (isEmpty(value) || isNaN(value)) return "Not Available";
    const numValue = Number.parseFloat(value);
    return `${prefix}${numValue.toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString) => {
    if (isEmpty(dateString)) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const getAllRolesWithMembers = () => {
    const allocatedMembers = projectData?.team_details || [];

    // Group members by role to handle multiple people in same role
    const membersByRole = allocatedMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {});

    return ALL_PROJECT_ROLES.map((role) => {
      const assignedMembers = membersByRole[role] || [];
      return {
        role: role,
        members: assignedMembers,
        isAssigned: assignedMembers.length > 0,
      };
    });
  };

  // Enhanced data fetching
  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      setDataLoading(true);
      const result = await dispatch(getProjectDetailsAction(projectId));

      if (result?.payload?.value) {
        const data = result.payload.value;
        console.log("Fetched Project Data:", data);

        // Enhanced data structure with proper validation
        const enhancedData = {
          project: data.project || {},
          budget_details: Array.isArray(data.budget_details)
            ? data.budget_details
            : [],
          team_details: Array.isArray(data.team_details)
            ? data.team_details
            : [],
          finance_approval_data: Array.isArray(data.finance_approval_data)
            ? data.finance_approval_data
            : [],
          milestone_details: Array.isArray(data.milestone_details)
            ? data.milestone_details
            : [],
          risk_management_data: Array.isArray(data.risk_management_data)
            ? data.risk_management_data
            : [],
          subcontractor_details: Array.isArray(data.subcontractor_details)
            ? data.subcontractor_details
            : [],
          vendor_details: Array.isArray(data.vendor_details)
            ? data.vendor_details
            : [],
        };

        setProjectData(enhancedData);
      } else {
        console.warn("No project data received");
        setProjectData({
          project: {},
          budget_details: [],
          team_details: [],
          finance_approval_data: [],
          milestone_details: [],
          risk_management_data: [],
          subcontractor_details: [],
          vendor_details: [],
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load project data. Please refresh the page.",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const getProjectTypeName = () => {
    const typeId = projectData?.project?.project_type_id;
    if (!typeId) return "Not Available";
    return (
      PROJECT_TYPES[typeId] ||
      projectData?.project?.project_type_name ||
      "Not Available"
    );
  };

  const getProjectSectorName = () => {
    const sectorId = projectData?.project?.project_sector_id;
    if (!sectorId) return "Not Available";
    return (
      PROJECT_SECTORS[sectorId] ||
      projectData?.project?.project_sector_name ||
      "Not Available"
    );
  };

  // Enhanced empty state components
  const EmptyState = ({ message = "No data available", showIcon = true }) => (
    <div className="text-center py-4 text-muted border rounded bg-light">
      {showIcon && <div className="mb-2">📋</div>}
      <p className="mb-0 fs-16-500">{message}</p>
    </div>
  );

  const EmptyTableRow = ({ colSpan, message = "No data available" }) => (
    <tr>
      <td colSpan={colSpan} className="text-center py-4 text-muted">
        <em>{message}</em>
      </td>
    </tr>
  );

  // Enhanced loading state
  if (dataLoading || loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading project summary...</p>
        </div>
      </div>
    );
  }

  // Enhanced error state
  if (!projectData) {
    return (
      <div className="text-center py-5">
        <h4>Unable to load project data</h4>
        <p>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="project-summary p-5">
      {/* Enhanced Breadcrumb */}
      <div className="breadcrumb-container pb-3 d-flex align-items-center">
        <span className="breadcrumb-item">Projects</span>
        <svg
          className="mx-2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
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
        >
          <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
        </svg>
        <span className="breadcrumb-item active">Project Summary</span>
      </div>

      {/* 01. Enhanced Project Basic Details */}
      <div className="summary-section mt-4">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3>01. Project Basic Details</h3>
          <Button
            variant="link"
            className="edit-btn text-primary"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 0 } })
            }
          >
            ✏️ Edit
          </Button>
        </div>

        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">Project Name</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_name)}
                className={
                  isEmpty(projectData?.project?.project_name)
                    ? "text-muted"
                    : ""
                }
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">Location</label>
              <Form.Control
                disabled
                type="text"
                value={displayValue(projectData?.project?.project_location)}
                className={
                  isEmpty(projectData?.project?.project_location)
                    ? "text-muted"
                    : ""
                }
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">Project Type</label>
              <Form.Control
                disabled
                type="text"
                value={getProjectTypeName()}
                className={
                  getProjectTypeName() === "Not Available" ? "text-muted" : ""
                }
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">Project Sector</label>
              <Form.Control
                disabled
                type="text"
                value={getProjectSectorName()}
                className={
                  getProjectSectorName() === "Not Available" ? "text-muted" : ""
                }
              />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">
                Project Start Date
              </label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  value={formatDate(projectData?.project?.project_start_date)}
                  className={
                    isEmpty(projectData?.project?.project_start_date)
                      ? "text-muted"
                      : ""
                  }
                />
                <Calendar
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                  size={16}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">
                Expected Completion Date
              </label>
              <div className="position-relative w-100">
                <Form.Control
                  disabled
                  type="text"
                  value={formatDate(projectData?.project?.project_end_date)}
                  className={
                    isEmpty(projectData?.project?.project_end_date)
                      ? "text-muted"
                      : ""
                  }
                />
                <Calendar
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                  }}
                  size={16}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">Description</label>
              <Form.Control
                disabled
                as="textarea"
                rows={3}
                value={displayValue(projectData?.project?.project_description)}
                className={
                  isEmpty(projectData?.project?.project_description)
                    ? "text-muted"
                    : ""
                }
              />
            </div>
          </Col>
        </Row>
      </div>

      {/* 02. Enhanced Budget & Financial Allocation */}
      <div className="summary-section">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3>02. Budget & Financial Allocation</h3>
          <Button
            variant="link"
            className="edit-btn text-primary"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 1 } })
            }
          >
            ✏️ Edit
          </Button>
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <div className="summary-field">
              <label className="fw-bold text-dark mb-2">
                Total Project Budget
              </label>
              <Form.Control
                disabled
                type="text"
                value={displayAmount(
                  projectData?.project?.project_total_budget
                )}
                className={`fs-5 fw-bold ${
                  isEmpty(projectData?.project?.project_total_budget)
                    ? "text-muted"
                    : "text-success"
                }`}
              />
            </div>
          </Col>
        </Row>

        <div className="budget-breakdown-summary">
          <h4 className="text-dark-gray fs-22-700 mb-3">Budget Breakdown</h4>
          {!isEmpty(projectData?.budget_details) ? (
            <Table bordered responsive className="mt-4 w-100">
              <thead className="table-light">
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
                {projectData.budget_details.map((item, index) => (
                  <tr key={item.project_budget_id || index}>
                    <td className="text-center text-dark-gray fs-16-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      {displayValue(item.project_expense_category)}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      {item.estimated_cost === 0
                        ? ""
                        : displayAmount(item.estimated_cost, "")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500 fw-bold">
                      {item.approved_budget === 0
                        ? ""
                        : displayAmount(item.approved_budget, "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState message="No budget breakdown data available. Please add budget details in the Budget & Financial Allocation section." />
          )}
        </div>
      </div>

      {/* 03. Enhanced Project Team & Stakeholder Assignment */}
      <div className="summary-section">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3>03. Project Team & Stakeholder Assignment</h3>
          <Button
            variant="link"
            className="edit-btn text-primary"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 2 } })
            }
          >
            ✏️ Edit
          </Button>
        </div>

        <h5 className="mb-3">Team Members</h5>
        <Row className="mb-4">
          {getAllRolesWithMembers().map((roleData, index) => (
            <Col md={6} lg={4} key={roleData.role || index} className="mb-3">
              <div className="summary-field">
                <label className="fw-bold text-dark mb-2">
                  {displayValue(roleData.role)}
                </label>
                {roleData.isAssigned ? (
                  <div>
                    <div className="d-flex align-items-center p-2 border rounded bg-light mb-2">
                      <div className="flex-grow-1">
                        {roleData.members.map((member, memberIndex) => (
                          <span className="text-dark d-block">
                            {displayValue(member.emp_name)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center p-2 border rounded bg-light">
                    <div className="me-2">
                      <div
                        className=" text-white d-flex align-items-center justify-content-center"
                        style={{
                          height: "32px",
                          fontSize: "14px",
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          ))}
          <div class="mb-3 col-lg-4 col-md-6">
            <div class="summary-field">
              <label class="fw-bold text-dark mb-2">Subcontractor</label>
              {!isEmpty(projectData?.subcontractor_details) ? (
                <div className="d-flex align-items-center p-2 border rounded bg-light">
                  <div className="me-2">
                    {projectData.subcontractor_details.map(
                      (subcontractor, index) => (
                        <div className="">
                          <span key={subcontractor.subcontractor_id || index}>
                            {displayValue(subcontractor.subcontractor_name)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center p-2 border rounded bg-light">
                  <div className="me-2">
                    <div
                      className=" text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: "14px",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div class="mb-3 col-lg-4 col-md-6">
            <div class="summary-field">
              <label class="fw-bold text-dark mb-2">Vendor</label>
              {!isEmpty(projectData?.vendor_details) ? (
                <div className="d-flex align-items-center p-2 border rounded bg-light">
                  <div className="me-2">
                    {projectData.vendor_details.map((vendor, index) => (
                        <div className="">
                          <span key={vendor.vendor_id || index}>
                            {displayValue(vendor.vendor_name)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center p-2 border rounded bg-light">
                  <div className="me-2">
                    <div
                      className=" text-white d-flex align-items-center justify-content-center"
                      style={{
                        height: "32px",
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Row>

        <div className="permission-approval-summary">
          <h5 className="mb-3">Permission and Finance Approval</h5>
          {!isEmpty(projectData?.finance_approval_data) ? (
            <Table bordered responsive className="mt-4 w-100">
              <thead className="table-light">
                <tr>
                  <th className="text-center text-dark fs-18-500">S.No</th>
                  <th className="text-center text-dark fs-18-500">Employee</th>
                  <th className="text-center text-dark fs-18-500">Amount %</th>
                </tr>
              </thead>
              <tbody>
                {projectData.finance_approval_data.map((item, index) => (
                  <tr key={item.permission_finance_approval_id || index}>
                    <td className="text-center text-dark-gray fs-16-500">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="text-center text-dark-gray fs-16-500">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="me-2">
                          <div
                            className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                            style={{
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                            }}
                          >
                            {item.emp_name
                              ? item.emp_name.charAt(0).toUpperCase()
                              : "?"}
                          </div>
                        </div>
                        <span>{displayValue(item.emp_name)}</span>
                      </div>
                    </td>
                    <td className="text-center text-dark-gray fs-16-500 fw-bold">
                      {item.amount === 0 ? "" : `${displayValue(item.amount)}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState message="No finance approval data available. Please configure finance approvals in the Project Team section." />
          )}
        </div>
      </div>

      {/* 04. Enhanced Timeline & Milestone Planning */}
      <div className="summary-section">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3>04. Timeline & Milestone Planning</h3>
          <Button
            variant="link"
            className="edit-btn text-primary"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 3 } })
            }
          >
            ✏️ Edit
          </Button>
        </div>

        {!isEmpty(projectData?.milestone_details) ? (
          <Table bordered responsive className="mt-4 w-100">
            <thead className="table-light">
              <tr>
                <th className="text-center text-dark fs-18-500">Milestone</th>
                <th className="text-center text-dark fs-18-500">Description</th>
                <th className="text-center text-dark fs-18-500">Start Date</th>
                <th className="text-center text-dark fs-18-500">End Date</th>
                <th className="text-center text-dark fs-18-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {projectData.milestone_details.map((milestone, index) => (
                <tr key={milestone.milestone_id || index}>
                  <td className="text-center text-dark-gray fs-16-500 fw-bold">
                    {displayValue(milestone.milestone_name)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(milestone.milestone_description)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {formatDate(milestone.milestone_start_date)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {formatDate(milestone.milestone_end_date)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <span
                      className={`badge ${
                        milestone.milestone_status?.toLowerCase() ===
                        "completed"
                          ? "bg-success"
                          : milestone.milestone_status?.toLowerCase() ===
                            "in progress"
                          ? "bg-warning"
                          : milestone.milestone_status?.toLowerCase() ===
                            "planned"
                          ? "bg-info"
                          : "bg-secondary"
                      }`}
                    >
                      {displayValue(milestone.milestone_status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No timeline & milestone data available. Please add milestones in the Timeline & Milestone Planning section." />
        )}
      </div>

      {/* 05. Enhanced Risk & Compliance Assessment */}
      <div className="summary-section">
        <div className="summary-header d-flex justify-content-between align-items-center mb-3">
          <h3>05. Risk & Compliance Assessment</h3>
          <Button
            variant="link"
            className="edit-btn text-primary"
            onClick={() =>
              navigate(`../createproject/${projectId}`, { state: { step: 4 } })
            }
          >
            ✏️ Edit
          </Button>
        </div>

        {!isEmpty(projectData?.risk_management_data) ? (
          <Table bordered responsive className="mt-4 w-100">
            <thead className="table-light">
              <tr>
                <th className="text-center text-dark fs-18-500">S. No</th>
                <th className="text-center text-dark fs-18-500">Category</th>
                <th className="text-center text-dark fs-18-500">Status</th>
                <th className="text-center text-dark fs-18-500">File</th>
              </tr>
            </thead>
            <tbody>
              {projectData.risk_management_data.map((risk, index) => (
                <tr key={risk.risk_id || index}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {displayValue(risk.category_name)}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <span
                      className={`badge ${
                        risk.risk_status?.toLowerCase() === "completed"
                          ? "bg-success"
                          : risk.risk_status?.toLowerCase() === "pending"
                          ? "bg-warning"
                          : "bg-secondary"
                      }`}
                    >
                      {risk.risk_status === "Completed" && (
                        <span className="me-1">✓</span>
                      )}
                      {risk.risk_status === "Pending" && (
                        <span className="me-1">⏳</span>
                      )}
                      {displayValue(risk.risk_status)}
                    </span>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    {!isEmpty(risk.image_url) ? (
                      <a
                        href={risk.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-decoration-none"
                      >
                        📎 View File
                      </a>
                    ) : (
                      <span className="text-muted">Not Uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState message="No risk management data available. Please add risk assessments in the Risk & Compliance Assessment section." />
        )}
      </div>

      {/* Enhanced Form Actions */}
      <div className="form-actions text-center mt-5 w-100 d-flex justify-content-end">
        {(() => {
          const userRoleId = Number.parseInt(
            localStorage.getItem("userRoleId")
          );
          return (
            <Button
              className={`submit-btn px-4 py-2 border-0 bg-primary text-white ${
                userRoleId === 1 ? "d-block" : "d-none"
              }`}
              onClick={async () => {
                try {
                  const rolesResponse = await dispatch(fetchRoles());

                  if (rolesResponse?.payload?.length > 0) {
                    const targetRoles = [
                      "Managing Director",
                      "Director",
                      "Head Finance",
                      "GM Technology",
                    ];

                    const filteredRoles = rolesResponse.payload.filter((role) =>
                      targetRoles.includes(role.roleName)
                    );

                    const allEmployees = [];

                    for (const role of filteredRoles) {
                      const empResponse = await fetchAllEmployees(role.roleId);
                      const employeesByRole =
                        empResponse?.data?.employeesByRole;

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

                    setEmployeesByRole(allEmployees);
                    setShowModal(true);
                  }
                } catch (error) {
                  console.error("Error fetching roles/employees:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load approval options. Please try again.",
                  });
                }
              }}
            >
              🚀 Submit for Approval
            </Button>
          );
        })()}
      </div>

      {/* Enhanced Approval Modal */}
      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Approvers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {employeesByRole.length > 0 ? (
            <div className="row">
              {employeesByRole.map((emp) => (
                <div key={emp.empId} className="col-md-6 mb-3">
                  <div className="d-flex align-items-center p-3 border rounded">
                    <Form.Check
                      type="checkbox"
                      className="me-3"
                      checked={selectedUsers.includes(emp.empId)}
                      onChange={() => handleCheckboxChange(emp.empId)}
                    />
                    <img
                      src={profile || "/placeholder.svg"}
                      alt={`${emp.employeeName || "Employee"}'s profile`}
                      className="rounded-circle me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <p className="mb-0 fs-16-700 text-dark">
                        {displayValue(emp.employeeName)}
                      </p>
                      <span className="fs-14-400 text-muted">
                        {displayValue(emp.roleName)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p>No employees found under selected roles.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="me-2"
          >
            Cancel
          </Button>
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
                const createdBy = Number.parseInt(
                  localStorage.getItem("userRoleId")
                );

                const ticketResponse = await createTicket({
                  projectId: projectData?.project.project_id,
                  ticketType: "submit",
                  assignTo: selectedUsers,
                  createdBy: userData.empId,
                });

                const createdTicketId = ticketResponse?.data?.data?.ticketId;

                await createNotify({
                  empId: selectedUsers,
                  notificationType: "Project_Finalisation_Approval",
                  sourceEntityId: createdTicketId,
                  message: `We would like to update you that we are currently awaiting approval on the Project Finalisation Report submitted for ${projectData?.project?.project_name}. Kindly review and provide your confirmation at the earliest to avoid any delays in the process.`,
                });

                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Project submitted for approval successfully!",
                  timer: 1500,
                  showConfirmButton: false,
                });

                setShowModal(false);

                if (createdTicketId) {
                  setTimeout(() => {
                    navigate(`../ticket/${createdTicketId}`);
                  }, 1600);
                }
              } catch (error) {
                console.error("Failed to create ticket/notification:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Could not submit for approval. Please try again.",
                });
              }
            }}
          >
            Submit ({selectedUsers.length} selected)
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectSummary;
