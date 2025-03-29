import React, { useState } from "react";
import BudgetScreen from "./BudgetScreen";
import ProjectScreen from "./Projectscreen";
import Document from "./Document";
import CeoDepartment from "./deparment";

const Ceodepartment = () => {
  const [activeTab, setActiveTab] = useState("Department");
  const [selectedSite, setSelectedSite] = useState("MRM Site");
  const [sortBy, setSortBy] = useState("Default");

  const tabs = [
    "Department",
    "Team Member",
    "budget & Finance",
    "Project Linked",
    "Documents & Compliance",
  ];

  // Team Members Data
  const teamMembers = [
    {
      id: "RP-0021",
      name: "Leslie Alexander",
      role: "Site Engineer",
      contact: "9876543210",
      project: "SkyTower A",
      status: "Active",
    },
    {
      id: "RP-0022",
      name: "Leslie Alexander",
      role: "Junior Engineer",
      contact: "9876549870",
      project: "GreenPark",
      status: "On Leave",
    },
    {
      id: "RP-0023",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
    {
      id: "RP-0024",
      name: "Leslie Alexander",
      role: "Supervisor",
      contact: "9867123409",
      project: "SkyTower B",
      status: "Active",
    },
  ];

  return (
    <main className="page-ceo-department">
      <div className="left-container left-container-100">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {/* Tabs */}
            <ul className="nav-tabs-container">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
            <div className="position-relative">
              <div className="sort-container">
                <select
                  className="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Default">Sort By</option>
                  <option value="Budget">Budget</option>
                  <option value="Spent">Spent</option>
                  <option value="Variance">Variance</option>
                  <option value="Utilized">Utilized</option>
                </select>
              </div>
            </div>

            <div>
              {activeTab === "Team Member" && (
                <div>
                  {/* Dropdown for Site Selection */}
                  <div>
                    <select
                      id="site-select"
                      value={selectedSite}
                      onChange={(e) => setSelectedSite(e.target.value)}
                    >
                      <option value="MRM Site">MRM Site</option>
                      <option value="SkyTower A">SkyTower A</option>
                      <option value="GreenPark">GreenPark</option>
                      <option value="SkyTower B">SkyTower B</option>
                    </select>
                  </div>

                  {/* Team Members Table */}

                  <table className="finance-table">
                    <thead>
                      <tr>
                        <th>Emp. ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Contact</th>
                        <th>Assigned Project</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member, index) => (
                        <tr key={index}>
                          <td>{member.id}</td>
                          <td>{member.name}</td>
                          <td>{member.role}</td>
                          <td>{member.contact}</td>
                          <td>{member.project}</td>
                          <td
                            className={
                              member.status === "Active"
                                ? "status-active"
                                : "status-inactive"
                            }
                          >
                            {member.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "Department" && <CeoDepartment />}

              {activeTab === "budget & Finance" && <BudgetScreen />}
              {activeTab === "Project Linked" && <ProjectScreen />}
              {activeTab === "Documents & Compliance" && <Document />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Ceodepartment;
