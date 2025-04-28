import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { profile } from "../../../assets/images";

const BudgetFinancialAllocation = ({
  formData,
  setFormData,
  onNext,
  createProjectBudget,
  fetchroles,
  fetchAllEmployees,
  loading,
  createTicket,
  createNotify
}) => {
  const [localProjectId, setLocalProjectId] = useState(null);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
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

    calculateTotalBudget();
  }, []);

  const getRoleNameById = (id) => {
    const role = filteredRoles.find((r) => r.roleId === parseInt(id));
    return role?.roleName || null;
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  useEffect(() => {
    const getFilteredRoles = async () => {
      try {
        const { success, data } = await fetchroles();
        console.log("Roles fetched in BudgetFinancialAllocation:", data); // Add this log
        if (success && data) {
          const filtered = data.filter(
            (r) => r.roleName === "QS" || r.roleName === "Assistant QS"
          );
          setFilteredRoles(filtered);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    getFilteredRoles();
  }, []);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const { success, data } = await fetchAllEmployees();
        const roleName = getRoleNameById(formData.sendTo);
        if (
          success &&
          data?.employeesByRole &&
          data.employeesByRole[roleName]
        ) {
          const filteredEmployees = data.employeesByRole[roleName];
          console.log("employee", filteredEmployees);
          setEmployees(filteredEmployees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (formData.sendTo) {
      getEmployees();
    }
  }, [formData.sendTo]);
  const handleTicketSubmission = async () => {
    const projectId = formData.projectId || localProjectId || parseInt(localStorage.getItem("projectId"));
    const createdBy = parseInt(localStorage.getItem("userRoleId")); // This is CEO's user id (creator)
  
    for (const empId of selectedUsers) {
      const ticketPayload = {
        projectId,
        ticketType: "budget",
        assignTo: selectedUsers,
        createdBy: createdBy,
      };
  
      try {
        await createTicket(ticketPayload); // First create the ticket
        console.log("✅ Ticket created for:", empId);
  
        // After successful ticket creation, create notification
        const notificationPayload = {
          empId: selectedUsers,                         // Assigned employee
          notificationType: "Ticket Assigned",  // Default message
          sourceEntityId: 0,             // Use projectId as the source entity (or ticket id if available)
          message: "A new budget ticket has been assigned to you.", // Customizable message
        };
  
        await createNotify(notificationPayload); // Create notification
        console.log("🔔 Notification created for:", empId);
  
      } catch (err) {
        console.error("❌ Failed to create ticket or notification for:", empId, err);
      }
    }
  
    Swal.fire({
      icon: "success",
      title: "Tickets and Notifications Created",
      text: "Tickets and notifications successfully submitted.",
      timer: 1500,
      showConfirmButton: false,
    });
  
    setShowModal(false);
  };

  const calculateTotalBudget = () => {
    const totalApprovedBudget = formData.budgetBreakdown.reduce((acc, item) => {
      const approved = parseFloat(item.approvedBudget) || 0;
      return acc + approved;
    }, 0);

    setFormData((prev) => ({
      ...prev,
      totalBudget: totalApprovedBudget,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBudgetBreakdownChange = (id, field, value) => {
    if (field === "estimatedCost" || field === "approvedBudget") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      const parts = numericValue.split(".");
      if (parts.length > 2) return;
      if (parts[1]?.length > 2) return;
      value = numericValue;
    }

    const updatedBreakdown = formData.budgetBreakdown.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    setFormData((prev) => ({
      ...prev,
      budgetBreakdown: updatedBreakdown,
    }));
  };

  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      budgetBreakdown: [
        ...prev.budgetBreakdown,
        {
          id: Date.now(),
          category: "",
          estimatedCost: "",
          approvedBudget: "",
        },
      ],
    }));
  };

  const handleNextClick = async () => {
    try {
      const projectId =
        formData.projectId ||
        localProjectId ||
        parseInt(localStorage.getItem("projectId"));
      console.log("🚀 Using project ID for budget creation:", projectId);

      if (!projectId) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Project ID missing! Please create project first.",
        });
        return;
      }

      const cleanBudgetBreakdown = formData.budgetBreakdown
        .filter(
          (item) =>
            item.category.trim() !== "" &&
            (parseFloat(item.estimatedCost) > 0 ||
              parseFloat(item.approvedBudget) > 0)
        )
        .map((item) => ({
          projectBudgetId: 0,
          projectExpenseCategory: item.category.trim(),
          estimatedCost: parseFloat(item.estimatedCost) || 0,
          approvedBudget: parseFloat(item.approvedBudget) || 0,
        }));

      const payload = {
        projectId: parseInt(projectId),
        projectBudgetList: cleanBudgetBreakdown,
      };

      console.log("📤 Final Budget Payload:", payload);

      const response = await createProjectBudget(payload);
      console.log("📥 Budget API Response:", response);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Budget created successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          onNext();
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.message || "Failed to create budget.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while saving budget.",
      });
      console.error("💥 Error while creating budget:", error);
    }
  };

  return (
    <div className="budget-financial-page">
      <h2 className="section-title mb-4">Budget & Financial Allocation</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <Form.Group>
            <Form.Label>
              Total Project Budget <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="totalBudget"
              value={formData.budgetBreakdown.reduce(
                (sum, item) => sum + (parseFloat(item.approvedBudget) || 0),
                0
              )}
              readOnly
            />
          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>
              Send To <span className="required">*</span>
            </Form.Label>
            <Form.Select
              name="sendTo"
              value={formData.sendTo}
              onChange={handleInputChange}
            >
              <option value="">Select Team</option>
              {filteredRoles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {role.roleName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="budget-breakdown mt-4">
        <h4>Budget Breakdown</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Expense Category</th>
              <th>Estimated Cost (₹)</th>
              <th>Approved Budget (₹)</th>
            </tr>
          </thead>
          <tbody>
            {formData.budgetBreakdown.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    style={{
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    }}
                    value={item.category}
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "category",
                        e.target.value
                      )
                    }
                    placeholder="Enter Category"
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    style={{
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    }}
                    value={item.estimatedCost}
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "estimatedCost",
                        e.target.value
                      )
                    }
                    placeholder="0.00"
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    style={{
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    }}
                    value={item.approvedBudget}
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "approvedBudget",
                        e.target.value
                      )
                    }
                    placeholder="0.00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-end">
          <Button
            onClick={handleAddRow}
            className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
          >
            + Add Row
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        {/* <Button
          className="btn btn-secondary me-3"
          onClick={async () => {
            const selectedRole = filteredRoles.find(
              (role) => role.roleId === parseInt(formData.sendTo)
            );
            if (!selectedRole) {
              Swal.fire({
                icon: "warning",
                title: "Select Team First",
                text: "Please select a team from the dropdown before choosing an employee.",
              });
              return;
            }

            const roleName = getRoleNameById(formData.sendTo);
            const { success, data } = await fetchAllEmployees();

            if (
              !success ||
              !data?.employeesByRole ||
              !data.employeesByRole[roleName]
            ) {
              Swal.fire({
                icon: "info",
                title: "No Employees",
                text: `No employees found in team "${selectedRole.roleName}".`,
              });
              return;
            }

            setEmployees(data.employeesByRole[roleName]);
            setShowModal(true); // open the modal
          }}
        >
          Send To
        </Button> */}
        <Button className="btn-primary btn fs-14-600 bg-transparent text-primary border-0 border-radius-2"
          onClick={async () => {
            const selectedRole = filteredRoles.find(
              (role) => role.roleId === parseInt(formData.sendTo)
            );
            if (!selectedRole) {
              Swal.fire({
                icon: "warning",
                title: "Select Team First",
                text: "Please select a team from the dropdown before choosing an employee.",
              });
              return;
            }

            const roleName = getRoleNameById(formData.sendTo);
            const { success, data } = await fetchAllEmployees();

            if (
              !success ||
              !data?.employeesByRole ||
              !data.employeesByRole[roleName]
            ) {
              Swal.fire({
                icon: "info",
                title: "No Employees",
                text: `No employees found in team "${selectedRole.roleName}".`,
              });
              return;
            }

            setEmployees(data.employeesByRole[roleName]);
            setShowModal(true); // open the modal
          }}
        >
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
          onClick={handleNextClick}
          className="btn-primary btn fs-14-600 bg-primary border-0 border-radius-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Next >"}
        </Button>
      </div>
      <Modal
        show={showModal}
        className="model-approvel-send"
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Body>
          {employees.map((user) => (
            <div key={user.empId} className="d-flex align-items-center mb-3">
              <Form.Check
                type="checkbox"
                className="me-3"
                checked={selectedUsers.includes(user.empId)}
                onChange={() => handleCheckboxChange(user.empId)}
              />
              <img
                src={profile}
                alt={`${user.employeeName}'s profile`}
                className="rounded-circle me-3"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <p className="mb-0 fs-22-700 text-dark">
                {user.employeeName}
                <span className="d-block fs-14-400 text-dark-grey">
                  {user.role}
                </span>
              </p>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className={`d-flex justify-content-center ${
              selectedUsers.length > 0 ? "btn-allow" : "btn-not-allow"
            }`}
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

export default BudgetFinancialAllocation;
