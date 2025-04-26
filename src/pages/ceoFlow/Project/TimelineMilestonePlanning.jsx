import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { profile } from "../../../assets/images";

const TimelineMilestonePlanning = ({
  formData,
  handleMilestoneChange,
  handleAddColumn,
  onNextStep,
  setFormData,
  createTicket,
}) => {
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
    const projectId =
      formData.projectId || parseInt(localStorage.getItem("projectId"));
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
          setFormData((prev) => ({
            ...prev,
            projectId: parseInt(storedId),
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
    const resolvedProjectId =
      projectId ||
      storedProjectId ||
      currentProject?.projectId ||
      currentProject?.data?.projectid;

    if (resolvedProjectId) {
      setFormData((prev) => ({
        ...prev,
        projectId: resolvedProjectId,
      }));
    } else {
      console.error("No project ID found in timeline component!");
    }
  }, [projectId, currentProject]);

  const handleAddMilestone = () => {
    const newId =
      formData.milestones.length > 0
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
    const dateString = date ? date.toISOString().split("T")[0] : "";

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
      (m) =>
        m.startDate && m.endDate && new Date(m.endDate) < new Date(m.startDate)
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
      milestoneDescription: milestone.description
        ? milestone.description.trim()
        : "",
      milestoneStartDate: formatDateString(milestone.startDate),
      milestoneEndDate: formatDateString(milestone.endDate),
      Status: milestone.status || "Planned",
    }));

    // Fixed payload structure according to API requirements
    const payload = {
      projectId: parseInt(formData.projectId, 10),
      milestoneList: milestoneList, // This could be an empty array if no milestones have data
    };

    console.log("Payload being sent to API:", payload);

    try {
      const response = await createProjectMilestone(payload);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text:
            milestoneList.length > 0
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
            <h2 className="section-title mb-4">
              Timeline & Milestone Planning
            </h2>
          </div>
        </div>

        <div className="form-section">
          <table className="tbl mt-4 table table-bordered w-100">
            <thead>
              <tr>
                <th className="text-center text-dark fs-18-500">S.No</th>
                <th className="text-center text-dark fs-18-500">
                  Milestone Name
                </th>
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
                        handleMilestoneChange(
                          milestone.id,
                          "name",
                          e.target.value
                        )
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
                        handleMilestoneChange(
                          milestone.id,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Enter description"
                    />
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div className="date-input-container">
                      <DatePicker
                        selected={parseDate(milestone.startDate)}
                        onChange={(date) =>
                          handleDateChange(milestone.id, "startDate", date)
                        }
                        className="form-control border-0 shadow-none bg-transparent w-100"
                        dateFormat="d MMMM yyyy" // Changed from "yyyy-MM-dd" to "d MMMM yyyy"
                        placeholderText="Select start date"
                      />
                    </div>
                  </td>
                  <td className="text-center text-dark-gray fs-16-500">
                    <div className="date-input-container">
                      <DatePicker
                        selected={parseDate(milestone.endDate)}
                        onChange={(date) =>
                          handleDateChange(milestone.id, "endDate", date)
                        }
                        className="form-control border-0 shadow-none bg-transparent"
                        dateFormat="d MMMM yyyy" // Changed from "yyyy-MM-dd" to "d MMMM yyyy"
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
                        handleMilestoneChange(
                          milestone.id,
                          "status",
                          e.target.value
                        )
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
            {/* <Button
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
            </Button> */}
            <Button
              onClick={handleAddMilestone}
              className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
            >
              + Add Row
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          {/* <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            disabled={formData.projectManager.length === 0}
          >
            Send To
          </Button> */}
          <Button 
          onClick={() => setShowModal(true)}
          disabled={formData.projectManager.length === 0}
          className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2">
            <svg
              className="me-2"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3.33464C9.22645 3.33464 8.48459 3.64193 7.93761 4.18891C7.39062 4.73589 7.08333 5.47775 7.08333 6.2513C7.08333 7.02485 7.39062 7.76672 7.93761 8.3137C8.48459 8.86068 9.22645 9.16797 10 9.16797C10.7735 9.16797 11.5154 8.86068 12.0624 8.3137C12.6094 7.76672 12.9167 7.02485 12.9167 6.2513C12.9167 5.47775 12.6094 4.73589 12.0624 4.18891C11.5154 3.64193 10.7735 3.33464 10 3.33464ZM5.41667 6.2513C5.41667 5.03573 5.89955 3.86994 6.75909 3.0104C7.61864 2.15085 8.78442 1.66797 10 1.66797C11.2156 1.66797 12.3814 2.15085 13.2409 3.0104C14.1004 3.86994 14.5833 5.03573 14.5833 6.2513C14.5833 7.46688 14.1004 8.63267 13.2409 9.49221C12.3814 10.3518 11.2156 10.8346 10 10.8346C8.78442 10.8346 7.61864 10.3518 6.75909 9.49221C5.89955 8.63267 5.41667 7.46688 5.41667 6.2513ZM2.5 15.8346C2.5 14.7296 2.93899 13.6698 3.72039 12.8884C4.50179 12.107 5.5616 11.668 6.66667 11.668H13.3333C14.4384 11.668 15.4982 12.107 16.2796 12.8884C17.061 13.6698 17.5 14.7296 17.5 15.8346V18.3346H2.5V15.8346ZM6.66667 13.3346C6.00363 13.3346 5.36774 13.598 4.8989 14.0669C4.43006 14.5357 4.16667 15.1716 4.16667 15.8346V16.668H15.8333V15.8346C15.8333 15.1716 15.5699 14.5357 15.1011 14.0669C14.6323 13.598 13.9964 13.3346 13.3333 13.3346H6.66667Z"
                fill="#FF6F00"
              />
            </svg>
            Send To
          </Button>
          <Button
            className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Next >"}
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
              className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
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
