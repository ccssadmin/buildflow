import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { filter , profile , constructions_img } from '../../../assets/images';
// import { profile } from '../../assets/images';
// import { constructions_img } from '../../assets/images';
import Notification from "../../../components/common/NotificationTab";
import { ProgressBar } from "react-bootstrap";
export const roleCheck = { role: "admin" };

const Projects = () => {

  // const activeBoardName = findBoardById(userInfo.activeBoard);

  return (
    <Fragment>
      <main className="page-project d-flex">
        <div className="left-container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <h2 className="title-1">Ongoing Project</h2>  
            </div>  
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 text-end">
              <Link className="link-filter"><img src={filter} alt="Filter" /> Filter</Link>  
            </div>  
          </div>          
          <div className="row mt-4">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
              <div className="card-project">
                <div className="d-flex justify-content-between">
                  <h2 className="site-name">Chennai Site</h2>
                  <div className="div-constructions">
                    <img src={constructions_img} alt="JV Constructions"></img>
                    <h6 className="constructions-name">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="title-5 text-end ">
                    <span className="d-block mb-1">End Date</span>
                    22-07-2025
                  </h4>
                </div>
                <div className="progress-container my-3">
                  <div className="progress-label">40%</div>
                  <ProgressBar now="40" className="custom-progress" />
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link className="view-project text-decoration-none" to="/projectdetails" >View Project</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <Notification />
        </div>
      </main>
    </Fragment>
  );
};
export default Projects;
