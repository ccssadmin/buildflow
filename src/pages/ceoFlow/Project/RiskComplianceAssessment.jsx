import React from "react";
import { Button } from "react-bootstrap";
import { GoAlertFill } from "react-icons/go";

const RiskComplianceAssessment = ({ formData, handleAddColumn }) => {
  return (
    <div className="form-section">
      <h2 className="section-title">Risk & Compliance Assessment</h2>
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
                    <span className="status-icon">✅</span>
                  )}
                  {risk.status === "Pending" && (
                    <span className="status-icon"><GoAlertFill /></span>
                  )}

                </div>
                {risk.status}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <Button type="upload" variant="link" className="upload-btn">
                  Upload
                </Button>
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
          + Add Column
        </Button>
      </div>
    </div>
  );
};

export default RiskComplianceAssessment;