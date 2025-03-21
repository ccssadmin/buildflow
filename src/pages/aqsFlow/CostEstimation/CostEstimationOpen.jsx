
import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const AqsCostEstimationOpen = () => {
    
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


   const [formData, setFormData] = useState({
    approvalType: '',
    });

  return (
    <div className="open-ce">
      
      <div className="estimation-header">
        <h2>Cost Estimation &gt; <span style={{ color: '#FF6F00'}}>open CE</span></h2>
      </div>
       
      <div class="header-container">
      <h1>Cost Estimation Files</h1>
      <h3><BiEditAlt />Edit</h3>
      </div>  
      {/* <h1>Cost Estimation Files </h1> <h3><BiEditAlt />Edit</h3> */}


      {/* First Row: Project Name, Project Code, Title of CE */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Project Name</label>
          <input type="text" className="form-control" value="BOQ TITLE"  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Project Code</label>
          <input type="text" className="form-control" value="MRN125405"  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Title of CE</label>
          <input type="text" className="form-control" value="A Block" />
        </div>
      </div>

      {/* Second Row: Total Budget, Remaining Budget, Send to Approval */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label>Total Budget</label>
          <input type="text" className="form-control" value="95,00,000"  />
        </div>
        <div className="col-md-4" style={{ marginLeft :'-25px'}}>
          <label>Remaining Budget</label>
          <input type="text" className="form-control" value="21,00,000"  />
        </div>
        <div className="col-md-4"style={{ marginLeft :'-25px'}}>
          <label>Send to Approval</label>

        
          <select
            className="form-control"
            value={formData.approvalType}
            onChange={(e) => setFormData({ ...formData, approvalType: e.target.value })}
          >
            <option value="Type 1">Murnal</option>
            <option value="Type 2">Ram</option>
            <option value="Type 3">Santhosh</option>
          </select>
          <MdKeyboardArrowDown style={{ size: "50", marginLeft: "340px" , marginTop : "-75px"}}/>
      
        </div>
      </div>

      {/* Third Row: End Date, Start Date */}
      <div className="row mb-3 date" style ={{ marginTop: "-20px"}} >
        <div className="col-md-6">
          <label>End Date</label>
         
          <div className="date-picker-container">
        {/* Custom Input Field */}
        <input
          type="text"
          className="form-control"
          value={selectedDate ? selectedDate.toLocaleDateString() : "" } // Display selected date
          onClick={() => setIsOpen(!isOpen)} // Open date picker on input click
          readOnly // Make the input read-only
        />
        {/* Calendar Icon */}
        <FaRegCalendarAlt
          size={25}
          className="calendar-icon"
          onClick={() => setIsOpen(!isOpen)} // Open date picker on icon click
          style={{ cursor: "pointer", marginLeft: "340px" , marginTop : "-75px" }}
        />
        {/* Date Picker */}
        {isOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date); // Update selected date
              setIsOpen(false); // Close date picker
            }}
            dateFormat="MMMM yyyy" // Customize date format
            showMonthYearPicker // Show only month and year
            inline // Render date picker inline
            className="custom-datepicker"
          />
        )}
      </div>
        </div>
        
        <div className="col-md-6" style={{ marginLeft: "-225px" }}>
      <label>Start Date</label>
      <div className="date-picker-container">
        {/* Custom Input Field */}
        <input
          type="text"
          className="form-control"
          value={selectedDate ? selectedDate.toLocaleDateString() : " "} // Display selected date
          onClick={() => setIsOpen(!isOpen)} // Open date picker on input click
          readOnly // Make the input read-only
        />
        {/* Calendar Icon */}
        <FaRegCalendarAlt
          size={25}
          className="calendar-icon"
          onClick={() => setIsOpen(!isOpen)} // Open date picker on icon click
          style={{ cursor: "pointer", marginLeft: "340px" , marginTop : "-75px"}}
        />
        {/* Date Picker */}
        {isOpen && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date); // Update selected date
              setIsOpen(false); // Close date picker
            }}
            dateFormat="MMMM yyyy" // Customize date format
            showMonthYearPicker // Show only month and year
            inline // Render date picker inline
            className="custom-datepicker"
          />
        )}
      </div>
    
        
        </div>
      </div>
    

      {/* Table Section */}
      <div className="tbl">
        <table>
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
              <td>Materials</td>
              <td>50,00,000</td>
              <td>48,00,000</td>
              <td>-2,00,000</td>
              <td>-4%</td>
              <td>
    <a style={{ color: '#30A335' }}>Within Budget</a>
</td>
              <td><a className="">View Report</a></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Labor</td>
              <td>30,00,000</td>
              <td>32,50,000</td>
              <td>+2,50,000</td>
              <td>+8%</td>
              <td><a style={{ color: '#F1C300' }}>Slight Overrun</a></td>
              <td><a className="">View Report</a></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Subcontractors</td>
              <td>20,00,000</td>
              <td>22,00,000</td>
              <td>+2,00,000</td>
              <td>+10%</td>
              <td>
                <a style={{ color: '#D00416'}}>Exceeds Budget</a>
              </td>
              <td><a className="">View Report</a></td>
            </tr>
            <tr>
              <td>04</td>
              <td>Miscellaneous</td>
              <td>5,00,000</td>
              <td>4,75,000</td>
              <td>-25,000</td>
              <td>-5%</td>
              <td> <a style={{ color: '#30A335' }}>Within Budget</a></td>
              <td><a className="">View Report</a></td>
            </tr>
            <tr style={ {backgroundColor : '#FF6F00'}}>
              <th>Total</th>
              <th>Overall Cost</th>
              <th><MdOutlineCurrencyRupee />1,05,00,000</th>
              <th><MdOutlineCurrencyRupee />1,07,25,000</th>
              <th><MdOutlineCurrencyRupee />2.25,000</th>
              <th>+2.1%</th>
              <th>Pending OS</th>
              <th>Revise</th>
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
    </div>
  );
};

export default AqsCostEstimationOpen;