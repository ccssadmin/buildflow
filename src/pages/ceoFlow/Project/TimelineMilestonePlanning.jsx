import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { profile } from "../../../assets/images";

const TimelineMilestonePlanning = ({ formData, handleMilestoneChange, handleAddColumn, onNextStep, setFormData,createTicket }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { projectId } = useParams();
  const { createProjectMilestone, loading, currentProject } = useProject();
const [localProjectId, setLocalProjectId] = useState(null);

const handleCheckboxChange = (userId) => {
  setSelectedUsers((prevSelected) =>
    prevSelected.includes(userId)
      ? prevSelected.filter((id) => id !== userId)
      : [...prevSelected, userId]
  );
};

const handleTicketSubmission = async () => {
    const projectId = formData.projectId || parseInt(localStorage.getItem("projectId"));
    const createdBy = parseInt(localStorage.getItem("userRoleId"));
  
    for (const empId of selectedUsers) {
      const ticketPayload = {
        projectId,
        ticketType: "milestone",
        assignTo: empId,
        createdBy: createdBy,
      };
  
      try {
        await createTicket(ticketPayload); // Redux async action
        console.log("Ticket created for:", empId);
      } catch (err) {
        console.error("Failed to create ticket for:", empId, err);
      }
    }
  
    Swal.fire({
      icon: "success",
      title: "Tickets Created",
      text: "All tickets successfully submitted.",
      timer: 1500,
      showConfirmButton: false,
    });
  
    setShowModal(false);
  };

  useEffect(() => {
    // On component mount - get project ID from all possible sources
    const getProjectId = () => {
      // First check formData
      if (formData && formData.projectId) {
        console.log("🔍 Found projectId in formData:", formData.projectId);
        setLocalProjectId(formData.projectId);
        return formData.projectId;
      }

      // Then check localStorage as backup
      const storedId = localStorage.getItem("projectId");
      if (storedId) {
        console.log("🔍 Found projectId in localStorage:", storedId);
        setLocalProjectId(parseInt(storedId));

        // Update formData if needed
        if (!formData.projectId) {
          setFormData(prev => ({
            ...prev,
            projectId: parseInt(storedId)
          }));
        }

        return parseInt(storedId);
      }

      console.error("❌ No project ID found anywhere!");
      return null;
    };

    const projectId = getProjectId();

    // Alert if no project ID found
    if (!projectId) {
      Swal.fire({
        icon: "warning",
        title: "Project ID Missing",
        text: "Could not find project ID. Please go back and create the project first.",
      });
    }

  }, []);
  // Progress steps
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

  // Modified function to handle date changes with DatePicker
  const handleDateChange = (id, field, date) => {
    // Convert date to string format if it exists
    const dateString = date ? date.toISOString().split('T')[0] : "";
    
    // Call the original handleMilestoneChange with the formatted date
    handleMilestoneChange(id, field, dateString);
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

  // Helper function to convert string date to Date object for DatePicker
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
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
          if (onNextStep) {
            onNextStep();
          }
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

  return (
    <div className="timeline-milestone-page">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="section-title mb-4">Timeline & Milestone Planning</h2>
          </div>
        </div>
        
        <div className="form-section">
          <table className="tbl mt-4 table table-bordered w-100">
            <thead>
              <tr>
                <th className="text-center text-dark fs-18-500">S.No</th>
                <th className="text-center text-dark fs-18-500">Milestone Name</th>
                <th className="text-center text-dark fs-18-500">Description</th>
                <th className="text-center text-dark fs-18-500">Start Date</th>
                <th className="text-center text-dark fs-18-500">End Date</th>
                <th className="text-center text-dark fs-18-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {formData.milestones.map((milestone) => (
                <tr key={milestone.id}>
                  <td className="text-center text-dark-gray fs-16-500">
                    {milestone.id}
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <Form.Control
                      type="text"
                      className="border-0 shadow-none bg-transparent"
                      value={milestone.name}
                      onChange={(e) => 
                        handleMilestoneChange(milestone.id, "name", e.target.value)
                      }
                      placeholder="Enter milestone name"
                    />
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                  <Form.Control
  type="text"
  className="border-0 shadow-none bg-transparent"
  value={milestone.description}
  onChange={(e) =>
    handleMilestoneChange(milestone.id, "description", e.target.value)
  }
  placeholder="Enter description"
/>

                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div className="date-input-container">
                    <DatePicker
                      selected={parseDate(milestone.startDate)}
                      onChange={(date) => handleDateChange(milestone.id, "startDate", date)}
                      className="form-control border-0 shadow-none bg-transparent w-100"
                      dateFormat="d MMMM yyyy"  // Changed from "yyyy-MM-dd" to "d MMMM yyyy"
                      placeholderText="Select start date"
                    />
                    </div>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div className="date-input-container">
                    <DatePicker
                      selected={parseDate(milestone.endDate)}
                      onChange={(date) => handleDateChange(milestone.id, "endDate", date)}
                      className="form-control border-0 shadow-none bg-transparent"
                      dateFormat="d MMMM yyyy"  // Changed from "yyyy-MM-dd" to "d MMMM yyyy"
                      placeholderText="Select end date"
                      minDate={parseDate(milestone.startDate)}
                    />
                    </div>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <Form.Select
                      className="border-0 shadow-none bg-transparent text-dark"
                      value={milestone.status}
                      onChange={(e) => 
                        handleMilestoneChange(milestone.id, "status", e.target.value)
                      }
                    >
                      <option value="Planned">Planned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end mt-3">
            <Button
              variant="outline-primary"
              onClick={handleAddMilestone}
              className="btn-add-milestone"
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
            className="btn-submit"
            style={{
              backgroundColor: '#FF6F00',
              border: 'none',
              padding: '10px 30px',
              fontSize: '16px',
              color: 'white',
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Milestones ✓"}
          </Button>
        </div>
              <div className="text-end mt-3">
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            disabled={formData.projectManager.length === 0}
          >
            Send To
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Body>
          {formData?.projectManager?.map((pm) => (
          <div key={pm.id} className="d-flex align-items-center mb-3">
            <Form.Check
              type="checkbox"
              className="me-3"
              checked={selectedUsers.includes(pm.id)}
              onChange={() => handleCheckboxChange(pm.id)}
            />
            <img
              src={profile}
              alt={pm.name}
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <p className="mb-0 fs-22-700 text-dark">
              {pm.name}
              <span className="d-block fs-14-400 text-dark-grey">
                Project Manager
              </span>
            </p>
          </div>
        ))}
        
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              variant="primary"
              onClick={handleTicketSubmission}
              disabled={selectedUsers.length === 0}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TimelineMilestonePlanning;