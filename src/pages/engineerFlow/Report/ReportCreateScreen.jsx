import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewReportCode, uploadReportAttachments, upsertReport } from '../../../store/actions/report/reportcreateaction';
import { toast } from 'react-toastify';
import { fetchProjects } from '../../../store/actions/hr/projectaction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { resetReportState } from '../../../store/slice/report/reportslice';
import { createReportAttachmentAction } from '../../../store/actions/masterAction';
import { FaUpload, FaUserCircle } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

function ReportCreateScreen() {
  const { loading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects = [] } = useSelector((state) => state.project);
  const [imageFiles, setImageFiles] = useState([]);       
  const [generalFiles, setGeneralFiles] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const { newReportCode } = useSelector((state) => state.report);
  const { uploadMessage, error } = useSelector((state) => state.report);
  const [formData, setFormData] = useState({});

  // Style for table inputs
  const tableInputStyle = {
    border: 'none',
    background: 'transparent',
    width: '100%',
    padding: '0.375rem 0',
    outline: 'none'
  };

  const tableSelectStyle = {
    ...tableInputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  };

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
      reportDate: date ? date.toISOString().slice(0, 10) : '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
    
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

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
  
  const addMaterialUsageRow = () => {
    const newRow = { 
      id: materialUsageRows.length + 1,
      material: '',
      stock: '',
      level: ''
    };
    setMaterialUsageRows([...materialUsageRows, newRow]);
  };
  
  const addSafetyComplianceRow = () => {
    const newRow = { 
      id: safetyComplianceRows.length + 1,
      item: '',
      report: ''
    };
    setSafetyComplianceRows([...safetyComplianceRows, newRow]);
  };
  
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

  const handleSubmit = () => {
    const updatedFormData = {
      ...formData,
      dailyProgress: dailyProgressRows,
      materialUsage: materialUsageRows,
      safetyCompliance: safetyComplianceRows,
      issueRisk: issueRiskRows,
    };

    const finalFormData = new FormData();
    imageFiles.forEach((item) => finalFormData.append("files", item.file));
    generalFiles.forEach((file) => finalFormData.append("files", file));

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
  
  const thBg = { backgroundColor:'#DEDEDE' }; 

  return (
    <div className="report-container">
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="font-weight-bold">Report ID</label>
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
          <label className="font-weight-bold">Report Type<span className='text-danger'>*</span></label>
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
          <label className="font-weight-bold">Project<span className='text-danger'>*</span></label>
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
        <div className="col-md-6">
          <label className="font-weight-bold">Date & Time</label>
          <div className="d-flex">
            <DatePicker
              selected={reportData.reportDate ? new Date(reportData.reportDate) : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control mr-2"
              style={{ width: '150px' }}
              placeholderText="Select date"
            />
            <input 
              type="time" 
              className="form-control" 
              style={{ width: '120px' }}
              value={reportData.reportTime || ''}
              onChange={(e) => setReportData({...reportData, reportTime: e.target.value})}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <label className="font-weight-bold">Reported By<span className='text-danger'>*</span></label>
          <div className="d-flex align-items-center">
            <FaUserCircle className="mr-2" size={24} />
            <input 
              type="text" 
              name="reportedBy"
              className="form-control" 
              value={reportData.reportedBy} 
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Daily Progress Summary */}
      <div className="daily-progress-summary mb-4">
        <h3 className="font-weight-bold">Daily Progress Summary</h3>
        <table className="table">
          <thead >
            <tr>
              <th className="font-weight-bold" style={thBg}>S.No</th>
              <th className="font-weight-bold" style={thBg} >Work Activities</th>
              <th className="font-weight-bold" style={thBg}>Work Activities</th>
              <th className="font-weight-bold" style={thBg}>Status</th>
              <th className="font-weight-bold" style={thBg}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dailyProgressRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.workActivity}
                    onChange={(e) => handleRowChange('dailyProgress', row.id, 'workActivity', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.status}
                    onChange={(e) => handleRowChange('dailyProgress', row.id, 'status', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.action}
                    onChange={(e) => handleRowChange('dailyProgress', row.id, 'action', e.target.value)}
                  />
                </td>
                <td>
                  <label className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    <FaUpload className="mr-1" />
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
        <button type="button" className="btn mt-2 mb-4 float-end" style={{color:"#FF6F00"}} onClick={addDailyProgressRow}>
          + Add Row
        </button>
      </div>

      {/* Material Usage Report */}
      <div className="material-usage-report mb-4">
        <h3 className="font-weight-bold">Material Usage Report</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="font-weight-bold" style={thBg}>S.No</th>
              <th className="font-weight-bold" style={thBg}>Material</th>
              <th className="font-weight-bold" style={thBg}>Stock</th>
              <th className="font-weight-bold" style={thBg}>Level</th>
            </tr>
          </thead>
          <tbody>
            {materialUsageRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.material}
                    onChange={(e) => handleRowChange('materialUsage', row.id, 'material', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.stock}
                    onChange={(e) => handleRowChange('materialUsage', row.id, 'stock', e.target.value)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <select 
                      style={tableSelectStyle}
                      value={row.level}
                      onChange={(e) => handleRowChange('materialUsage', row.id, 'level', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <IoIosArrowDown className="ml-2" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn mt-2 mb-4 float-end" style={{color:"#FF6F00"}} onClick={addMaterialUsageRow}>
          + Add Row
        </button>
      </div>

      {/* Safety & Compliance Report */}
      <div className="safety-compliance-report mb-4">
        <h3 className="font-weight-bold">Safety & Compliance Report</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="font-weight-bold" style={thBg}>S.No</th>
              <th className="font-weight-bold" style={thBg}>Item</th>
              <th className="font-weight-bold" style={thBg}>Report</th>
            </tr>
          </thead>
          <tbody>
            {safetyComplianceRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.item}
                    onChange={(e) => handleRowChange('safetyCompliance', row.id, 'item', e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.report}
                    onChange={(e) => handleRowChange('safetyCompliance', row.id, 'report', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn mt-2 mb-4 float-end" style={{color:"#FF6F00"}} onClick={addSafetyComplianceRow}>
          + Add Row
        </button>
      </div>

      {/* Issue & Risk Report */}
      <div className="issue-risk-report mb-4">
        <h3 className="font-weight-bold">Issue & Risk Report</h3>
        <table className="table">
          <thead >
            <tr >
              <th className="font-weight-bold" style={thBg}>S.No</th>
              <th className="font-weight-bold" style={thBg}>Issue</th>
              <th className="font-weight-bold" style={thBg}>Impact</th>
            </tr>
          </thead>
          <tbody>
            {issueRiskRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input 
                    type="text" 
                    style={tableInputStyle}
                    value={row.issueRisk}
                    onChange={(e) => handleRowChange('issueRisk', row.id, 'issueRisk', e.target.value)}
                  />
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <select 
                      style={tableSelectStyle}
                      value={row.impact}
                      onChange={(e) => handleRowChange('issueRisk', row.id, 'impact', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <IoIosArrowDown className="ml-2" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn mt-2 mb-4 float-end" style={{color:"#FF6F00"}} onClick={addIssueRiskRow}>
          + Add Row
        </button>
      </div>

      {/* Attached File Section */}
      <div className="attached-file mb-4">
        <h3 className="font-weight-bold">Attached File</h3>
        <label className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          <FaUpload className="mr-1" />
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
      <div className="form-buttons mt-4 d-flex justify-content-end">
        <button type="button" className="btn btn-light mr-3" onClick={() => navigate(-1)}>Cancel</button>
        <button
          type="button"
          className="btn"
          style={{backgroundColor:"#FF6F00",color:"white"}}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default ReportCreateScreen;