import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useParams } from "react-router-dom";

const TimelineContainer = () => {
  const { projectId } = useParams();
  const { createProjectMilestone, loading, currentProject } = useProject();
  const [formData, setFormData] = useState({
    projectId: null,
    milestones: [
      {
        id: 1,
        name: "Foundation Work",
        description: "Complete excavation and concrete laying",
        startDate: "",
        endDate: "",
        status: "Planned"
      },
    ]
  });

  const steps = [
    "Project Basic Details",
    "Budget & Financial Allocation",
    "Project Team & Stakeholder Assignment",
    "Timeline & Milestone Planning",
    "Risk & Compliance Assessment",
  ];
  const [currentStep, setCurrentStep] = useState(3); // Timeline is step 3

  useEffect(() => {
    const storedProjectId = localStorage.getItem("projectId");
    const resolvedProjectId = projectId || storedProjectId || currentProject?.projectId || currentProject?.data?.projectid;

    if (resolvedProjectId) {
      setFormData((prev) => ({
        ...prev,
        projectId: resolvedProjectId
      }));
    } else {
      console.error("No project ID found in timeline component!");
    }
  }, [projectId, currentProject]);

  const handleMilestoneChange = (id, field, value) => {
    // If changing dates, validate them
    if (field === 'startDate' || field === 'endDate') {
      const milestone = formData.milestones.find(m => m.id === id);
      const startDate = field === 'startDate' ? value : milestone.startDate;
      const endDate = field === 'endDate' ? value : milestone.endDate;
      
      // If both dates exist, validate that end date is not before start date
      if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Date Range",
          text: "End date cannot be earlier than start date.",
        });
        return; // Don't update state with invalid dates
      }
    }
  
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      ),
    }));
  };

  const handleAddMilestone = () => {
    const newId = formData.milestones.length > 0 
      ? Math.max(...formData.milestones.map((m) => m.id)) + 1 
      : 1;

    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: newId,
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          status: "Planned",
        },
      ],
    }));
  };

  // Helper function to format dates
  const formatDateString = (dateStr) => {
    if (!dateStr) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error("Date parsing error:", e);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!formData.projectId) {
      Swal.fire({
        icon: "error",
        title: "No Project Selected",
        text: "Please create or select a project first.",
      });
      return;
    }
  
    // Only validate milestones that have data entered
    // Skip empty milestones instead of showing warnings
    const milestonesToSubmit = formData.milestones.filter(
      (m) => m.name.trim() || m.startDate || m.endDate || m.description.trim()
    );
  
    // Check if any milestone with data has missing required fields
    const invalidMilestones = milestonesToSubmit.filter(
      (m) => !m.name.trim() || !m.startDate || !m.endDate
    );
  
    if (invalidMilestones.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: `Please ensure all milestones have a name, start date, and end date. ${
          invalidMilestones.length
        } milestone(s) are incomplete.`,
      });
      return;
    }
  
    // Validate date ranges for milestones that have both dates
    const invalidDateRanges = milestonesToSubmit.filter(
      (m) => m.startDate && m.endDate && new Date(m.endDate) < new Date(m.startDate)
    );
  
    if (invalidDateRanges.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Date Ranges",
        text: `${invalidDateRanges.length} milestone(s) have end dates that are earlier than their start dates. Please correct these issues.`,
      });
      return;
    }
  
    // Prepare the milestone list with only valid entries
    const milestoneList = milestonesToSubmit.map((milestone) => ({
      milestoneId: 0, // Default ID as 0 for new milestones
      milestoneName: milestone.name.trim(),
      milestoneDescription: milestone.description ? milestone.description.trim() : "",
      milestoneStartDate: formatDateString(milestone.startDate),
      milestoneEndDate: formatDateString(milestone.endDate),
      Status: milestone.status || "Planned"
    }));
  
    // Fixed payload structure according to API requirements
    const payload = {
      projectId: parseInt(formData.projectId, 10),
      milestoneList: milestoneList  // This could be an empty array if no milestones have data
    };
  
    console.log("Payload being sent to API:", payload);
  
    try {
      const response = await createProjectMilestone(payload);
  
      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: milestoneList.length > 0 
            ? "Project milestones have been saved successfully." 
            : "Project has been saved successfully with no milestones.",
          timer: 1500,
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          setCurrentStep(4); // Proceed to the next step
        }, 1600);
      } else {
        throw new Error(response?.message || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="progress-container">
        <div className="breadcrumb-container pb-3 d-flex align-items-center">
          <span className="breadcrumb-item fs-16-500 text-dark-gray">
            Projects
          </span>
          <svg
            className="mx-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 4.5L9.5 8L6 11.5" stroke="#606060" />
          </svg>
          <span className="breadcrumb-item fs-16-500 text-primary">
            Creation
          </span>
        </div>
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div
                className={`step-circle ${index <= currentStep ? "active" : ""}`}
              >
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.4" clipPath="url(#clip0_1809_21197)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.0611 0.439453L7.00558 1.7456V12.5731H7.93582V10.2971L7.72054 10.3175C7.67833 10.3214 7.63631 10.3083 7.6037 10.2813C7.57108 10.2542 7.55053 10.2153 7.54655 10.1731C7.54257 10.1309 7.55547 10.0888 7.58244 10.0561C7.60941 10.0234 7.64825 10.0027 7.69044 9.9986L9.34612 9.84102C9.38811 9.83759 9.42976 9.85085 9.46204 9.87791C9.49433 9.90497 9.51466 9.94366 9.51862 9.9856C9.52259 10.0275 9.50987 10.0694 9.48322 10.102C9.45657 10.1346 9.41814 10.1554 9.37625 10.1599L9.13087 10.1833V12.5731H13.1166V1.7456L10.0611 0.439453ZM8.20421 8.83817L7.62666 8.89345V7.77751L8.20421 7.68844V8.83817ZM8.2044 7.02544L7.62669 7.13398V6.01536L8.2044 5.87296V7.02544ZM8.2044 5.21181L7.62669 5.37362V4.255L8.2044 4.05933V5.21181ZM8.2044 3.39724L7.62669 3.61147V2.56643L8.20459 2.31871L8.2044 3.39724ZM9.44 8.72044L8.78919 8.78283V7.59697L9.44 7.49644V8.72044ZM9.44 6.79177L8.78919 6.91426V5.72934L9.44 5.56873V6.79174V6.79177ZM9.44 4.86405L8.78919 5.0466V3.86074L9.44 3.64005V4.86405ZM9.44 2.93634L8.78919 3.17894L8.789 2.06832L9.43997 1.78902V2.93634H9.44ZM10.9857 10.6716C10.9857 10.7142 10.9688 10.7551 10.9386 10.7853C10.9085 10.8154 10.8676 10.8323 10.825 10.8323C10.7824 10.8323 10.7415 10.8154 10.7113 10.7853C10.6812 10.7551 10.6643 10.7142 10.6643 10.6716V1.84321C10.6643 1.80059 10.6812 1.75971 10.7113 1.72957C10.7415 1.69943 10.7824 1.6825 10.825 1.6825C10.8676 1.6825 10.9085 1.69943 10.9386 1.72957C10.9688 1.75971 10.9857 1.80059 10.9857 1.84321V10.6717V10.6716ZM11.7496 10.6716C11.7496 10.7142 11.7326 10.7551 11.7025 10.7853C11.6724 10.8154 11.6315 10.8323 11.5889 10.8323C11.5462 10.8323 11.5054 10.8154 11.4752 10.7853C11.4451 10.7551 11.4281 10.7142 11.4281 10.6716V2.16976C11.4281 2.12713 11.4451 2.08625 11.4752 2.05611C11.5054 2.02597 11.5462 2.00904 11.5889 2.00904C11.6315 2.00904 11.6724 2.02597 11.7025 2.05611C11.7326 2.08625 11.7496 2.12713 11.7496 2.16976V10.6717V10.6716ZM12.5134 10.6716C12.5134 10.7142 12.4965 10.7551 12.4664 10.7853C12.4362 10.8154 12.3954 10.8323 12.3527 10.8323C12.3101 10.8323 12.2692 10.8154 12.2391 10.7853C12.209 10.7551 12.192 10.7142 12.192 10.6716V2.4963C12.192 2.45368 12.209 2.4128 12.2391 2.38266C12.2692 2.35252 12.3101 2.33559 12.3527 2.33559C12.3954 2.33559 12.4362 2.35252 12.4664 2.38266C12.4965 2.4128 12.5134 2.45368 12.5134 2.4963V10.6717V10.6716ZM5.42613 3.5939L2.24437 4.95402V12.5731H3.23774V10.806L3.02246 10.8265C3.00137 10.8287 2.98004 10.8268 2.9597 10.8208C2.93936 10.8147 2.92043 10.8047 2.90399 10.7913C2.88756 10.7779 2.87395 10.7613 2.86397 10.7426C2.85398 10.7239 2.84781 10.7034 2.84582 10.6823C2.84382 10.6611 2.84604 10.6398 2.85235 10.6196C2.85866 10.5993 2.86893 10.5805 2.88256 10.5643C2.89619 10.548 2.91292 10.5346 2.93177 10.5249C2.95062 10.5152 2.97121 10.5093 2.99236 10.5076L4.64804 10.35C4.69033 10.346 4.73248 10.359 4.76521 10.386C4.79794 10.4131 4.81857 10.4521 4.82257 10.4944C4.82657 10.5367 4.8136 10.5788 4.78652 10.6116C4.75944 10.6443 4.72046 10.6649 4.67817 10.6689L4.43279 10.6923V12.5731H6.68418V4.13168L5.42613 3.5939ZM3.39425 9.16193L2.92419 9.22629V8.32147L3.39425 8.22491V9.16193ZM3.39425 7.68708L2.92419 7.80269V6.89784L3.39425 6.75006V7.68708ZM3.39441 6.21167L2.92421 6.37793V5.53284L3.39457 5.33473L3.39441 6.21167ZM4.41642 9.02079L3.87505 9.09539V8.12636L4.41642 8.01464V9.02079ZM4.41642 7.43468L3.87505 7.56804V6.59843L4.41642 6.42735V7.43468ZM4.41642 5.84797L3.87489 6.04072V5.13269L4.41642 4.90321V5.84797ZM1.13281 12.8945H14.2281V13.5645H1.13281V12.8945Z"
                      fill="#676767"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1809_21197">
                      <rect
                        width="13.7143"
                        height="13.7143"
                        fill="white"
                        transform="translate(0.824219 0.142578)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div
                className={`step-line ${index < currentStep ? "active" : ""} ${
                  index === steps.length - 1 ? "hidden" : ""
                }`}
              ></div>
              <div
                className={`step-label ${index <= currentStep ? "active" : ""}`}
              >
                Step {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMilestoneRow = (milestone) => {
    return (
      <tr key={milestone.id}>
        <td>{milestone.id}</td>
        <td>
          <input
            type="text"
            className="form-control"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            value={milestone.name}
            onChange={(e) => handleMilestoneChange(milestone.id, 'name', e.target.value)}
            placeholder="Enter milestone name"
          />
        </td>
        <td>
          <textarea
            className="form-control"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
              resize: 'none',
              minHeight: '60px'
            }}
            value={milestone.description}
            onChange={(e) => handleMilestoneChange(milestone.id, 'description', e.target.value)}
            placeholder="Enter description"
            rows="2"
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            value={milestone.startDate}
            onChange={(e) => handleMilestoneChange(milestone.id, 'startDate', e.target.value)}
          />
        </td>
        <td>
          <input
            type="date"
            className="form-control"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            value={milestone.endDate}
            onChange={(e) => handleMilestoneChange(milestone.id, 'endDate', e.target.value)}
          />
        </td>
        <td>
          <select
            className="form-control"
            style={{
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
            value={milestone.status}
            onChange={(e) => handleMilestoneChange(milestone.id, 'status', e.target.value)}
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
          </select>
        </td>
      </tr>
    );
  };

  return (
    <div className="timeline-milestone-page">
      {renderProgressBar()}
      
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="section-title mb-4">Timeline & Milestone Planning</h2>
          </div>
        </div>
        
        <div className="milestone-table mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Milestone Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.milestones.map(renderMilestoneRow)}
            </tbody>
          </table>

          <div className="text-end">
            <Button
              variant="outline-primary"
              onClick={handleAddMilestone}
              style={{
                backgroundColor: '#FF6F00',
                border: 'none',
                color: 'white',
                marginTop: '10px',
                padding: '8px 20px',
                fontSize: '14px',
              }}
            >
              + Add Milestone
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              backgroundColor: '#FF6F00',
              border: 'none',
              padding: '10px 30px',
              fontSize: '16px',
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Milestones ✓"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineContainer;