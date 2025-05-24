import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportAttachmentsById, getReportById } from '../../../store/actions/report/reportcreateaction';
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;
const ReportViewScreen = () => {
  const { reportId } = useParams(); // get the reportId from the URL
  const dispatch = useDispatch();
  
  const { reportDetails, attachments, loading, error } = useSelector((state) => state.report);

  useEffect(() => {
    if (reportId) {
      dispatch(getReportById(reportId));
      dispatch(getReportAttachmentsById(reportId));
    }
  }, [reportId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  if (!reportDetails) return null;

  // Destructure data from API response

 const {
    reportCode,
    reportTypeName,
    reportDate,
    reportedBy,
    reportData = {},
  } = reportDetails;
  
  const {
    dailyProgressSummary = [],
    materialUsageReport = [],
    safetyComplianceReport = [],
    issueRiskReport = [],
  } = reportData;

  return (
    <div className="report-container">
      {/* render reportcode, reporttype, reportedby etc. */}
      {/* render reportcode, reporttype, reportedby etc. */}
      <div className="header-section">
        <div className="input-group">
          <label>Report ID</label>
          <input type="text" value={reportCode} readOnly />
        </div>
        <div className="input-group">
          <label>Report Type</label>
          <input type="text" value={reportTypeName} readOnly />
        </div>
        <div className="input-group">
          <label>Date</label>
          <input type="text" value={new Date(reportDate).toLocaleDateString()} readOnly />
        </div>
        <div className="input-group">
          <label>Reported By</label>
          <input type="text" value={reportedBy} readOnly />
        </div>
      </div>

      <h3>Daily Progress Summary</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Work Activities</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dailyProgressSummary.map((item) => (
            <tr key={item.serialNo}>
              <td>{item.serialNo}</td>
              <td>{item.workActivity}</td>
              <td>{item.status}</td>
              <td>{item.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Material Usage Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Materials</th>
            <th>Stock</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {materialUsageReport.map((item) => (
            <tr key={item.serialNo}>
              <td>{item.serialNo}</td>
              <td>{item.material}</td>
              <td>{item.stock}</td>
              <td>{item.level}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Safety & Compliance Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Item</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {safetyComplianceReport.map((item) => (
            <tr key={item.serialNo}>
              <td>{item.serialNo}</td>
              <td>{item.item}</td>
              <td>{item.report}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Issue & Risk Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Issue</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          {issueRiskReport.map((item) => (
            <tr key={item.serialNo}>
              <td>{item.serialNo}</td>
              <td>{item.issue}</td>
              <td>{item.impact}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Attached File</h3>
      <div className="attached-files">
        {loading && <p>Loading attachments...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && attachments?.length > 0 ? (
  <ul>
    {attachments.map((file) => (
      <li key={file.attachmentId}>
        <a
          href={`${BASE_URL}/${file.filePath.replace(/\\/g, '/')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {file.fileName}
        </a>
      </li>
    ))}
  </ul>
) : (
  !loading && <p>No attachments found.</p>
)}

      </div>
    </div>
  );
};

export default ReportViewScreen;
