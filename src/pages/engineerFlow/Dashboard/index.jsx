import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile , constructions_img } from '../../../assets/images';
import Notification from "../../../components/common/NotificationTab";
export const roleCheck = { role: "admin" };



const materials = [
  { material_list: "Cement (50kg)", in_stock_quantity: "500 Bags", required_quantity: "200 Bags", status: "Urgent" },
  { material_list: "Structural Framing", in_stock_quantity: "120 Rod", required_quantity: "200 Bags", status: "Delay" },
];


const EngineerDashboard = ({ progress = 50, maxValue = 100 }) => {
  const percentage = (progress / maxValue) * 100;
  // const activeBoardName = findBoardById(userInfo.activeBoard);

  const navigate = useNavigate();

  return (
    <Fragment>
      <main className="page-engineer-dashboard d-flex">
        <div className="left-container">
          <div className="row mt-4">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
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
                <div className="d-flex justify-content-between mt-4">
                  <Link className="requests-count" >12 Requests Pending</Link>
                  <Link 
                  className="view-project text-decoration-none" 
                  to="/admin/engineerproject"  
                  >View Project</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h4 className="fs-22-700 mt-1 mb-4">Material Stock Alerts </h4>
                <div className="material-stock tbl-conatiner-material-stock">
                <table className="tbl table-bordered mb-0">
                  <thead>
                  <tr>
                      <th className="fs-16-500">Material List</th>
                      <th className="fs-16-500">In Stock Quantity</th>
                      <th className="fs-16-500">Required Quantity</th>
                      <th className="fs-16-500">Status</th>
                      <th className="fs-16-500">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  {materials.map((material, index) => (
                      <tr key={index}>
                          <td className="text-center fs-16-500">{material.material_list}</td>
                          <td className="text-left fs-16-500">{material.in_stock_quantity}</td>
                          <td className="text-center fs-16-500 text-crimson-red">{material.required_quantity}</td>
                          <td className={`text-center fs-16-500 ${
                            material.status === "Urgent" ? "text-crimson-red" :
                            material.status === "Delay" ? "text-golden-yellow" :
                            material.status === "Completed" ? "text-success" :
                            material.status === "On Hold" ? "text-info" :
                            "text-secondary" // default class
                          }`}>
                            {material.status}
                          </td>
                          <td className="text-center">
                            <button 
                            className="fs-16-500 text-bright-royal-blue text-decoration-underline bg-light border-0 lh-lg"
                            onClick={ () => navigate('/admin/engineermaterialcreate')}
                            >
                                Create
                            </button>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
                </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Task</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="card-pending-approvel mt-2">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <h6 className="text-dark fs-12-400">04-03-2025</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel mt-2">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <h6 className="text-dark fs-12-400">04-03-2025</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel mt-2">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <h6 className="text-dark fs-12-400">04-03-2025</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel mt-2">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <h6 className="text-dark fs-12-400">04-03-2025</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
              </div>
              <h4 className="fs-22-700 mt-3 mb-3">Work Delays</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="work-delays-header">
                    <h5 className="fs-18-500 mb-0">4th Floor Painting (A Block) <span className="fs-16-500 text-crimson-red">2 Days</span></h5>
                  </div>
                  <div className="work-delays-body d-flex">
                    <div className="start-date">
                      <span className="fs-10-400">Start Date</span>
                      <h6 className="fs-16-500">27-02-2025</h6>
                    </div>
                    <div className="planned-date">
                      <span className="fs-10-400">Planned Date</span>
                      <h6 className="fs-16-500">02-03-2025</h6>
                    </div>
                    <div className="completed-date">
                      <span className="fs-10-400">Completed Date</span>
                      <h6 className="fs-16-500">04-03-2025</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Pending Approvals</h4>
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="title-2 mb-0 justify-content-start align-items-center d-flex">Pending Approvals <span className="pending-approvel-count">12</span></h4>
                  <Link to="/approvals" className="text-decoration-none fs-6 view-all-approvals">View all</Link>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="profileimg" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
                </div>
                <div className="card-pending-approvel">
                  <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                    <div className="card-pending-approvel-project-title">
                      <h4 className="title-3">MAA Site</h4>
                      <span className="project-dept">Finance</span>
                    </div>
                    <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                      <img src={profile} alt="" />
                      <h6 className="mb-0 ms-1">Marvin McKinney</h6>
                    </div>
                  </div>
                  <div className="card-pending-approvel-content">
                    <h6 className="title-4 my-2">Approval for Fund Rise</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation </p>
                  </div>
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

export default EngineerDashboard;
