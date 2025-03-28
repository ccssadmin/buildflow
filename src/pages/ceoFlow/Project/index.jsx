import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { filter, profile, constructions_img } from '../../../assets/images';
import ProjectProgressBar from "./ProjectProgressBar";

const ceoProjects = () => {
  const Projects = [
    {
      siteName: "Chennai Site",
      constructionName: "JV Constructions",
      proprietorName: "Ronald Richards",
      siteCategory: "Proprietor",
      status: "ONGOING",
      startDate: "22-07-2023",
      endDate: "22-07-2025",
      completion: 25,
      requestsPending: 12
    },
    {
      siteName: "Chennai Site",
      constructionName: "JV Constructions",
      proprietorName: "Ronald Richards",
      siteCategory: "Proprietor",
      status: "ONGOING",
      startDate: "22-07-2023",
      endDate: "22-07-2025",
      completion: 65,
      requestsPending: 12
    },
    {
      siteName: "Chennai Site",
      constructionName: "JV Constructions",
      proprietorName: "Ronald Richards",
      siteCategory: "Proprietor",
      status: "ONGOING",
      startDate: "22-07-2023",
      endDate: "22-07-2025",
      completion: 75,
      requestsPending: 12
    }
  ];
  const ProjectCard = ({ project }) => {
    return (
      <div className="card-project">
        <div className="d-flex justify-content-between">
          <h2 className="site-name">{project.siteName}</h2>
          <div className="div-constructions">
            <img src={constructions_img} alt={project.constructionName} />
            <h6 className="constructions-name">{project.constructionName}</h6>
          </div>
        </div>
        <div className="d-flex justify-content-between my-3">
          <div className="d-flex justify-content-between align-items-center">
            <img src={profile} alt="" className="proprietor-img" />
            <h4 className="proprietor-name">{project.proprietorName}</h4>
            <h6 className="site-category">{project.siteCategory}</h6>
          </div>
          <div><span className="project-status">{project.status}</span></div>
        </div>
        <div className="d-flex justify-content-between project-date">
          <h4 className="title-5 text-start">
            <span className="d-block mb-1">Start Date</span>
            {project.startDate}
          </h4>
          <h4 className="title-5 text-end">
            <span className="d-block mb-1">End Date</span>
            {project.endDate}
          </h4>
        </div>
        <div className="small-progress">
          <ProjectProgressBar  progress={project.completion} />
        </div>        
        <div className="d-flex justify-content-between mt-4">
          <Link className="requests-count">{project.requestsPending} Requests Pending</Link>
          <Link className="view-project text-decoration-none" to="/ceo/projectdetails">View Project</Link>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <main className="page-project d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h2 className="title-1">Ongoing Project</h2>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-end">
              <div className="d-flex flex-end">
                <Link className="link-filter"><img src={filter} alt="Filter" /> Filter</Link>
                <Link to="/ceo/createproject" className="ms-4 btn btn-primary bg-primary border-0 fs-14-600 me-0 border-radius-2"> + Create Project </Link>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {Projects.map((project, index) => (
              <div key={index} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ceoProjects;
