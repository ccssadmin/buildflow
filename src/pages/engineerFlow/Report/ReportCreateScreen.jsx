import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createReportAttachmentAction } from '../../../store/actions/masterAction';
import { useDispatch } from 'react-redux';



function ReportCreateScreen  ()  {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  // State for Daily Progress Summary
  const [dailyProgressRows, setDailyProgressRows] = useState([{ id: 1 }]);

  // State for Material Usage Report
  const [materialUsageRows, setMaterialUsageRows] = useState([{ id: 1 }]);

  // State for Safety & Compliance Report
  const [safetyComplianceRows, setSafetyComplianceRows] = useState([{ id: 1 }]);

  // State for Issue & Risk Report
  const [issueRiskRows, setIssueRiskRows] = useState([{ id: 1 }]);


  const [imageFiles, setImageFiles] = useState([]);       
  const [generalFiles, setGeneralFiles] = useState([]);   


  // State for form data
  const [formData, setFormData] = useState({
    reportId: 1,
    reportType: '',
    project: '',
    dateTime: '15–03–2025 • 06:04 pm',
    reportedBy: 'Marvin McKinney',
    dailyProgress: [],
    materialUsage: [],
    safetyCompliance: [],
    issueRisk: [],
    attachedFiles: [],
  });

  // Function to add a new row to Daily Progress Summary
  const addDailyProgressRow = () => {
    const newRow = { id: dailyProgressRows.length + 1 };
    setDailyProgressRows([...dailyProgressRows, newRow]);
  };

  // Function to add a new row to Material Usage Report
  const addMaterialUsageRow = () => {
    const newRow = { id: materialUsageRows.length + 1 };
    setMaterialUsageRows([...materialUsageRows, newRow]);
  };

  // Function to add a new row to Safety & Compliance Report
  const addSafetyComplianceRow = () => {
    const newRow = { id: safetyComplianceRows.length + 1 };
    setSafetyComplianceRows([...safetyComplianceRows, newRow]);
  };

  // Function to add a new row to Issue & Risk Report
  const addIssueRiskRow = () => {
    const newRow = { id: issueRiskRows.length + 1 };
    setIssueRiskRows([...issueRiskRows, newRow]);
  };

  // Function to handle form submission
const handleSubmit = () => {
  const updatedFormData = {
    ...formData,
    dailyProgress: dailyProgressRows,
    materialUsage: materialUsageRows,
    safetyCompliance: safetyComplianceRows,
    issueRisk: issueRiskRows,
  };

  // Prepare FormData
  const finalFormData = new FormData();
  imageFiles.forEach((item) => finalFormData.append("files", item.file));
  generalFiles.forEach((file) => finalFormData.append("files", file));

  // Use formData.reportId directly
  dispatch(createReportAttachmentAction({
    reportId: formData.reportId,
    files: finalFormData,
  }))
    .unwrap()
    .then(() => {
      console.log("Upload success");
      navigate('/report-view', { state: updatedFormData });
    })
    .catch((err) => {
      console.error("Upload failed:", err);
      alert("Failed to submit the report. Please try again.");
    });
};




const handlePhotoUpload = (e, rowId) => {
  const file = e.target.files[0];
  if (file) {
    setImageFiles((prev) => [...prev, { reportId: rowId, file }]);
  }
};

const handleGeneralFileChange = (e) => {
  const files = Array.from(e.target.files);
  setGeneralFiles((prev) => [...prev, ...files]);
};






  return (
    <div className="report-container">
      {/* <div className="report-header">
        <h2>Daily Report</h2>
      </div> */}

      {/* First Row: Report ID, Report Type (dropdown), Project (dropdown) */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Report ID</label>
          <input type="text" className="form-control" value={formData.reportId} readOnly />
        </div>
        <div className="col-md-4">
          <label>Report Type</label><span className='text-danger'>*</span>
          <select
            className="form-control"
            value={formData.reportType}
            onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Project</label><span className='text-danger'>*</span>
          <select
            className="form-control"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          >
            <option value="">Select</option>
            <option value="BOQ TITLE">BOQ TITLE</option>
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>
        </div>
      </div>

      {/* Second Row: Date & Time, Reported By */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Date & Time</label>
          <input type="text" className="form-control" value={formData.dateTime} readOnly />
        </div>
        <div className="col-md-6">
          <label>Reported By</label><span className='text-danger'>*</span>
          <input type="text" className="form-control" value={formData.reportedBy} readOnly />
        </div>
      </div>

      {/* Daily Progress Summary */}
      <div className="daily-progress-summary">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Daily Progress Summary</h3>
          <button className="btn btn-add-column" onClick={addDailyProgressRow}>
            + Add Column
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Work Activities</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dailyProgressRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td></td>
                <td></td>
               <td>
  <label className="upload-photo-btn" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
    Upload Photo
    <input
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={(e) => handlePhotoUpload(e, row.id)}
    />
  </label>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Material Usage Report */}
      <div className="material-usage-report">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Material Usage Report</h3>
          <button className="btn btn-add-column" onClick={addMaterialUsageRow}>
            + Add Column
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Materials</th>
              <th>Stock</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {materialUsageRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td></td>
                <td></td>
                <td>
                  <select className="form-control">
                    <option value="">select</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Safety & Compliance Report */}
      <div className="safety-compliance-report">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Safety & Compliance Report</h3>
          <button className="btn btn-add-column" onClick={addSafetyComplianceRow}>
            + Add Column
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Safety & Compliance</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {safetyComplianceRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue & Risk Report */}
      <div className="issue-risk-report">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Issue & Risk Report</h3>
          <button className="btn btn-add-column" onClick={addIssueRiskRow}>
            + Add Column
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Issue & Risk</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            {issueRiskRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td></td>
                <td>
                  <select className="form-control">
                    <option value="">Select</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attached File Section */}
     <div className="attached-file">
  <h3>Attached File</h3>

  <label className="upload-photo-btn" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
    Upload File
    <input
      type="file"
      multiple
      style={{ display: "none" }}
      onChange={handleGeneralFileChange}
    />
  </label>
</div>



      {/* Cancel and Submit Buttons */}
      <div className="form-buttons mt-4">
        <button className="btn btn-cancel">Cancel</button>
        <button className="btn btn-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportCreateScreen;