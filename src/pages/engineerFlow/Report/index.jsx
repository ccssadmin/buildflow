import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getReports } from "../../../store/actions/report/reportcreateaction";

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: reportData, loading, error } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const sites = ['MRM Site', 'ABC Site', 'XYZ Site'];
  const [selectedSite, setSelectedSite] = React.useState('MRM Site');

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <select
          className="form-select select-custom"
          style={{ backgroundColor: '#E8E8E8' }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((site, index) => (
            <option key={index} value={site}>{site}</option>
          ))}
        </select>
        <button className="create-btn" onClick={() => navigate('/admin/engineerreportcreate')}>
          Create
        </button>
      </div>

      {/* Loading/Error State */}
      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Reports Table */}
      {!loading && Array.isArray(reportData) && reportData.length > 0 && (
        <div className="table-responsive">
          <table className="reports-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Report ID</th>
                <th>Project Name</th>
                <th>Date</th>
                <th>Reported By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report, index) => (
                <tr key={report.reportid || index}>
                  <td>{(index + 1).toString().padStart(2, '0')}</td>
                  <td>{report.reportcode}</td>
                  <td>{`Project ID - ${report.projectid}`}</td>
                  <td>{report.reportdate ? new Date(report.reportdate).toLocaleDateString() : 'N/A'}</td>
                  <td className="reported-by">
                    <img src="https://via.placeholder.com/24" alt="Avatar" />
                    {report.reportedby}
                  </td>
                  <td onClick={() => navigate(`/admin/engineerreportview/${report.reportid}`)}>
                    <a href="#" className="view-link">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && Array.isArray(reportData) && reportData.length === 0 && (
        <p>No reports found.</p>
      )}
    </div>
  );
}

export default Report;
