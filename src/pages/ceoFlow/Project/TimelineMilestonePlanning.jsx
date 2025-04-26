import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { profile } from "../../../assets/images";


const TimelineMilestonePlanning = ({ formData, handleMilestoneChange, handleAddColumn, fetchAllEmployees, employees,createTicket }) => {
  const [showModal, setShowModal] = useState(false);
const [selectedUsers, setSelectedUsers] = useState([]);

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
  return (
    <div className="form-section">
      <h2 className="section-title">Timeline & Milestone Planning</h2>
      <table bordered responsive className="tbl mt-4 w-100">
        <thead>
          <tr>
            <th className="text-center text-dark fs-18-500">Milestone</th>
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
                {milestone.name}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                {milestone.description}
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <div className="date-input-container">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={milestone.startDate}
                    onChange={(e) =>
                      handleMilestoneChange(
                        milestone.id,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <div className="date-input-container">
                  <Form.Control
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={milestone.endDate}
                    onChange={(e) =>
                      handleMilestoneChange(
                        milestone.id,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </div>
              </td>
              <td className="text-center text-dark-gray fs-16-500">
                <Form.Select
                  className="border-0 text-dark"
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
                  <option value="InProgress">In Progress</option>
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
    variant="primary"
    onClick={() => setShowModal(true)}
    disabled={formData.projectManager.length === 0}
  >
    Send To
  </Button>
</div>
      <div className="add-column">
        <Button
          className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          onClick={handleAddColumn}
        >
          + Add Column
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Body>
    {formData.projectManager.map((pm) => (
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
  );
};

export default TimelineContainer;