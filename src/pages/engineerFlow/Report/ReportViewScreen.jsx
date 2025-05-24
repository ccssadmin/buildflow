import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportAttachmentsById, getReportById } from '../../../store/actions/report/reportcreateaction';

const ReportViewScreen = () => {
  const { reportId } = useParams();
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

  const {
    reportCode,
    reportType,
    reportDate,
    reportedBy,
    reportData = {},
  } = reportDetails;

  const parsedReportData = typeof reportData === 'string' ? JSON.parse(reportData) : reportData;

  const {
    dailyProgressSummary = [],
    materialUsageReport = [],
    safetyComplianceReport = [],
    issueRiskReport = [],
  } = parsedReportData;

  return (
    <div className="report-container">
      <div className="header-section">
        <div className="input-group">
          <label>Report ID</label>
          <input type="text" value={reportCode} readOnly />
        </div>
        <div className="input-group">
          <label>Report Type</label>
          <input type="text" value={reportType} readOnly />
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
              <td>{item.workActivity || 'N/A'}</td>
              <td>{item.status || 'N/A'}</td>
              <td>{item.action || 'N/A'}</td>
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
              <td>{item.material || 'N/A'}</td>
              <td>{item.stock || 'N/A'}</td>
              <td>{item.level || 'N/A'}</td>
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
              <td>{item.item || 'N/A'}</td>
              <td>{item.report || 'N/A'}</td>
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
              <td>{item.issue || 'N/A'}</td>
              <td>{item.impact || 'N/A'}</td>
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
                  href={`https://buildflowgraphql.crestclimbers.com/${file.filePath.replace(/\\/g, '/')}`}
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
