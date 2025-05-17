import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewReportCode, uploadReportAttachments, upsertReport } from '../../../store/actions/report/reportcreateaction';
import { toast } from 'react-toastify'; // Import toast for notifications
import { fetchProjects } from '../../../store/actions/hr/projectaction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { resetReportState } from '../../../store/slice/report/reportslice';
import { createReportAttachmentAction } from '../../../store/actions/masterAction';

function ReportCreateScreen() {
  const { loading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { projects = [] } = useSelector((state) => state.project);
const [imageFiles, setImageFiles] = useState([]);       
  const [generalFiles, setGeneralFiles] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
const { newReportCode } = useSelector((state) => state.report);
const { uploadMessage, error } = useSelector((state) => state.report);
const [formData, setFormData] = useState({
  });

useEffect(() => {
  if (uploadMessage) {
    const timer = setTimeout(() => {
      dispatch(resetReportState());
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [uploadMessage]);


  useEffect(() => {
  dispatch(getNewReportCode());
}, []);

  useEffect(() => {
    if (newReportCode) {
      setReportData((prev) => ({
        ...prev,
        reportId: newReportCode,
      }));
    }
  }, [newReportCode]);


 useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  


  // State for Daily Progress Summary
  const [dailyProgressRows, setDailyProgressRows] = useState([{ 
    id: 1, 
    workActivity: '',
    status: '',
    action: '',
    photo: null
  }]);
  

  // State for Material Usage Report
  const [materialUsageRows, setMaterialUsageRows] = useState([{ 
    id: 1,
    material: '',
    stock: '',
    level: ''
  }]);
  

  // State for Safety & Compliance Report
  const [safetyComplianceRows, setSafetyComplianceRows] = useState([{ 
    id: 1,
    item: '',
    report: ''
  }]);

  // State for Issue & Risk Report
  const [issueRiskRows, setIssueRiskRows] = useState([{ 
    id: 1,
    issueRisk: '',
    impact: ''
  }]);

  // State for form data
  const [reportData, setReportData] = useState({
    reportId: '',
    reportType: '',
    project: '',
    dateTime: '',
    reportedBy: '',
  });
  const handleDateChange = (date) => {
    setReportData({
      ...reportData,
      reportDate: date ? date.toISOString().slice(0, 10) : '', // Format date as YYYY-MM-DD
    });
  };

  // Handle input changes for main form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Handle input changes for table rows
  const handleRowChange = (rowType, rowId, field, value) => {
    switch (rowType) {
      case 'dailyProgress':
        setDailyProgressRows(prevRows => 
          prevRows.map(row => row.id === rowId ? { ...row, [field]: value } : row)
        );
        break;
      case 'materialUsage':
        setMaterialUsageRows(prevRows => 
          prevRows.map(row => row.id === rowId ? { ...row, [field]: value } : row)
        );
        break;
      case 'safetyCompliance':
        setSafetyComplianceRows(prevRows => 
          prevRows.map(row => row.id === rowId ? { ...row, [field]: value } : row)
        );
        break;
      case 'issueRisk':
        setIssueRiskRows(prevRows => 
          prevRows.map(row => row.id === rowId ? { ...row, [field]: value } : row)
        );
        break;
      default:
        break;
    }
  };

  // Function to add a new row to Daily Progress Summary
  const addDailyProgressRow = () => {
    const newRow = { 
      id: dailyProgressRows.length + 1,
      workActivity: '',
      status: '',
      action: '',
      photo: null
    };
    setDailyProgressRows([...dailyProgressRows, newRow]);
  };
  

  // Function to add a new row to Material Usage Report
  const addMaterialUsageRow = () => {
    const newRow = { 
      id: materialUsageRows.length + 1,
      material: '',
      stock: '',
      level: ''
    };
    setMaterialUsageRows([...materialUsageRows, newRow]);
  };
  

  // Function to add a new row to Safety & Compliance Report
  const addSafetyComplianceRow = () => {
    const newRow = { 
      id: safetyComplianceRows.length + 1,
      item: '',
      report: ''
    };
    setSafetyComplianceRows([...safetyComplianceRows, newRow]);
  };
  

  // Function to add a new row to Issue & Risk Report
  const addIssueRiskRow = () => {
    const newRow = { 
      id: issueRiskRows.length + 1,
      issue: '',
      impact: ''
    };
    setIssueRiskRows([...issueRiskRows, newRow]);
  };
  


  
const handleAttachedFileUpload = (e) => {
  const file = e.target.files[0];
  if (file instanceof File) {
    console.log("File selected:", file);
    setAttachedFile(file);
  } else {
    console.warn("Not a valid File object:", file);
  }
};

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!reportData.reportType) {
      errors.reportType = 'Report Type is required';
    }
    
    if (!reportData.project) {
      errors.project = 'Project is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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
  setGeneralFiles((prev) => [...prev, ...files]);
};
  

  return (
    <div className="report-container">
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Report ID</label>
          <input
            type="text"
            className="form-control"
            value={reportData.reportId}
            onChange={(e) =>
              setReportData({ ...reportData, reportId: e.target.value })
            }
          />
        </div>
      
    

        <div className="col-md-4">
          <label>Report Type</label><span className='text-danger'>*</span>
          <select
            className="form-control"
            name="reportType"
            value={reportData.reportType}
            onChange={handleInputChange}
          
          >
            <option value="">Select</option>
            <option value="Type 1">Daily</option>
            <option value="Type 2"> Weekly</option>
            <option value="Type 3">Monthly</option>
          </select>
          {formErrors.reportType && <div className="text-danger">{formErrors.reportType}</div>}
        </div>
        <div className="col-md-4">
          <label>Project</label><span className='text-danger'>*</span>
          <select
  className="form-control"
  name="project"
  value={reportData.project}
  onChange={handleInputChange}
>
  <option value="">Select</option>
  {projects.map((proj) => (
    <option key={proj.project_id} value={proj.project_id}>
      {proj.project_name}
    </option>
  ))}
</select>

          {formErrors.project && <div className="text-danger">{formErrors.project}</div>}
        </div>
      </div>

      {/* Second Row: Date & Time, Reported By */}
      <div className="row mb-3">
      <DatePicker
            selected={reportData.reportDate ? new Date(reportData.reportDate) : null} // Display the selected date
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd" // Set date format to YYYY-MM-DD
            className="form-control"
            placeholderText="Select a date"
          />
        <div className="col-md-6">
          <label>Reported By</label><span className='text-danger'>*</span>
          <input 
  type="text" 
  name="reportedBy"    // ✅ Must match key in useState
  className="form-control" 
  value={reportData.reportedBy} 
  onChange={handleInputChange}
/>

        </div>
      </div>

      {/* Daily Progress Summary */}
{/* Daily Progress Summary */}
<div className="daily-progress-summary">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h3>Daily Progress Summary</h3>
    <button type="button" className="btn btn-add-column" onClick={addDailyProgressRow}>
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
        <th>Photo</th>
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
    <button type="button" className="btn btn-add-column" onClick={addMaterialUsageRow}>
      + Add Column
    </button>
  </div>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Material</th>
        <th>Stock</th>
        <th>Level</th>
      </tr>
    </thead>
    <tbody>
      {materialUsageRows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>
            <input 
              type="text" 
              className="form-control" 
              value={row.material}
              onChange={(e) => handleRowChange('materialUsage', row.id, 'material', e.target.value)}
            />
          </td>
          <td>
            <input 
              type="text" 
              className="form-control" 
              value={row.stock}
              onChange={(e) => handleRowChange('materialUsage', row.id, 'stock', e.target.value)}
            />
          </td>
          <td>
            <select 
              className="form-control"
              value={row.level}
              onChange={(e) => handleRowChange('materialUsage', row.id, 'level', e.target.value)}
            >
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


      {/* Safety & Compliance Report */}
      <div className="safety-compliance-report">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h3>Safety & Compliance Report</h3>
    <button type="button" className="btn btn-add-column" onClick={addSafetyComplianceRow}>
      + Add Column
    </button>
  </div>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Item</th>
        <th>Report</th>
      </tr>
    </thead>
    <tbody>
      {safetyComplianceRows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>
            <input 
              type="text" 
              className="form-control" 
              value={row.item}
              onChange={(e) => handleRowChange('safetyCompliance', row.id, 'item', e.target.value)}
            />
          </td>
          <td>
            <input 
              type="text" 
              className="form-control" 
              value={row.report}
              onChange={(e) => handleRowChange('safetyCompliance', row.id, 'report', e.target.value)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Issue & Risk Report */}
      <div className="issue-risk-report">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h3>Issue & Risk Report</h3>
    <button type="button" className="btn btn-add-column" onClick={addIssueRiskRow}>
      + Add Column
    </button>
  </div>
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>S.No</th>
        <th>Issue</th>
        <th>Impact</th>
      </tr>
    </thead>
    <tbody>
      {issueRiskRows.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>
            <input 
              type="text" 
              className="form-control" 
              value={row.issue}
              onChange={(e) => handleRowChange('issueRisk', row.id, 'issue', e.target.value)}
            />
          </td>
          <td>
            <select 
              className="form-control"
              value={row.impact}
              onChange={(e) => handleRowChange('issueRisk', row.id, 'impact', e.target.value)}
            >
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
        <button type="button" className="btn btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Report'}
        </button>
      </div>
    </div>
  );
}

export default ReportCreateScreen;