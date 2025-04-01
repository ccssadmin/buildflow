
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";



function Report() {
  const [selectedSite, setSelectedSite] = useState('MRM Site');

  const sites = ['MRM Site', 'ABC Site', 'XYZ Site'];

  const navigate = useNavigate();


  const reports = Array.from({ length: 13 }, (_, index) => ({
    id: index + 1,
    reportId: "Daily Report - DPR2025",
    projectName: "MAA - A Block",
    date: "14-03-2025",
    time: "06:00 pm",
    reportedBy: "Darrell",
    avatar: "https://via.placeholder.com/24",
  }));

  return (
    <div className="reports-container">
      {/* Header Section */}
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
        <button className="create-btn"
          style={{}}
          onClick={() => navigate('/admin/engineerreportcreate')}
        >
          Create
        </button>
      </div>

      {/* Reports Table */}
      <div className="table-responsive">
        <table className="reports-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Report ID</th>
              <th>Project Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reported By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id.toString().padStart(2, "0")}</td>
                <td>{report.reportId}</td>
                <td>{report.projectName}</td>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td className="reported-by">
                  <img src={report.avatar} alt="Avatar" />
                  {report.reportedBy}
                </td>
                <td
                  onClick={() => navigate('/admin/engineerreportview')}
                >
                  <a href=" " className="view-link">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
