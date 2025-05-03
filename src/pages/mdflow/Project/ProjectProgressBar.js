import React from "react";

const ProjectProgressBar = ({ progress }) => {
  // Normalize string values to 0
  const normalizedProgress =
  progress === "Pending" || 
  progress === "Planned" || 
  progress === "NotApproved" || 
  progress === "OnHold" ? 0 : progress === "Approved"  ? 5 : progress === "InProgress" ? 50 : progress;


  return (
    <div className="progress-container mt-3 mb-2">
      <div className="custom-progress-bar">
        <div className="progress-fill" style={{ width: `${normalizedProgress}%` }} />
        <div className="progress-indicator large" style={{ left: `${normalizedProgress}%` }}>
          {normalizedProgress}%
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressBar;
