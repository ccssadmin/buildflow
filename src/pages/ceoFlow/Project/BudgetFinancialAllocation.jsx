import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const BudgetFinancialAllocation = ({ formData, setFormData, onNext, createProjectBudget, loading }) => {

  useEffect(() => {
    calculateTotalBudget();
  }, [formData.budgetBreakdown]);

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
      if (!formData.projectId) {
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
        category: item.category.trim(),
        estimatedCost: parseFloat(item.estimatedCost) || 0,
        approvedBudget: parseFloat(item.approvedBudget) || 0,
      }));

    if (cleanBudgetBreakdown.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter at least one valid budget breakdown item.",
      });
      return;
    }

    const payload = {
      // Use the numeric project ID directly, not the entire response object
      projectId: formData.projectId,
      totalBudget: formData.totalBudget,
      sendTo: formData.sendTo,
      budgetBreakdown: cleanBudgetBreakdown,
    };

    console.log("Payload sending to API:", payload);

    const response = await createProjectBudget({ dto: payload });

    if (response.success) {
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
        text: response.message || "Failed to create budget.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong.",
    });
    console.error("Error occurred:", error);
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
              value={formData.totalBudget}
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
              <option value="finance">Finance Team</option>
              <option value="management">Management Team</option>
              <option value="operations">Operations Team</option>
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
    </div>
  );
};

export default BudgetFinancialAllocation;
