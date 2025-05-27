import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createDailyReportAttachmentAction,
  createReportAttachmentAction,
  getNewReportCode,
  uploadReportAttachments,
  upsertReport,
} from "../../../store/actions/report/reportcreateaction";
import { toast } from "react-toastify"; // Import toast for notifications
import { fetchProjects } from "../../../store/actions/hr/projectaction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { resetReportState } from "../../../store/slice/report/reportslice";
import { getCEOReportTypes } from "../../../store/actions/report/ceoreportaction";
import { CiFileOn } from "react-icons/ci";
import { useProject } from '../../../hooks/Ceo/useCeoProject';
import { selectProjectDetails } from '../../../store/selector/ceo/ceoProjectSelector';

function ReportCreateScreen() {
  const { loading } = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { projects = [] } = useSelector((state) => state.project);

  const [attachedFile, setAttachedFile] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { newReportCode } = useSelector((state) => state.report);
  const { uploadMessage, error } = useSelector((state) => state.report);;
  const { fetchProjectDetails } = useProject();
 
  const [projectName, setProjectName] = useState('');
  const { reportTypes, reportTypesLoading, reportTypesError } = useSelector(
    (state) => state.ceoReport
  );

  useEffect(() => {
    dispatch(getCEOReportTypes());
  }, [dispatch]);

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
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const firstName = parsedData.firstName || "";
        const project = parsedData.projects?.[0];
        setReportData((prev) => ({
          ...prev,
          reportedBy: firstName,
          reportDate: new Date().toISOString().slice(0, 10),
          project: project?.projectId || "", // ✅ Ensure projectId is set here
        }));
        setProjectName(project?.projectName || ""); // Set project name for display
      } catch (e) {
        console.error("Error parsing userData:", e);
      }
    }
  }, []);

 useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
const getProjectIdFromLocalStorage = () => {
    const storedData = localStorage.getItem("userData"); // Assuming key is 'userDetails'
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
  
        // Ensure projects array exists
        if (parsedData.projects && Array.isArray(parsedData.projects)) {
          return parsedData.projects[0]?.projectId || null; // Get projectId of the first project
        } else {
          console.error("No projects found in local storage");
          return null;
        }
      } catch (error) {
        console.error("Error parsing local storage data:", error);
        return null;
      }
    } else {
      console.error("No data found in local storage for key 'userDetails'");
      return null;
    }
  };
     // Retrieve projectId dynamically from local storage
   const projectId = getProjectIdFromLocalStorage();
 
   useEffect(() => {
     if (!projectId) {
       console.error("Project ID not found in local storage");
       return;
     }
 
     const getDetails = async () => {
       try {
         const details = await fetchProjectDetails(projectId);
         selectProjectDetails(details);
         console.log("Fetched Project Details:", details);
       } catch (error) {
         console.error("Error fetching project details:", error);
       }
     };
 
     getDetails();
   }, [projectId]);
  const [dailyProgressRows, setDailyProgressRows] = useState([
    {
      id: 1,
      workActivity: "",
      status: "",
      action: "",
      photo: null,
    },
  ]);

  const [materialUsageRows, setMaterialUsageRows] = useState([
    {
      id: 1,
      material: "",
      stock: "",
      level: "",
    },
  ]);

  const [safetyComplianceRows, setSafetyComplianceRows] = useState([
    {
      id: 1,
      item: "",
      report: "",
    },
  ]);

  // State for Issue & Risk Report
  const [issueRiskRows, setIssueRiskRows] = useState([
    { 
      id: 1,
      issueRisk: "",
      impact: "",
    },
  ]);

  // State for form data
  const [reportData, setReportData] = useState({
    reportId: "",
    reportTypeId: "",
    project: "",
    dateTime: "",
    reportedBy: "",
  });
  const handleDateChange = (date) => {
    setReportData({
      ...reportData,
      reportDate: date ? date.toISOString().slice(0, 10) : "",
    });
  };


