
import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const AqsCostEstimationCreate = () => {
  return (
    <div className="cost-estimation">

        <div className="estimation-header">
        <h2>Cost Estimation &gt; <span style={{ color: '#FF6F00'}}>Create CE</span></h2>
      </div>

      <h1>Cost Estimation Files</h1>


      {/* First Row: Project Name, Project Code, Title of CE */}
      <div className="row mb-3 ">
        <div className="col-md-4">
          <label>Project Name</label>
          <input type="text" className="form-control" value=""  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Project Code</label>
          <input type="text" className="form-control" value=""  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Title of CE</label>
          <input type="text" className="form-control" value="" />
        </div>
      </div>

      {/* Second Row: Total Budget, Remaining Budget, Send to Approval */}
      <div className="row mb-3 ">
        <div className="col-md-4">
          <label>Total Budget</label>
          <input type="text" className="form-control" value=""  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Remaining Budget</label>
          <input type="text" className="form-control" value=""  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Send to Approval</label>
          <input type="text" className="form-control" value=""  />
        </div>
      </div>

      {/* Third Row: End Date, Start Date */}
      <div className="row mb-3 date" >
        <div className="col-md-6">
          <label>End Date</label>
          <input type="text" className="form-control " value=""  />
        </div>
        <div className="col-md-6 " style={{ marginLeft :'-225px'}}>
          <label>Start Date</label>
          <input type="text" className="form-control " value=""  />
        </div>
      </div>
    

      {/* Table Section */}
      <table className="table">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Category</th>
            <th>Budgeted (<MdOutlineCurrencyRupee />)</th>
            <th>Spent (<MdOutlineCurrencyRupee />)</th>
            <th>Variance (<MdOutlineCurrencyRupee />)</th>
            <th>Overrun (%)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>02</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>03</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>04</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="add-btn">
        <a>+ Add Column</a>
        </div>
        <div className="actions">
        <button className='savedraft'>Save Draft</button>
        <button className='submit'>Submit</button>
      </div>
      
    </div>
  );
};

export default AqsCostEstimationCreate;