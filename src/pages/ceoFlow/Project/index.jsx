import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { filter, profile, constructions_img } from "../../../assets/images";
import ProjectProgressBar from "./ProjectProgressBar";
import { useDispatch } from "react-redux";
import { getAllProjectByFilterAction } from "../../../store/actions/Ceo/ceoprojectAction";

const CeoProjects = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // Default to show all

  const projectId = localStorage.getItem("projectId");



  // Date formatting function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // Fetch all projects
  const fetchAllProjects = async () => {
    setLoading(true);
    try {
      const result = await dispatch(getAllProjectByFilterAction()).unwrap();
      setProjects(result);
      setFilteredProjects(result); // Initially show all projects
      setError(null);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on the selected status
  const applyFilter = () => {
    if (statusFilter === "all") {
      setFilteredProjects(projects); // Show all projects
    } else {
      const filtered = projects.filter(
        (project) => project.project_status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
  };

  // Effect to fetch projects on component mount
  useEffect(() => {
    fetchAllProjects();
  }, []);

  // Effect to apply filter whenever statusFilter changes
  useEffect(() => {
    applyFilter();
  }, [statusFilter, projects]);

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const ProjectCard = ({ project }) => (
    <div className="card-project">
      <div className="d-flex justify-content-between">
        <h2 className="site-name">{project.project_name}</h2>
        <div className="div-constructions">
          <img src={constructions_img} alt={project.constructionName} />
          <h6 className="constructions-name">{project.subcontractor_names}</h6>
        </div>
      </div>
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex justify-content-between align-items-center">
          <img src={profile} alt="" className="proprietor-img" />
          <h4 className="proprietor-name">{project.client_name}</h4>
          <h6 className="site-category">{project.siteCategory}</h6>
        </div>
        <div>
          <span className="project-status">{project.project_status}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between project-date">
        <h4 className="title-5 text-start">
          <span className="d-block mb-1">Start Date</span>
          {formatDate(project.project_start_date)}
        </h4>
        <h4 className="title-5 text-end">
          <span className="d-block mb-1">End Date</span>
          {formatDate(project.project_end_date)}
        </h4>
      </div>
      <div className="small-progress">
        <ProjectProgressBar progress={project.completion} />
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Link className="requests-count">{project.requestsPending} Requests Pending</Link>
        <Link className="view-project text-decoration-none" to="/ceo/projectdetails"
          onClick={() => localStorage.setItem("projectId", project.project_id)}>
          View Project
        </Link>
      </div>
    </div>
  );

  return (
    <Fragment>
      <main className="page-project d-flex">
        <div className="left-container left-container-100">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h2 className="title-1">Projects</h2>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-end">
              <div className="d-flex align-items-center justify-content-end">
              
                <select
                  className="link-filter"
                  
                  value={statusFilter}
                  onChange={handleFilterChange}
                  style={{ width: "150px", height: "35px" }}
                >
                  <option value="all">All</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Pending">Pending</option>
                  <option value="Planned">Planned</option>
                  <option value="NotApproved">Not Approved</option>
                </select>
                <Link
                  to="/ceo/createproject"
                  className="ms-4 btn btn-primary bg-primary border-0 fs-14-600 me-0 border-radius-2"
                >
                  + Create Project
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {loading ? (
              <div>Loading projects...</div>
            ) : error ? (
              <div className="text-danger">Failed to load projects: {error}</div>
            ) : filteredProjects.length === 0 ? (
              <div>No projects found.</div>
            ) : (
              filteredProjects.map((project, index) => (
                <div key={index} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                  <ProjectCard project={project} />
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CeoProjects;