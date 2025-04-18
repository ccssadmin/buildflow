import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const ProjectTeamStakeholder = ({
  formData,
  searchFilters,
  dropdownVisible,
  teamMembers,
  handleSearchFilterChange,
  toggleDropdown,
  handleSelectItem,
  handleRemoveItem,
  getFilteredItems
}) => {
  // MultiSelect component
  const MultiSelect = ({ field, label, required = false }) => {
    return (
      <Form.Group>
        <Form.Label className="text-dark">
          {label} {required && <span className="required">*</span>}
        </Form.Label>
        <div className="multi-select-container">
          <div className="selected-items">
            {formData[field].map((item) => (
              <div key={item.id} className="selected-item">
                <span>{item.name}</span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveItem(field, item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="search-container">
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchFilters[field] || ""}
              onChange={(e) => handleSearchFilterChange(e, field)}
              onClick={() => toggleDropdown(field)}
            />
            {dropdownVisible[field] && (
              <div className="dropdown-menu show">
                {getFilteredItems(field).length > 0 ? (
                  getFilteredItems(field).map((item) => (
                    <div
                      key={item.id}
                      className={`dropdown-item ${formData[field].some(
                        (selected) => selected.id === item.id
                      )
                          ? "selected"
                          : ""
                        }`}
                      onClick={() => {
                        handleSelectItem(field, item);
                        toggleDropdown(field, false);
                      }}
                    >
                      {item.name}
                      {formData[field].some(
                        (selected) => selected.id === item.id
                      ) && <span className="check-mark">✓</span>}
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item no-results">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Form.Group>
    );
  };

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
    </div>
  );
};

export default ProjectTeamStakeholder;