import React, { useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { GoAlertFill } from "react-icons/go";

const RiskComplianceAssessment = ({ formData, handleAddColumn, setFormData }) => {
  // State to track which risk item is currently uploading a file
  const [uploadingForId, setUploadingForId] = useState(null);

  // Handle file selection for a specific risk item
  const handleFileChange = (riskId, e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Update the formData directly
      const updatedRisks = formData.risks.map(risk => {
        if (risk.id === riskId) {
          return { ...risk, file: file };
        }
        return risk;
      });
      
      setFormData(prev => ({
        ...prev,
        risks: updatedRisks
      }));
      
      setUploadingForId(null); // Reset the uploading state
    }
  };

  // Handle status change
  const handleStatusChange = (riskId, newStatus) => {
    // Update the formData directly
    const updatedRisks = formData.risks.map(risk => {
      if (risk.id === riskId) {
        return { ...risk, status: newStatus };
      }
      return risk;
    });
    
    setFormData(prev => ({
      ...prev,
      risks: updatedRisks
    }));
  };

  return (
    <div className="form-section">
      <h2 className="section-title">Risk & Compliance Assessment</h2>
      <table className="tbl mt-4 w-100 table table-bordered">
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
                <Dropdown>
                  <Dropdown.Toggle 
                    className={`status-badge ${risk.status.toLowerCase()}`}
                    variant="light"
                    id={`dropdown-status-${risk.id}`}
                  >
                    {risk.status === "Completed" && <span className="status-icon me-2">✅</span>}
                    {risk.status === "Pending" && <span className="status-icon me-2"><GoAlertFill /></span>}
                    {risk.status}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(risk.id, "Completed")}>
                      <span className="status-icon me-2">✅</span> Completed
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(risk.id, "Pending")}>
                      <span className="status-icon me-2"><GoAlertFill /></span> Pending
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                {uploadingForId === risk.id ? (
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileChange(risk.id, e)}
                    size="sm"
                    autoFocus
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <Button 
                      variant="link" 
                      className="upload-btn"
                      onClick={() => setUploadingForId(risk.id)}
                    >
                      {risk.file ? risk.file.name : "Upload"}
                    </Button>
                    {risk.file && (
                      <span className="ms-2 file-name d-none text-truncate">{risk.file.name}</span>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-column">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddColumn}
        >
          + Add Row
        </Button>
      </div>
    </div>
  );
};

export default RiskComplianceAssessment;