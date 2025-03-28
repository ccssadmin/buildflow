import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";

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
const ProjectSummary = ({ formData, onBackClick }) => {
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
              <Form.Control disabled type="text" placeholder={formData.projectName || "Not provided"} />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Location</label>
              <Form.Control disabled type="text" placeholder={formData.location || "Not provided"} />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Type</label>
              <Form.Control disabled type="text" placeholder={formData.projectType || "Not provided"} />
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Sector</label>
              <Form.Control disabled type="text" placeholder={formData.projectSector || "Not provided"} />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Project Start Date</label>
              <Form.Control disabled type="text" placeholder={formData.projectStartDate || "Not provided"} />
            </div>
          </Col>
          <Col md={6} lg={4}>
            <div className="summary-field">
              <label>Expected Completion Date</label>
              <Form.Control disabled type="text" placeholder={formData.expectedCompletionDate || "Not provided"} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="summary-field">
              <label>Description</label>
              <Form.Control disabled type="text" placeholder={formData.description || "Not provided"} />
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
              <p>₹ {formData.totalBudget || "Not provided"}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="summary-field">
              <label>Send To</label>
              <p>{formData.sendTo || "Not provided"}</p>
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
              <div className="summary-multi-select">
                {formData.projectManager.length > 0 ? (
                  formData.projectManager.map((item) => (
                    <div key={item.id} className="summary-tag">
                      {item.name}
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
                    <div key={item.id} className="summary-tag">
                      {item.name}
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
                    <div key={item.id} className="summary-tag">
                      {item.name}
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
                <td className="text-center text-dark-gray fs-16-500">
                  {String(risk.id).padStart(2, "0")}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
                  {risk.category}
                </td>
                <td className="text-center text-dark-gray fs-16-500">
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
        <Button className="save-draft-btn">Save as Draft</Button>
        <Button to="ceo/approvals" variant="primary" className="submit-btn">
          Submit for Approval
        </Button>
      </div>
    </div>
  );
};

export default ProjectSummary;
