import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getReports } from "../../../store/actions/report/reportcreateaction";

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: reportData,
    loading,
    error,
  } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const sites = ["MRM Site", "ABC Site", "XYZ Site"];
  const [selectedSite, setSelectedSite] = React.useState("MRM Site");
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.charAt(0).toUpperCase() || "";
    const second = parts[1]?.charAt(0).toUpperCase() || "";
    return first + second;
  };

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

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <select
          className="form-select select-custom"
          style={{ backgroundColor: "#E8E8E8" }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          {sites.map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
        </select>
        <button
          className="create-btn"
          onClick={() => navigate("/admin/engineerreportcreate")}
        >
          Create
        </button>
      </div>

      {/* Loading/Error State */}
      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Reports Table */}
      {!loading && Array.isArray(reportData) && reportData.length > 0 && (
        <div className="table-responsive">
          <table className="reports-table">
            <thead>
              <tr>
                <th className="w48 text-center">S.No</th>
                <th className="text-center">Report ID</th>
                <th className="text-center">Project Name</th>
                <th className="text-center">Date</th>
                <th className="text-center">Reported By</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((report, index) => (
                <tr key={report.reportId || index}>
                  <td className="text-center w48">{(index + 1).toString().padStart(2, "0")}</td>
                  <td className="text-center">{report.reportCode}</td>
                  <td className="text-center">{report.projectName}</td>
                  <td className="text-center">
                    {report.reportDate
                      ? new Date(report.reportDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="reported-by text-center">
                    <div className="d-flex justify-content-center align-items-center gap-2 my-0 mx-auto">
                      {/* Avatar with initials */}
                      <div
                        className="rounded-circle text-white  d-flex align-items-center justify-content-center"
                        style={{
                          width: "20px",
                          height: "20px",
                          fontSize: "8px",
                          backgroundColor: getRandomColor(),
                          flexShrink: 0,
                        }}
                      >
                        {getInitials(report.reportedBy)}
                      </div>

                      {/* Name */}
                      <span>{report.reportedBy}</span>
                    </div>
                  </td>

                  <td className="text-center"
                    onClick={() =>
                      navigate(`/admin/engineerreportview/${report.reportId}`)
                    }
                  >
                    <a href="#" className="view-link">
                      View
                    </a>
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
