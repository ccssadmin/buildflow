import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { profile } from "../../../assets/images";

const BudgetFinancialAllocation = ({ formData, setFormData, onNext, createProjectBudget, fetchroles, fetchAllEmployees, loading, createTicket }) => {
  const [localProjectId, setLocalProjectId] = useState(null);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [selectedUsers, setSelectedUsers] = useState([]);

  const getRoleNameById = (id) => {
    const role = filteredRoles.find(r => r.roleId === parseInt(id));
    return role?.roleName || null;
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
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
        if (success && data?.employeesByRole && data.employeesByRole[roleName]) {
          const filteredEmployees = data.employeesByRole[roleName];
          console.log("employee", filteredEmployees)
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

    calculateTotalBudget();
  }, []);



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

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "sendTo") {
      const roleName = getRoleNameById(value);
      const { success, data } = await fetchAllEmployees();

      if (success && data?.employeesByRole && data.employeesByRole[roleName]) {
        setEmployees(data.employeesByRole[roleName]);
      } else {
        setEmployees([]);
      }
    }
  };
  
  const handleTicketSubmission = async () => {
    const projectId = formData.projectId || localProjectId || parseInt(localStorage.getItem("projectId"));
    const createdBy = parseInt(localStorage.getItem("userRoleId")); // Replace this with actual CEO empId if available
  
    // if (!projectId || selectedUsers.length === 0) {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Missing Info",
    //     text: "Project ID or Assigned Employee missing.",
    //   });
    //   return;
    // }
  
    for (const empId of selectedUsers) {
      const ticketPayload = {
        projectId,
        ticketType: "budget",
        assignTo: empId,
        createdBy: createdBy,
      };
  
      try {
        await createTicket(ticketPayload); // Redux async action
        console.log("✅ Ticket created for:", empId);
      } catch (err) {
        console.error("❌ Failed to create ticket for:", empId, err);
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
  

  const handleBudgetBreakdownChange = (id, field, value) => {
    if (field === "estimatedCost" || field === "approvedBudget") {
      const numericValue = value.replace(/[^0-9.]/g, '');
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
      const projectId = formData.projectId || localProjectId || parseInt(localStorage.getItem("projectId"));
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
        .filter((item) => item.category.trim() !== "" && (parseFloat(item.estimatedCost) > 0 || parseFloat(item.approvedBudget) > 0))
        .map((item) => ({
          projectBudgetId: 0,
          projectExpenseCategory: item.category.trim(),
          estimatedCost: parseFloat(item.estimatedCost) || 0,
          approvedBudget: parseFloat(item.approvedBudget) || 0,
        }));

      const payload = {
        projectId: parseInt(projectId),
        projectBudgetList: cleanBudgetBreakdown
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

        // After success remove projectId from storage
        localStorage.removeItem("projectId");
        console.log("🧹 Removed projectId from localStorage after success!");

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
      console.error("Error while creating budget:", error);
    }
  };
  

  return (
    <div className="budget-financial-page">
      <h2 className="section-title mb-4">Budget & Financial Allocation</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Total Project Budget <span className="required">*</span></Form.Label>
            <Form.Control
              type="text"
              name="totalBudget"
              value={formData.budgetBreakdown.reduce((sum, item) => sum + (parseFloat(item.approvedBudget) || 0), 0)}
              readOnly
            />

          </Form.Group>
        </div>

        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Send To <span className="required">*</span></Form.Label>
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
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}
                    value={item.category}
                    onChange={(e) => handleBudgetBreakdownChange(item.id, "category", e.target.value)}
                    placeholder="Enter Category"
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}
                    value={item.estimatedCost}
                    onChange={(e) => handleBudgetBreakdownChange(item.id, "estimatedCost", e.target.value)}
                    placeholder="0.00"
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    style={{
                      border: 'none',
                      boxShadow: 'none',
                      backgroundColor: 'transparent',
                    }}
                    value={item.approvedBudget}
                    onChange={(e) => handleBudgetBreakdownChange(item.id, "approvedBudget", e.target.value)}
                    placeholder="0.00"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-end">
          <Button
            variant="outline-primary"
            onClick={handleAddRow}
            style={{
              backgroundColor: '#FF6F00',
              border: 'none',
              color: 'white',
              marginTop: '10px',
              padding: '8px 20px',
              fontSize: '14px',
            }}
          >
            + Add Row
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <Button
          onClick={handleNextClick}
          className="btn btn-primary"
          style={{
            backgroundColor: '#FF6F00',
            border: 'none',
            padding: '10px 30px',
            fontSize: '16px',
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Create Budget ✓"}
        </Button>
      </div>


      <Button className="btn btn-secondary me-3" onClick={async () => {
  const selectedRole = filteredRoles.find(role => role.roleId === parseInt(formData.sendTo));
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

  if (!success || !data?.employeesByRole || !data.employeesByRole[roleName]) {
    Swal.fire({
      icon: "info",
      title: "No Employees",
      text: `No employees found in team "${selectedRole.roleName}".`,
    });
    return;
  }

  setEmployees(data.employeesByRole[roleName]);
  setShowModal(true); // open the modal
}}>
  Send To
</Button>


<Modal show={showModal} className="model-approvel-send" onHide={() => setShowModal(false)} centered>
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
      className={`d-flex justify-content-center ${selectedUsers.length > 0 ? "btn-allow" : "btn-not-allow"}`}
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