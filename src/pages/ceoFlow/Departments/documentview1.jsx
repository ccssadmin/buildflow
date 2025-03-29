import { ChevronRight } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import pdfImage from "../../../assets/images/pdf.png";  // 
import excelImage from "../../../assets/images/xlsx.jpg"; // Excel preview

const DocumentView1 = () => {
  
  const defaultFiles = [
    {
      name: "Requirement Material.xlsx",
      type: "excel",
      status: "valid", // Green tick
    },
    {
      name: "Bill.pdf",
      type: "pdf",
      status: "invalid", // Red tick
    },
  ];
  const location = useLocation(); // Get current page route
  return (
    <div className="document-container">
             <nav className="text-sm text-gray-500 flex items-center">
      {/* Documents Link */}
      <Link
        to="/documents"
        className={`mr-1 ${location.pathname === "/documents" ? " font-medium" : ""}`}
      >
        Documents
      </Link>
      <ChevronRight size={14} className="text-gray-400 mx-1" />

      {/* Reports Link */}
      <Link
        to="/reports"
        className={` ${location.pathname === "/reports" ? "font-medium" : ""}`}
      >
        Reports
      </Link>
    </nav>

      <div className="document-card">
        {/* Report Header */}
        <div className="document-header">
          <div className="document-field">
            <p className="document-label">Report ID</p>
            <p className="document-value"> Daily Report - DPR2025-00152</p>
          </div>
          <div className="document-field">
  <p className="document-label">Report Type <span className="text-red-500">*</span></p>
  <select className="document-dropdown">
    <option>Daily Report</option>
    <option>Weekly Report</option>
    <option>Monthly Report</option>
  </select>
</div>

          <div className="document-field">
  <p className="document-label">Project <span className="text-red-500">*</span></p>
  <select className="document-dropdown">
    <option>BOQ TITLE</option>
    <option>Project A</option>
    <option>Project B</option>
  </select>
</div>

          <div className="document-field">
            <p className="document-label">Date & Time</p>
            <p className="document-value">15-03-2025 • 06:04 pm</p>
          </div>
          <div className="document-reporter">
            <p className="document-label">Reported By</p>
            <p className="document-value document-user">
              <img
                src="https://via.placeholder.com/30"
               
                className="document-avatar"
              />
              Marvin McKinney
            </p>
          </div>
        </div>

        {/* Sections */}
        {[
          {
            title: "Daily Progress Summary",
            headers: ["S.No", "Work Activities", "Status", "Action"],
            rows: [
              ["01", "Steel Reinforcement", "80% Completed", <Link to="/documentview" className="document-link">View</Link>],
              ["02", "Concrete Pouring", "Delayed (Weather Issue)", ""],
            ],
          },
          {
            title: "Material Usage Report",
            headers: ["S.No", "Materials", "Stock", "Level"],
            rows: [
              [
                "01",
                "Cement",
                "200 Bags",
                <select className="stock-dropdown">
                  <option value="low" className="low-stock">Low Stock</option>
                  <option value="sufficient" className="sufficient">Sufficient</option>
                  <option value="high" className="high-stock">High Stock</option>
                </select>,
              ],
              [
                "02",
                "Steel Rods",
                "2 Tons",
                <select className="stock-dropdown">
                  <option value="sufficient" className="sufficient">Sufficient</option>
                  <option value="low" className="low-stock">Low Stock</option>
                  <option value="high" className="high-stock">High Stock</option>
                </select>,
              ],
            ],
          }
          ,
          
          {
            title: "Safety & Compliance Report",
            headers: ["S.No", "Safety & Compliance", "Report"],
            rows: [
              ["01", "PPE Compliance", "Helmet – 90% | Gloves – 80%"],
              ["02", "Safety Incident", "Slip & Fall – First Aid"],
              ["03", "Inspection", "Passed Scaffolding Safety"],
            ],
          },
          {
            title: "Issue & Risk Report",
            headers: ["S.No", "Issue & Risk", "Impact"],
            rows: [
              ["01", "Material Delay", <span className="high-impact">High</span>],
            ],
          },
        ].map((section, index) => (
          <div key={index} className="document-section">
            <h2 className="document-title">{section.title}</h2>
            <table className="document-table">
              <thead>
                <tr>
                  {section.headers.map((header, i) => (
                    <th key={i} className="document-th">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="document-tr">
                    {row.map((cell, j) => (
                      <td key={j} className="document-td">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="file-attachment">
  <h3 className="file-title">Attached File</h3>
  <div className="file-list">
    {defaultFiles.map((file, index) => (
      <div key={index} className="file-item">
        <a href="https://example.com/path-to-file.pdf" download>
        <img
            src={file.type === "excel" ? excelImage : pdfImage}
            alt="File Preview"
            className="file-preview"
          />        </a>
      </div>
      
    ))}
     </div>
      <button className="file-button">Valid</button>
    </div>






      
    </div>
  );
};

export default DocumentView1;