// Extracts initials from the name
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

  // Generates a random color
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5E5",
      "#8E44AD",
      "#16A085",
      "#E67E22",
      "#2ECC71",
      "#3498DB",
      "#F39C12",
      "#1ABC9C",
      "#E74C3C",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle input changes for table rows
  const handleRowChange = (rowType, rowId, field, value) => {
    switch (rowType) {
      case "dailyProgress":
        setDailyProgressRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "materialUsage":
        setMaterialUsageRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "safetyCompliance":
        setSafetyComplianceRows((prevRows) => 
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
        );
        break;
      case "issueRisk":
        setIssueRiskRows((prevRows) => 
          prevRows.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row
          )
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
      workActivity: "",
      status: "",
      action: "",
      photo: null,
    };
    setDailyProgressRows([...dailyProgressRows, newRow]);
  };
  

  // Function to add a new row to Material Usage Report
  const addMaterialUsageRow = () => {
    const newRow = { 
      id: materialUsageRows.length + 1,
      material: "",
      stock: "",
      level: "",
    };
    setMaterialUsageRows([...materialUsageRows, newRow]);
  };
  

  // Function to add a new row to Safety & Compliance Report
  const addSafetyComplianceRow = () => {
    const newRow = { 
      id: safetyComplianceRows.length + 1,
      item: "",
      report: "",
    };
    setSafetyComplianceRows([...safetyComplianceRows, newRow]);
  };
  

  // Function to add a new row to Issue & Risk Report
  const addIssueRiskRow = () => {
    const newRow = { 
      id: issueRiskRows.length + 1,
      issue: "",
      impact: "",
    };
    setIssueRiskRows([...issueRiskRows, newRow]);
  };

  const handlePhotoUpload = (e, rowId) => {
    const file = e.target.files[0];
    if (file) {
      setDailyProgressRows((prevRows) =>
        prevRows.map((row) =>
          row.id === rowId ? { ...row, photo: file } : row
        )
      );
    }
  };
  
const handleAttachedFileUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    console.log("Files selected:", files);
    setAttachedFile(files);
  } else {
    console.warn("Not a valid File object:", files);
  }
};

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!reportData.reportTypeId)
      errors.reportTypeId = "Report Type is required";
    if (!reportData.project) errors.project = "Project is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    const reportDataobj = {
      dailyprogresssummary: dailyProgressRows.map((row) => ({
        serialno: row.id,
        workactivity: row.workActivity || "",
        status: row.status || "",
        action: row.action || "",
      })),
      materialusagereport: materialUsageRows.map((row) => ({
        serialno: row.id,
        material: row.material || "",
        stock: row.stock || "",
        level: row.level || "",
      })),
      safetycompliancereport: safetyComplianceRows.map((row) => ({
        serialno: row.id,
        item: row.item || "",
        report: row.report || "",
      })),
      issueriskreport: issueRiskRows.map((row) => ({
        serialno: row.id,
        issue: row.issue || "",
        impact: row.impact || "",
      })),
    };

    const reportIdNumeric =
    parseInt(reportData.reportId.replace(/\D/g, "")) || 0;

    const updatedReportData = {
      reportId: 0,
      reportCode: reportData.reportId || "RPT-" + new Date().getTime(),
      reportType: parseInt(reportData.reportTypeId),
      projectId: reportData.project,
      reportDate: reportData.reportDate,
      reportedBy: reportData.reportedBy,
      report: `Report for ${reportData.project} - ${reportData.reportTypeId}`,
      reportData: reportDataobj,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const resultAction = await dispatch(upsertReport(updatedReportData));
      if (upsertReport.fulfilled.match(resultAction)) {
        toast.success("Report created successfully!");
        const reportId = resultAction.payload.reportId;

   if (attachedFile.length > 0) {
  const formData = new FormData();
  attachedFile.forEach((file) => formData.append("files", file));
  dispatch(createReportAttachmentAction({ reportId, files: formData }));
}


const sNoArray = [];
const fileList = [];

dailyProgressRows.forEach((row) => {
  if (row.photo) {
    sNoArray.push(row.id);
    fileList.push(row.photo);
  }
});

if (fileList.length > 0) {
  dispatch(
    createDailyReportAttachmentAction({
      reportId,
      sNoArray,
      fileList,
    })
  );
}

        navigate("/admin/engineerreport", { state: resultAction.payload });
      } else {
        let errorMessage = "Report creation failed. Please try again.";
        if (resultAction.payload?.errors) {
          const errorDetails = [];
          Object.entries(resultAction.payload.errors).forEach(
            ([key, messages]) => {
              messages.forEach((msg) => errorDetails.push(`${key}: ${msg}`));
            }
          );
          if (errorDetails.length > 0) {
            errorMessage = `Report creation failed: ${errorDetails.join(", ")}`;
          }
        }
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const getReportTypeNameById = (id) => {
  const found = reportTypes.find(type => type.reportTypeId.toString() === id.toString());
  return found ? found.reportType : "Unknown";
  };

  return (
    <div className="report-container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Report ID</label>
          <input
            className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-light-gray-1 border-1-silver-gray"
            disabled
            type="text"
            value={reportData.reportId}
            readOnly
          ></input>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Report Type
          </label>
          <div className="custom-select">
              <select
                className="form-control detail-value h48px border-radius-4 mb-4 w-100 py-1 px-3 fs-16-500 bg-light text-light-gray-1 border-1-silver-gray"
                name="reportTypeId"
                value={reportData.reportTypeId}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                {reportTypes.map((type) => (
                  <option key={type.reportTypeId} value={type.reportTypeId}>
                    {type.reportType}
                  </option>
                ))}
              </select>
            </div>
            {formErrors.reportTypeId && (
              <div className="text-danger">{formErrors.reportTypeId}</div>
            )}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">Project</label>
        <input
        className="h48px border-radius-4 mb-4 w-100 cursor-not-allowed py-1 px-3 fs-16-500 bg-light text-dark border-1-silver-gray"
        disabled
        type="text"
        value={
        projects.find((proj) => proj.project_id === reportData.project)?.project_name || ''
        }
        placeholder="Project"
        name="project"
        readOnly
        />

        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Date & Time
          </label>
          <DatePicker
              selected={
                reportData.reportDate ? new Date(reportData.reportDate) : null
              }
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy hh:mm a"
              showTimeSelect
              timeFormat="hh:mm a"
              className="h48px border-radius-4 mb-4 w-100 py-1 px-3 fs-16-500 bg-light text-dark border-1-silver-gray"
              placeholderText="Select date and time"
            />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <label className="text-dark fs-20-500 d-block mb-2">
            Reported By
          </label>
          <div className="d-flex align-items-center gap-2 mb-4 position-relative">
            {/* Avatar with initials */}
            <div
              className="rounded-circle text-white d-flex align-items-center justify-content-center"
              style={{
                width: "36px",
                height: "36px",
                fontSize: "16px",
                flexShrink: 0,
                backgroundColor: getRandomColor(), // random color
                position: "absolute",
                left: "10px",
              }}
            >
              {getInitials(reportData.reportedBy)}
            </div>

            {/* Disabled input with name */}
            <input
              className="h48px border-radius-4 w-100 cursor-not-allowed py-1 fs-16-500 bg-light text-dark border-1-silver-gray"
              disabled
              type="text"
              value={reportData.reportedBy}
              readOnly
              style={{ paddingLeft: "60px" }}
              name="reportedBy"
            />
          </div>
        </div>
      </div>

      {/* Daily Progress Summary */}
      <div className="report-section">
        <div className="section-header">
        <h3>Daily Progress Summary</h3>
        </div>
        <div className="report-table">
          <table>
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
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.workActivity}
                      onChange={(e) =>
                        handleRowChange(
                          "dailyProgress",
                          row.id,
                          "workActivity",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.status}
                      onChange={(e) =>
                        handleRowChange(
                          "dailyProgress",
                          row.id,
                          "status",
                          e.target.value
                        )
                      }
                    />
                  </td>


                  <td>
                    <div className="upload-container">
                      <label className="upload-btn">
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, row.id)}
                          style={{ display: "none" }}
                        />
                      </label>
                      {row.photo && (
                        <span className="file-name">{row.photo.name}</span>
                      )}
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addDailyProgressRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Material Usage Report */}
      <div className="report-section">
        <div className="section-header">
          <h3>Material Usage Report</h3>
        </div>
        <div className="report-table">
          <table>
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
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.material}
                      onChange={(e) =>
                        handleRowChange(
                          "materialUsage",
                          row.id,
                          "material",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.stock}
                      onChange={(e) =>
                        handleRowChange(
                          "materialUsage",
                          row.id,
                          "stock",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <div className="custom-select">
                      <select
                        className="form-control"
                        value={row.level}
                        onChange={(e) =>
                          handleRowChange(
                            "materialUsage",
                            row.id,
                            "level",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addMaterialUsageRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Safety & Compliance Report */}
      <div className="safety-compliance-report">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Safety & Compliance Report</h3>
        </div>
        <div className="report-table">
          <table>
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
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.item}
                      onChange={(e) =>
                        handleRowChange(
                          "safetyCompliance",
                          row.id,
                          "item",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.report}
                      onChange={(e) =>
                        handleRowChange(
                          "safetyCompliance",
                          row.id,
                          "report",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addSafetyComplianceRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Issue & Risk Report */}
      <div className="report-section">
        <div className="section-header">
          <h3>Issue & Risk Report</h3>
        </div>
        <div className="report-table">
          <table>
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
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.issue}
                      onChange={(e) =>
                        handleRowChange(
                          "issueRisk",
                          row.id,
                          "issue",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <div className="custom-select">
                      <select
                        className="form-control"
                        value={row.impact}
                        onChange={(e) =>
                          handleRowChange(
                            "issueRisk",
                            row.id,
                            "impact",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-add"
            onClick={addIssueRiskRow}
          >
            + Add Column
          </button>
        </div>
      </div>

      {/* Attached File Section */}
      <div className="attached-file-section">
        <div className="header-row">
          <h3>Attached File</h3>
          <label className="upload-btn-2">
            <CiFileOn className="upload-icons" />
            <span>Choose File</span>
            <input
              type="file"
              multiple
              onChange={handleAttachedFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
          {/* ✅ Show upload result */}
  {uploadMessage && (
    <div className="mt-2 text-success">
      ✅ {uploadMessage}
    </div>
  )}
  {error && typeof error === 'string' && (
    <div className="mt-2 text-danger">
      ⚠️ {error}
    </div>
  )}
      </div>

      {/* Form Buttons */}
      <div className="form-buttons">
        <button
          type="button"
          className="btn btn-cancel"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default ReportCreateScreen;

const styles = `

.report-header {
  margin-bottom: 20px;
}

.report-header h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.report-details-section {
  margin-bottom: 30px;
}

.detail-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
}

.detail-item {
  flex: 1;
  min-width: 200px;
}

.detail-item label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.detail-value {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.react-datepicker-wrapper {
  width: 100%;
}

.report-section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.btn-add {
  background: none;
  border: none;
  color: #FF6F00;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  margin-top: 15px;
  float: right;
}

.btn-add:hover {
  text-decoration: underline;
}

.report-table {
  width: 100%;
  overflow-x: auto;
}

.report-table table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
}

.report-table th {
  background-color: #DEDEDE;
  font-weight: bold;
}

.report-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  border: none;
  background: none;
}

.upload-btn span {
  color: #0456D0;
  text-decoration: underline;
}

.attached-file-section {
  margin-bottom: 16px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-icons {
  color: #0456D0 !important;
  font-size: 20px;
}

.upload-btn-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 20px;
  text-decoration: none;
  border: none;
  background: none;
}

.upload-btn-2 span {
  color: #0456D0;
}

.file-name {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.attached-file-section {
  margin-bottom: 30px;
}

.attached-file-section h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.file-upload-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.btn-cancel {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  width: 120px;
  height: 40px;
  margin-top: 20px;
  margin-right: 1px;
  cursor: pointer;
  font-size: 14px;
}

.btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}
.btn-cancel:hover{
  border: 1px solid #ddd;
}
.btn-submit {
  background-color: #FF6F00;
  color: #fff;
}
.text-danger {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

/* Custom select styles */
.custom-select {
  position: relative;
  width: 100%;
}

.custom-select select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 8px 30px 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.custom-select::after {
  content: "▼";
  font-size: 12px;
  color: #555;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* For Material Usage and Issue Risk tables */
.report-table .custom-select {
  width: auto;
}

.report-table .custom-select select {
  width: 100%;
  min-width: 120px;
}
`;

// Add styles to the document head
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
