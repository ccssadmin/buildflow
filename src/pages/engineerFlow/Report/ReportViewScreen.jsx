import React from 'react';
import { useState } from 'react';

const ReportViewScreen = () => {

  const [selectedStatus, setSelectedStatus] = useState('High');
  const [selectedStock, setSelectedStock] = useState("LowStock");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };


  const handleStockColorChange = (event) => {
    setSelectedStock(event.target.value);
  }

  // Define colors for each status
  const statusColors = {
    High: 'red',
    Medium: 'blue',
    Low: 'green',
  };


  const stockColors = {
    LowStock : "red",
    InStock : 'blue',
    OverStock : 'green'
    
  }


  return (
    <div className="report-container">
      <div className="header-section">
        <div className="input-group">
          <label>Report ID</label>
          <input type="text" value="DPR2025–00152" readOnly />
        </div>
        <div className="input-group">
          <label>Report Type *</label>
          <select>
            <option>Daily Report</option>
            <option>Weekly Report</option>
            <option>Monthly Report</option>
          </select>
        </div>
        <div className="input-group">
          <label>Project</label>
          <select>
            <option>BOQ TITLE</option>
            <option>Project A</option>
            <option>Project B</option>
          </select>
        </div>
      </div>

      <div className="header-section">
        <div className="input-group">
          <label>Date & Time</label>
          <input type="text" value="15–03–2025 • 06:04 pm" readOnly />
        </div>
        <div className="input-group">
          <label>Reported By</label>
          <input type="text" value="Marvin McKinney" readOnly />
        </div>
      </div>

      <h3>Daily Progress Summary</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Work Activities</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Steel Reinforcement</td>
            <td>80 % Completed</td>
            <td><a className= "view">View</a></td>
          </tr>
          <tr>
            <td>02</td>
            <td>Concrete Pouring</td>
            <td>Delayed (Weather Issue)</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3>Material Usage Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Materials</th>
            <th>Stock</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Cement</td>
            <td>200 Bags</td>
            <td>
              <select className="status-dropdown"
              value={selectedStock}
              onChange={handleStockColorChange}
              style={{ color: stockColors[selectedStock] }} 
              
              
              >
                <option value="LowStock" style={ { color : 'red'}}>Low Stock</option>
                <option value="InStock" style={ { color : 'blue'}}>In Stock</option>
                <option value="OverStock" style={ { color : 'green'}}>Over Stock</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <h3>Safety & Compliance Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Safety & Compliance</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>PPE Compliance</td>
            <td>Helmet – 90% | Gloves – 80%</td>
          </tr>
          <tr>
            <td>02</td>
            <td>Safety Incident</td>
            <td>Slip & Fall – First Aid</td>
          </tr>
          <tr>
            <td>03</td>
            <td>Inspection</td>
            <td>Passed Scaffolding Safety</td>
          </tr>
        </tbody>
      </table>

      <h3>Issue & Risk Report</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Issue & Risk</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Material Delay</td>
            
            <td>
              
              <select
              className=""
              value={selectedStatus}
              onChange={handleStatusChange}
              style={{ color: statusColors[selectedStatus] }} 
            >
              <option value="High" style={{ color: 'red' }}>High</option>
              <option value="Medium" style={{ color: 'blue' }}>Medium</option>
              <option value="Low" style={{ color: 'green' }}>Low</option>
            </select>
            </td>
            
          </tr>
        </tbody>
      </table>

      <h3>Attached File</h3>
      <div className="attached-files">
        <label>
          
        </label>
      </div>
    </div>
  );
};

export default ReportViewScreen;