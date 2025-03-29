import React, { useState } from "react";


const reports = [
  { id: "RP-0021", project: "NRM Site (A Block)", type: "Daily Reports", reportedBy: "Leslie Alexander", action: "View" },
  { id: "RP-0022", project: "NRM Site (B Block)", type: "Financial Reports", reportedBy: "Jacob Jones", action: "View" },
  { id: "RP-0023", project: "NRM Site (C Block)", type: "Material & Inventory", reportedBy: "Arlene McCoy", action: "View" },
  { id: "RP-0024", project: "NRM Site (A Block)", type: "Manpower Reports", reportedBy: "Leslie Alexander", action: "View" },
  { id: "RP-0025", project: "NRM Site (B Block)", type: "Vendor & PO Reports", reportedBy: "Jacob Jones", action: "View" },
  { id: "RP-0026", project: "NRM Site (D Block)", type: "Equipment Utilization", reportedBy: "Cody Fisher", action: "View" },
  { id: "RP-0027", project: "NRM Site (E Block)", type: "Delay & Risk Reports", reportedBy: "Jenny Wilson", action: "View" },
  { id: "RP-0028", project: "NRM Site (F Block)", type: "Compliance & Audit", reportedBy: "Arlene McCoy", action: "View" },
];

export default function Report() {
  const [selectedFilter, setSelectedFilter] = useState("All Reports");

  const filteredReports =
    selectedFilter === "All Reports"
      ? reports
      : reports.filter((report) => report.type === selectedFilter);

  return (
    <div className="report-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="filter-list">
          <li
            className={`filter-item ${selectedFilter === "All Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("All Reports")}
          >
            All Reports
          </li>
          <li
            className={`filter-item ${selectedFilter === "Daily Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Daily Reports")}
          >
            Daily Project Progress
          </li>
          <li
            className={`filter-item ${selectedFilter === "Financial Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Financial Reports")}
          >
            Financial Reports
          </li>
          <li
            className={`filter-item ${selectedFilter === "Material & Inventory" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Material & Inventory")}
          >
            Material & Inventory
          </li>
          <li
            className={`filter-item ${selectedFilter === "Manpower Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Manpower Reports")}
          >
            Manpower Reports
          </li>
          <li
            className={`filter-item ${selectedFilter === "Vendor & PO Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Vendor & PO Reports")}
          >
            Vendor & PO Reports
          </li>
          <li
            className={`filter-item ${selectedFilter === "Equipment Utilization" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Equipment Utilization")}
          >
            Equipment Utilization
          </li>
          <li
            className={`filter-item ${selectedFilter === "Delay & Risk Reports" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Delay & Risk Reports")}
          >
            Delay & Risk Reports
          </li>
          <li
            className={`filter-item ${selectedFilter === "Compliance & Audit" ? "active" : ""}`}
            onClick={() => setSelectedFilter("Compliance & Audit")}
          >
            Compliance & Audit
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <table className="report-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Project</th>
              <th>Type</th>
              <th>Reported by</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr key={index}>
                  <td>{report.id}</td>
                  <td>{report.project}</td>
                  <td>{report.type}</td>
                  <td>{report.reportedBy}</td>
                  <td className="action">{report.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No reports available for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
