import React, { useState, useEffect, Fragment } from "react";

import editIcon from "../../../assets/images/ic_outline-edit.png"; // Importing the edit icon


export const roleCheck = { role: "admin" };

const initialDepartments = [
  {
    name: "Civil Engineering",
    head: "Er. Arjun Nair",
    email: "arjun.nair@company.com",
    employees: 122,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Plumbing",
    head: "Eleanor Pena",
    email: "eleanor.pena@company.com",
    employees: 45,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Civil Engineering",
    head: "Er. Arjun Nair",
    email: "arjun.nair@company.com",
    employees: 122,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
  {
    name: "Plumbing",
    head: "Eleanor Pena",
    email: "eleanor.pena@company.com",
    employees: 45,
    projects: "6 Active",
    budget: "₹25 Cr",
    used: "₹17.8 Cr",
    utilization: "71.2%",
    location: "HQ + 3 Sites",
    status: "View All",
  },
];

const tabs = [
  "Departments",
  "Team Members",
  "Budget & Finance",
  "Projects Linked",
  "Documents & Compliance",
];

const CeoDepartment = () => {
  const [activeTab, setActiveTab] = useState("Departments");
  const [departments, setDepartments] = useState(initialDepartments);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const editableFields = ["head", "email", "employees", "projects", "budget", "used", "utilization", "location", "status"];

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData({ ...departments[index] });
  };

  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const saveEdit = () => {
    const updatedDepartments = [...departments];
    updatedDepartments[editingIndex] = { ...editData };
    setDepartments(updatedDepartments);
    setEditingIndex(null);
  };

  useEffect(() => {
    if (editingIndex !== null) {
      const inputs = document.querySelectorAll(".edit-input");
      inputs.forEach((input) => input.focus());
    }
  }, [editingIndex]);

  return (
    <Fragment>
      <main className="page-ceo-department d-flex">
        <div className="left-container left-container-100">
         

          {activeTab === "Departments" && (
            <div className="row">
              <div className="department-grid">
                {departments.map((dept, index) => (
                  <div key={index} className="department-card">
                    <div className="card-header">
                      <h2>{dept.name}</h2>
                      <button className="edit-button" onClick={() => handleEdit(index)}>
                        <img src={editIcon} alt="Edit Icon" className="edit-icon" /> Edit
                      </button>
                    </div>
                    <table className="department-table tbl w-100">
                      <thead>
                        <tr>
                          <th className="field">Field</th>
                          <th className="value">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editableFields.map((key) => (
                          <tr key={key}>
                            <td className="field">{key.replace(/_/g, " ")}</td>
                            <td className="value">
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  className="edit-input"
                                  value={editData[key] || ""}
                                  onChange={(e) => handleChange(e, key)}
                                />
                              ) : key === "email" ? (
                                <a href={`mailto:${dept[key]}`} className="email-link custom-color">
                                  {dept[key]}
                                </a>
                              ) : (
                                dept[key]
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="field">View All</td>
                          <td className="value">
                            <a href="/departments/view-all" className="view-all-link">View All</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="action-buttons">
                      {editingIndex === index ? (
                        <button className="save-button" onClick={saveEdit}>Save</button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default CeoDepartment;