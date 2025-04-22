import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
const reports = [
  {
    id: "RP-0021",
    project: "NRM Site (A Block)",
    type: "Daily Reports",
    reportedBy: "Leslie Alexander",
    action: "View",
  },
  {
    id: "RP-0022",
    project: "NRM Site (B Block)",
    type: "Financial Reports",
    reportedBy: "Jacob Jones",
    action: "View",
  },
  {
    id: "RP-0023",
    project: "NRM Site (C Block)",
    type: "Material & Inventory",
    reportedBy: "Arlene McCoy",
    action: "View",
  },
  {
    id: "RP-0024",
    project: "NRM Site (A Block)",
    type: "Manpower Reports",
    reportedBy: "Leslie Alexander",
    action: "View",
  },
  {
    id: "RP-0025",
    project: "NRM Site (B Block)",
    type: "Vendor & PO Reports",
    reportedBy: "Jacob Jones",
    action: "View",
  },
  {
    id: "RP-0026",
    project: "NRM Site (D Block)",
    type: "Equipment Utilization",
    reportedBy: "Cody Fisher",
    action: "View",
  },
  {
    id: "RP-0027",
    project: "NRM Site (E Block)",
    type: "Delay & Risk Reports",
    reportedBy: "Jenny Wilson",
    action: "View",
  },
  {
    id: "RP-0028",
    project: "NRM Site (F Block)",
    type: "Compliance & Audit",
    reportedBy: "Arlene McCoy",
    action: "View",
  },
];
const Report = () => {
  const [selectedFilter, setSelectedFilter] = useState("All Reports");

  const filteredReports =
    selectedFilter === "All Reports"
      ? reports
      : reports.filter((report) => report.type === selectedFilter);
  return (
    <Fragment>
      <main className="ceo-report report-container d-flex">
        <div className="left-container left-container-100">
          <div className="row min-height-100vh h-100">
            <aside className="sidebar">
              <h4 className="fs-20-500 text-dark d-flex">
                <svg className="me-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.25 12.0018H8.895M4.534 12.0018H2.75M4.534 12.0018C4.534 11.4237 4.76368 10.8692 5.17251 10.4604C5.58134 10.0515 6.13583 9.82184 6.714 9.82184C7.29217 9.82184 7.84666 10.0515 8.25549 10.4604C8.66432 10.8692 8.894 11.4237 8.894 12.0018C8.894 12.58 8.66432 13.1345 8.25549 13.5433C7.84666 13.9522 7.29217 14.1818 6.714 14.1818C6.13583 14.1818 5.58134 13.9522 5.17251 13.5433C4.76368 13.1345 4.534 12.58 4.534 12.0018ZM21.25 18.6088H15.502M15.502 18.6088C15.502 19.1871 15.2718 19.7423 14.8628 20.1512C14.4539 20.5601 13.8993 20.7898 13.321 20.7898C12.7428 20.7898 12.1883 20.5592 11.7795 20.1503C11.3707 19.7415 11.141 19.187 11.141 18.6088M15.502 18.6088C15.502 18.0305 15.2718 17.4764 14.8628 17.0675C14.4539 16.6586 13.8993 16.4288 13.321 16.4288C12.7428 16.4288 12.1883 16.6585 11.7795 17.0674C11.3707 17.4762 11.141 18.0307 11.141 18.6088M11.141 18.6088H2.75M21.25 5.39484H18.145M13.784 5.39484H2.75M13.784 5.39484C13.784 4.81667 14.0137 4.26218 14.4225 3.85335C14.8313 3.44452 15.3858 3.21484 15.964 3.21484C16.2503 3.21484 16.5338 3.27123 16.7983 3.38079C17.0627 3.49034 17.3031 3.65092 17.5055 3.85335C17.7079 4.05578 17.8685 4.2961 17.9781 4.56059C18.0876 4.82508 18.144 5.10856 18.144 5.39484C18.144 5.68113 18.0876 5.9646 17.9781 6.22909C17.8685 6.49358 17.7079 6.7339 17.5055 6.93634C17.3031 7.13877 17.0627 7.29935 16.7983 7.4089C16.5338 7.51846 16.2503 7.57484 15.964 7.57484C15.3858 7.57484 14.8313 7.34517 14.4225 6.93634C14.0137 6.52751 13.784 5.97302 13.784 5.39484Z"
                    stroke="black"
                    stroke-width="1.4"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                </svg>
                Filters
              </h4>
              <ul className="filter-list">
                <li
                  className={`filter-item ${
                    selectedFilter === "All Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("All Reports")}
                >
                  All Reports
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Daily Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Daily Reports")}
                >
                  Daily Project Progress
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Financial Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Financial Reports")}
                >
                  Financial Reports
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Material & Inventory" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Material & Inventory")}
                >
                  Material & Inventory
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Manpower Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Manpower Reports")}
                >
                  Manpower Reports
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Vendor & PO Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Vendor & PO Reports")}
                >
                  Vendor & PO Reports
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Equipment Utilization" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Equipment Utilization")}
                >
                  Equipment Utilization
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Delay & Risk Reports" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Delay & Risk Reports")}
                >
                  Delay & Risk Reports
                </li>
                <li
                  className={`filter-item ${
                    selectedFilter === "Compliance & Audit" ? "active" : ""
                  }`}
                  onClick={() => setSelectedFilter("Compliance & Audit")}
                >
                  Compliance & Audit
                </li>
              </ul>
            </aside>
            <div className="ceo-report-container">
              <table className="tbl report-table">
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
                        <td className="action text-bright-royal-blue text-decoration-underline">
                          <Link to="/pm/reportview">{report.action}</Link>
                        </td>
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
            </div>
          </div>
        </div>
      </main>
          {" "}
    </Fragment>
  );
};

export default Report;
