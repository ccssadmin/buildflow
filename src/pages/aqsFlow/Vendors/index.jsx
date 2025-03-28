import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import inTransitIcon from "../../../assets/images/intransit.jpg";

const vendors = [
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", status: "In transit", color: "bg-ss" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", button: "Prize Update", color: "bg-rk" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-sv" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rk-alt" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-ss-alt" },

  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rv" },
  { name: "SS Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-sv-alt" },
  { name: "RK Enterprises", category: "Materials, Labor, and Rental Assets", color: "bg-rV-alt" }
];

const AqsVendor = () => 
  {
    const [selectedSite, setSelectedSite] = useState("MRM Site");

    const sites = ["MRM Site", "Vendor Site", "Customer Site", "Admin Site"];
  return (
    <div className="page-vendor container mt-4">
  <div className="d-flex justify-content-between align-items-center mb-3">
    {/* Dropdown */}
    <select
      className="form-select select-custom"
      value={selectedSite}
      onChange={(e) => setSelectedSite(e.target.value)}
    >
      {sites.map((site, index) => (
        <option key={index} value={site}>{site}</option>
      ))}
    </select>
        <button className="btn btn-sort">
      <i className="bi bi-funnel"></i> Sort By
    </button>
  </div>

      <div className="row">
        {vendors.map((vendor, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <div className="d-flex align-items-center">
              <div className={`badge badge-custom ${vendor.color} rounded-circle me-3 d-flex justify-content-center align-items-center`}>
                    <span>{vendor.name.split(" ")[0].slice(0, 2).toUpperCase()}</span>
              </div>


                <div>
                  <h6 className=" mb-1 text-start">{vendor.name}</h6>
                  <p className="text-muted mb-0" style={{ fontSize: "14px" }}>{vendor.category}</p>
                </div>
                {vendor.status === "In transit" && (
  <span className="badge badge-warning-custom ms-auto d-flex align-items-center">
    <img 
      src={inTransitIcon} 
      alt="In Transit" 
      className="me-1 bright-image" 
    />
    <span className="blur-text">{vendor.status}</span>
  </span>
)}

                
                {vendor.button && (
                  <button className="btn btn-custom-dark btn-sm ms-auto">{vendor.button}</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AqsVendor;