import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";


const boqData = [
  { id: "BOQ00024", title: "BOQ’s for resource", approvedBy: "HR", roleClass: "badge-red", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " },
  { id: "BOQ00025", title: "BOQ’s for materials", approvedBy: "Quantity Surveyor", roleClass: "badge-blue", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ." },
  { id: "BOQ00026", title: "BOQ’s for resource", approvedBy: "HR", roleClass: "badge-red", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ." },
  { id: "BOQ00027", title: "BOQ’s for materials", approvedBy: "Quantity Surveyor", roleClass: "badge-blue", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " },
  { id: "BOQ00028", title: "BOQ’s for resource", approvedBy: "HR", roleClass: "badge-red", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " },
  { id: "BOQ00029", title: "BOQ’s for materials", approvedBy: "Quantity Surveyor", roleClass: "badge-blue", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " },
];

const BOQCard = ({ boq }) => (
  <div className="boq-card">
  <div className="boq-meta">
    <p>ID - {boq.id} </p>
    <p className="date">02:54 pm • 14/05/2024</p>
    </div>
    <h3 className="boq-title">{boq.title}</h3>
    <div className="boq-content">
    <p>Approved by <span className={`badge ${boq.roleClass}`}>{boq.approvedBy}</span></p>
    <p className="boq-content">{boq.content}</p>
    </div>
  </div>
);

const BOQDashboard = () => {
  const [selectedSite, setSelectedSite] = useState("MRM Site");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const sites = ["MRM Site", "ABC Site", "XYZ Site"];

  return (
    <div className="container">
      {/* Navbar */}
      <div className="navbar">
        <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
          {sites.map((site, index) => (
            <option key={index} value={site}>{site}</option>
          ))}
        </select>
        <div className="actions">
          <button className="sort-button">Sort By</button>
          <button className="create-boq-btn">+ Create BOQ</button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters">
        <h2>All BOQ’s</h2>
        <span className="date_Picker" onClick={() => setIsOpen(!isOpen)}>
          {selectedDate ? selectedDate.toLocaleDateString("en-GB") : "Pick a date"} 
          <FaRegCalendarAlt className="calendar-icon" />
        </span>

        {/* DatePicker inside BOQ Card */}
        {isOpen && (
          <DatePicker 
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setIsOpen(false);
            }}
            dateFormat="dd/MM/yyyy"
            inline
          />
        )}
      </div>

      {/* BOQ List */}
      <div className="boq-grid">
        {boqData.map((boq, index) => (
          <BOQCard key={index} boq={boq} />
        ))}
      </div>
    </div>
  );
};

export default BOQDashboard;
