import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import { filter } from "../../assets/images";
import { ProgressBar } from "react-bootstrap";
import ProjectMilestoneTable from "./ProjectMilestoneTable";
import ProjectEmployeesList from "../../../components/common/ProjectEmployeesList";
export const roleCheck = { role: "admin" };

const ProjectDetails = ({ progress = 50, maxValue = 100 }) => {
  const percentage = (progress / maxValue) * 100;
  return (
    <Fragment>
      <main className="page-project-details d-flex">
        <div className="left-container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-gray">Total Projects</span>420
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-gray">Active Projects</span>112
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-gray">Biding Projects</span>24
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <div>
                  <h2>
                    <span className="text-gray">Pending Approvals</span>12
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="card-site-conatiner">
                <h2 className="title-1">Ramnad RWSP Site</h2>
                <div className="d-flex justify-content-between align-items-center project-date mt-3">
                  <h4 className="text-start">
                    <span>Start Date</span>22-07-2023
                  </h4>
                  <h4 className="text-end">
                    <span>Start Date</span>22-07-2023
                  </h4>
                </div>
                <div className="progress-container mt-3 mb-2">
                  <div className="custom-progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />

                    <div
                      className="progress-indicator large"
                      style={{ left: `${percentage}%` }}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-site-conatiner project-milestone mt-4">
                <h4>Project Milestone</h4>
                <ProjectMilestoneTable />
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <ProjectEmployeesList />
        </div>
      </main>
    </Fragment>
  );
};
export default ProjectDetails;
