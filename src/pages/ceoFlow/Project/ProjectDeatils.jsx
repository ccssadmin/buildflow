import React, { Fragment, useEffect, useState } from "react";
import ProjectMilestoneTable from "./ProjectMilestoneTable";
import ProjectEmployeesList from "../../../components/common/ProjectEmployeesList";
import ProjectProgressBar from "./ProjectProgressBar";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { use } from "react";
export const roleCheck = { role: "admin" };


const CeoProjectDetails = () => {
const { fetchProjectDetails} = useProject();

const [projectDetails, setProjectDetails] = useState(null);

const defaultProjectId = localStorage.getItem("projectId");
console.log("Project ID from localStorage:", defaultProjectId);

useEffect(() => {
  const getDetails = async () => {
    const data = await fetchProjectDetails(defaultProjectId);
    setProjectDetails(data);
    console.log("Project Details:", data);
  };
  getDetails();
}, []);

  const project = {
    completion: 50, 
  };

console.log("Project Details variable data:", projectDetails);


  return (
    <Fragment>
      <main className="page-project-details d-flex">
        <div className="left-container">

          {/* <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Total Projects</span>420
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Active Projects</span>112
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <h2>
                  <span className="text-dark-gray">Biding Projects</span>24
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
              <div className="card-conatiner">
                <div>
                  <h2>
                    <span className="text-dark-gray">Pending Approvals</span>12
                  </h2>
                </div>
              </div>
            </div>
          </div> */}

          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="card-site-conatiner">
                <h2 className="title-1">{projectDetails?.value?.project?.project_name}</h2>
                <div className="d-flex justify-content-between align-items-center project-date mt-3">
                  <h4 className="text-start">
                    <span>Start Date</span>{projectDetails?.value?.project?.project_start_date}
                  </h4>
                  <h4 className="text-end">
                    <span>Start Date</span>{projectDetails?.value?.project?.project_end_date}
                  </h4>
                </div>
                <ProjectProgressBar progress={project.completion} />
              </div>
              <div className="card-site-conatiner project-milestone mt-4">
                <h4>Project Milestone</h4>
                <ProjectMilestoneTable 
                   milestoneDetails={projectDetails?.value?.milestone_details || []}
                   projectId={projectDetails?.value?.project?.project_id}
                />
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
export default CeoProjectDetails;
