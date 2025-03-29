import React from "react";

const Document = () => {
  const documents = [
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
    { name: "Safety Guidelines", type: "PDF", expiry: "31-Dec-2025", uploadedBy: "Safety Officer", status: "View" },
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
    { name: "SOP – Civil Dept", type: "PDF", expiry: "-", uploadedBy: "Admin", status: "Valid" },
  ];

  return (
    <div >
  <table className="finance-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Expiry</th>
            <th>Uploaded By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{doc.name}</td>
              <td>{doc.type}</td>
              <td>{doc.expiry}</td>
              <td>{doc.uploadedBy}</td>
              <td>
                {doc.status === "Valid" ? (
                  <span className="valid-status"> Valid</span>
                ) : (
                  <a href="ceodocumentview1" className="view-link">View</a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Document;
