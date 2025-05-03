import React from 'react';
import { Chart } from "react-google-charts";
import "../../../styles/components/css/hr/hrms.css";

const data = [
  ["Status", "Percentage"],
  ["Present", 90],
  ["Absent", 7],
  ["On Leave", 3],
];

const options = {
  legend: "none",
  pieSliceText: "none",
  colors: ["#9BB7F0", "#FDE187", "#F8A6B7"],
  pieStartAngle: 100,
};

function HRDashboard() {
  return (
    <div className="dashboard-container container mt-4">

      {/* Top Cards */}
      <div className="row dashboard-top-cards mb-4">
        {[
          { title: "Total Employees", value: "132" },
          { title: "Active Employees", value: "124" },
          { title: "On Leave Today", value: "08" },
          { title: "Pending Approvals", value: "03" },
        ].map((card, idx) => (
          <div className="col-md-3" key={idx}>
            <div className="dashboard-card text-center p-3 border rounded shadow-sm">
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart & Joiners */}
      <div className="row mb-4">
        <div className="col-md-6 dashboard-chart-section">
          <Chart
          className='piechart-design'
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"250px"}

            
          />
          <ul className="dashboard-legend list-unstyled mt-3">
            <li><span className="legend-dot present"></span> Present: 90%</li>
            <li><span className="legend-dot absent"></span> Absent: 7%</li>
            <li><span className="legend-dot leave"></span> On Leave: 3%</li>
          </ul>
        </div>
        <div className="col-md-3 dashboard-joiners-section">
          <h6>New Joiners Carousel <span className="badge bg-warning text-dark ms-2">3</span></h6>
          <ul className="list-group mt-2">
            <li className="list-group-item d-flex justify-content-between">
              <div className='namedashboard'>
                <strong>Jacob Jones</strong>
                <small>Site Engineer</small><br />
              </div>
              <span className="spandashboard badge bg-dark">Joined Today</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <strong>Albert Flores</strong><br />
                <small>Survey Engineer</small>
              </div>
              <span className="spandashboard badge bg-secondary">Joined Last day</span>
            </li>
          </ul>
        </div>

        <div className="col-md-3 dashboard-activities-section">
          <h6>Recent Activities <span className="badge bg-warning text-dark ms-2">10</span></h6>
          <ul className="list-group mt-2">
            <li className="list-group-item d-flex justify-content-between">
              <div>Ronald Richards<br /><small>Site Engineer</small></div>
              <span className="text-danger">Request Leave</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Cody Fisher<br /><small>Site Engineer</small></div>
              <span className="text-success">Approved Leave</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Kathryn Murphy<br /><small>Site Engineer</small></div>
              <span className="text-success">Salary Credited</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Ralph Edwards<br /><small>Site Engineer</small></div>
              <span className="text-danger">Today Leave</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Guy Hawkins<br /><small>Site Engineer</small></div>
              <span className="text-success">Approved Leave</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Bessie Cooper<br /><small>Site Engineer</small></div>
              <span className="text-success">Approved Leave</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>Darrell Steward<br /><small>Site Engineer</small></div>
              <span className="text-success">Approved Leave</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Leave Management Table */}
      <div className="dashboard-leave-section">
        <h6>Leave Management</h6>
        <table className="table table-bordered mt-2">
          <thead className="table-light">
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Courtney Henry</td><td>Civil</td><td>Casual</td><td>7/11/19</td><td className="text-success">Approved</td></tr>
            <tr><td>Devon Lane</td><td>Civil</td><td>Sick</td><td>5/27/15</td><td className="text-danger">Rejected</td></tr>
            <tr><td>Eleanor Pena</td><td>Civil</td><td>Casual</td><td>7/27/13</td><td className="text-success">Approved</td></tr>
            <tr><td>Bessie Cooper</td><td>Civil</td><td>Casual</td><td>1/28/17</td><td className="text-success">Approved</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HRDashboard;
