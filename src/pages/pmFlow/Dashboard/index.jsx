import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile } from "../../../assets/images";
import ProjectProgressBar from "../Project/ProjectProgressBar";
import ProjectTimelineProgressBar from "../Project/ProjectTimelineProgressBar";
export const roleCheck = { role: "admin" };


const pendingApprovals = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 7,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 8,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 9,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const PmDashboard = () => {
  const navigate = useNavigate();
  const project = {
    completion: 60, 
  };
  const projecttimeline = {
    completion: 40, 
  };
  return (
    <Fragment>
      <main className="page-pmdashboard d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="card-conatiner-main first">
              <div className="card-conatiner d-block">
                <h2 className="w-100 d-block">
                  <span className="text-dark fs-28-700">NRM Site</span>
                </h2>
                <ProjectProgressBar progress={project.completion} />
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner d-block">
                <h2>
                  <span className="text-dark-gray">Status</span>
                </h2>
                <div className="status">
                  On Track
                </div>
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Start Date</span>12 Jan 2024
                </h2>
              </div>
            </div>
            <div className="card-conatiner-main">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Planned End Date</span>04 Dec 2025
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 col-sm-12 col-md-12 col-lg-7 col-xl-7">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-24-700 mb-0 justify-content-start align-items-center d-flex">
                    Timeline Summary
                  </h4>
                  <Link
                    to="/pm/task"
                    className="text-decoration-none fs-6 view-all-approvals"
                  >
                    View all
                  </Link>
                </div>
                <div className="d-flex timiline-summary-container">
                  <div className="timiline-summary-card">
                      <div className="">
                        <p>Excavation <span className="status">Completed</span></p>
                      </div>
                      <ProjectTimelineProgressBar progress={projecttimeline.completion} />
                  </div>
                </div>
              </div>
            </div>
            {/* Pending Approvals Section */}
            <div className="mt-4 col-sm-12 col-md-12 col-lg-5 col-xl-5">
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">
                    Pending Approvals{" "}
                    <span className="pending-approvel-count">
                      {pendingApprovals.length}
                    </span>
                  </h4>
                  <Link
                    to="/approvals"
                    className="text-decoration-none fs-6 view-all-approvals"
                  >
                    View all
                  </Link>
                </div>
                <div className="height-540px scrollbar-none">
                  {pendingApprovals.map((approval) => (
                    <div className="card-pending-approvel" key={approval.id}>
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="title-3">{approval.site}</h4>
                          <span className="project-dept">
                            {approval.department}
                          </span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <img src={profile} alt="profileimg" />
                          <h6 className="mb-0 ms-1">{approval.user}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="title-4 my-2">{approval.title}</h6>
                        <p>{approval.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default PmDashboard;
