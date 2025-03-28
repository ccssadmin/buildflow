import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { profile , constructions_img } from '../../../assets/images';

import Notification from "../../../components/common/NotificationTab";
export const roleCheck = { role: "admin" };



const materials = [
  { material_list: "Cement (50kg)", in_stock_quantity: "33 Bags", required_quantity: "200 Bags", status: "Urgent" },
  { material_list: "TMT Rod (10mm)", in_stock_quantity: "444 Rod", required_quantity: "200 Bags", status: "Delay" },
  { material_list: "Cement (50kg)", in_stock_quantity: "44 Bags", required_quantity: "200 Bags", status: "Urgent" },
];
const pendingApprovals = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 2,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 3,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."

import { MdOutlineCurrencyRupee } from "react-icons/md";
export const roleCheck = { role: "admin" };

const pendingBOQs = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 2,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 3,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 4,

    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 5,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 6,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 5,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 6,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 7,
    site: "MAA Site",

    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 8,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 9,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 8,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 9,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 10,
    site: "MAA Site",

    department: "Finance",
    user: "Marvin McKinney",
    img: profile,
    title: "Approval for Fund Rise",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 11,
    site: "Chennai Site",
    department: "HR",
    user: "Kathryn Murphy",
    img: profile,
    title: "Leave Approval",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
  },
  {
    id: 12,
    site: "Bangalore Office",
    department: "IT",
    user: "Jane Cooper",
    img: profile,
    title: "Hardware Purchase Request",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
  },
];
const tasks = [
  {
    id: 1,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 11,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 12,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const requestposs = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 2,
    site: "MAA Site",

    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 3,
    site: "MAA Site",

    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",

  },
  {
    id: 4,
    site: "MAA Site",

    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 5,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 6,
    site: "MAA Site",
    department: "Finance",
    date: "04-03-2025",
    title: "Approval for Fund Rise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
];

const workDelays = [
  {
    id: 1,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 2,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 3,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 4,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 5,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
  {
    id: 6,
    title: "4th Floor Painting (A Block)",
    delayDays: "2 Days",
    startDate: "27-02-2025",
    plannedDate: "02-03-2025",
    completedDate: "04-03-2025"
  },
];

    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const costEstimations = [
  {
    id: 1,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
  {
    id: 2,
    site: "MAA Site",
    block: "( A Block )",
    role: "Site Engineer",
    user: "Marvin McKinney",
    date: "24 Jan",
    time: "12.02 am",
    img: profile,
    status: "In review",
  },
];
const vendorInquiries = [
  {
    id: 1,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  {
    id: 2,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  {
    id: 3,
    vendor: "CCS Enterprises",
    user: "Marvin McKinney",
    img: profile,
  },
  
];
const matrials = [
    {
        id: 1,
        product: "CCS Enterprises",
        prize: "100",
        currentprize: "102",
        vendor: "profile",
        productimg: profile,
        img: profile,
    }, 
    {
        id: 2,
        product: "CCS Enterprises",
        prize: "55",
        currentprize: "100",
        vendor: "profile",
        productimg: profile,
        img: profile,
    }, 
];


const AqsDashboard = ({ progress = 50, maxValue = 100 }) => {
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
                    <h6 className="constructions-name text-dark">JV Constructions</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-between my-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <img src={profile} alt="" className="proprietor-img" />
                    <h4 className="fs-16-500 proprietor-name">Ronald Richards</h4>
                    <h6 className="site-category fs-14-400">Proprietor</h6>
                  </div>
                  <div className=""><span className="project-status">ONGOING</span></div>
                </div>
                <div className="d-flex justify-content-between project-date">
                  <h4 className="fs-16-500 title-5 text-start">
                    <span className="d-block mb-1">Start Date</span>
                    22-07-2023
                  </h4>
                  <h4 className="fs-16-500 title-5 text-end ">
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
                  <Link className="requests-count fs-16-500 h40px6">12 Requests Pending</Link>
                  <Link 
                  className="view-project fs-16-500 text-decoration-none text-bright-shade-blue" 
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
                <div className="task-content scrollbar-none">
                  {tasks.map((task) => (
                    <Link key={task.id} className="card-pending-approvel mt-2 text-decoration-none text-dark">
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-20-500">{task.site}</h4>
                          <span className="project-dept">{task.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <h6 className="text-dark fs-12-400">{task.date}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{task.title}</h6>
                        <p>{task.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <h4 className="fs-22-700 mt-3 mb-3">Work Delays</h4>
              <div className="pending-approvel-conatiner task-conatiner">
                <div className="task-content scrollbar-none">
                  {workDelays.map((delay) => (
                    <div key={delay.id} className="card-pending-approvel mb-4">
                      <div className="work-delays-header">
                        <h5 className="fs-18-500 mb-0">
                          {delay.title}{" "}
                          <span className="fs-16-500 text-crimson-red">{delay.delayDays}</span>
                        </h5>
                      </div>
                      <div className="work-delays-body d-flex">
                        <div className="start-date">
                          <span className="fs-10-400">Start Date</span>
                          <h6 className="fs-16-500">{delay.startDate}</h6>
                        </div>
                        <div className="planned-date">
                          <span className="fs-10-400">Planned Date</span>
                          <h6 className="fs-16-500">{delay.plannedDate}</h6>
                        </div>
                        <div className="completed-date">
                          <span className="fs-10-400">Completed Date</span>
                          <h6 className="fs-16-500">{delay.completedDate}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <h4 className="fs-22-700 mt-2 mb-4">Pending Approvals</h4>
              <div className="pending-approvel-conatiner">
                <div className="justify-content-between d-flex mb-4">
                  <h4 className="fs-20-500 mb-0 justify-content-start align-items-center d-flex">Pending Approvals <span className="pending-approvel-count">12</span></h4>
                  <Link to="/approvals" className="text-decoration-none fs-16-500 view-all-approvals text-bright-royal-blue">View all</Link>
                </div>
                <div className="pending-max-height-large scrollbar-none">
                  {pendingApprovals.map((approval) => (
                    <Link key={approval.id} className="card-pending-approvel text-decoration-none text-dark">
                      <div className="card-pending-approvel-header d-flex justify-content-between align-items-start">
                        <div className="card-pending-approvel-project-title">
                          <h4 className="fs-18-500">{approval.site}</h4>
                          <span className="project-dept">{approval.department}</span>
                        </div>
                        <div className="card-pending-approvel-project-user d-flex justify-content-between align-items-center">
                          <img src={approval.img} alt="profile" />
                          <h6 className="mb-0 ms-1 fs-12-600">{approval.user}</h6>
                        </div>
                      </div>
                      <div className="card-pending-approvel-content">
                        <h6 className="fs-16-500 my-2">{approval.title}</h6>
                        <p className="fs-12-400">{approval.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>            
          </div>
        </div>
        <div className="right-container">
          <Notification />
        </div>
      </main>

        <main className="page-aqs-dashboard d-flex">
            <div className="left-containeleft-container left-container-100">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">                
                        <h2><span className="text-gray">Total Projects</span>420</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <h2><span className="text-gray">Active Projects</span>112</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <h2><span className="text-gray">Biding Projects</span>24</h2>
                    </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <div className="card-conatiner">
                        <div>
                        <h2><span className="text-gray">Pending Approvals</span>12</h2>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Pending BOQ's <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {pendingBOQs.map((pendingBOQ) => (
                                <Link key={pendingBOQ.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{pendingBOQ.site}<span className="text-dark-gray fs-14-400 ms-2">{pendingBOQ.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{pendingBOQ.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{pendingBOQ.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={pendingBOQ.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{pendingBOQ.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{pendingBOQ.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <span 
                                                className={`fs-14-400 ${
                                                    pendingBOQ.status === "Approved" ? "text-green6" :
                                                    pendingBOQ.status === "Reject" ? "text-crimson-red" :
                                                    pendingBOQ.status === "In review" ? "text-golden-yellow" :
                                                    pendingBOQ.status === "Pending" ? "text-info" : ""
                                                }`}
                                            >
                                                {pendingBOQ.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">PO's Request <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {requestposs.map((requestpos) => (
                                <Link key={requestpos.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{requestpos.site}<span className="text-dark-gray fs-14-400 ms-2">{requestpos.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{requestpos.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{requestpos.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={requestpos.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{requestpos.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{requestpos.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <span 
                                                className={`fs-14-400 ${
                                                    requestpos.status === "Approved" ? "text-green6" :
                                                    requestpos.status === "Reject" ? "text-crimson-red" :
                                                    requestpos.status === "In review" ? "text-golden-yellow" :
                                                    requestpos.status === "Pending" ? "text-info" : ""
                                                }`}
                                            >
                                                {requestpos.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Cost Estimation <span className="pending-approvel-count fs-16-500">12</span></h4>
                            </div>
                            <div className="poq-max-height scrollbar-none">
                            {costEstimations.map((costEstimation) => (
                                <div key={costEstimation.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="">
                                            <h4 className="fs-16-500 text-dark">{costEstimation.site}<span className="text-dark-gray fs-14-400 ms-2">{costEstimation.block}</span></h4>
                                        </div>
                                        <div className=" d-flex justify-content-between align-items-center">
                                            <span className="text-dark-gray fs-12-400">{costEstimation.time}</span>
                                            <span className="dot"></span>
                                            <span className="text-dark-gray fs-12-400">{costEstimation.date}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex">
                                            <img src={costEstimation.img} className="h32-w32 me-2" alt="profile" />
                                            <h6 className="mb-0 ms-1 fs-16-500">{costEstimation.user} 
                                                <span className="d-block fs-12-400 text-dark-gray mt-1">{costEstimation.role}</span>
                                            </h6>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Link className="fs-14-400 text-bright-royal-blue">
                                            View List
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Material Prize</h4>
                            </div>
                            <div className="poq-max-small scrollbar-none">
                                <table className="border-0 w-100 tbl-material-prize">
                                    <thead>
                                        <tr className="border-bottom-1">
                                            <th className="fs-16-500 text-dark text-center bg-transparent border-0">Product</th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Prize <MdOutlineCurrencyRupee /></th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Current Prize <MdOutlineCurrencyRupee /></th>
                                            <th className="fs-16-500 text-dark text-center text-center bg-transparent border-0">Product</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {matrials.map((matrial) => (
                                        <tr key={matrial.id} className="">
                                            <td className="fs-16-500 text-dark text-center bg-transparent">
                                            <img src={matrial.productimg} className="h32-w32 me-2" alt="profile" /> {matrial.product}</td>
                                            <td className="fs-16-500 text-dark text-center text-center bg-transparent">{matrial.prize}</td>
                                            <td className="fs-16-500 text-dark text-center bg-transparent">
                                                {matrial.currentprize}
                                                {matrial.prize !== 0 && (
                                                (() => {
                                                    const difference = ((matrial.currentprize - matrial.prize) / matrial.prize) * 100;
                                                    const isIncrease = difference > 0;

                                                    return (
                                                    <span className={`ms-2 ${isIncrease ? 'text-success' : 'text-danger'}`}>
                                                        {isIncrease ? (
                                                        <img src={profile} className="h16-w16 ms-1" alt="up-arrow" />
                                                        ) : (
                                                        <img src={constructions_img} className="h16-w16 ms-1" alt="down-arrow" />
                                                        )}
                                                        {Math.abs(difference).toFixed(0)}%
                                                    </span>
                                                    );
                                                })()
                                                )}
                                            </td>
                                            <td className="fs-16-500 text-dark text-center text-center bg-transparent"><img src={matrial.img} className="h24-w24 me-2" alt="profile" /> {matrial.vendor}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                        <div className="pending-approvel-conatiner">
                            <div className="justify-content-between d-flex mb-4">
                                <h4 className="fs-22-700 mb-0 justify-content-start align-items-center d-flex">Vendor's Inquiries</h4>
                            </div>
                            <div className="poq-max-small scrollbar-none">
                            {vendorInquiries.map((vendorInquirie) => (
                                <div key={vendorInquirie.id} className="card-boq text-decoration-none text-dark">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="">
                                            <div className="d-flex align-items-center">
                                                <img src={vendorInquirie.img} className="h24-w24 me-1" alt="profile" />
                                                <h6 className="mb-0 ms-1 fs-16-500">{vendorInquirie.vendor} 
                                                    
                                                </h6>
                                            </div>
                                            <span className="d-block fs-12-400 text-dark-gray mt-1">{vendorInquirie.user}</span>
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center">
                                            <Link className="fs-14-40066 text-bright-royal-blue">
                                            View List
                                            </Link>
                                        </div>
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

export default AqsDashboard;
