import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const BudgetFinancialAllocation = ({ formData, handleInputChange, formErrors, handleBudgetBreakdownChange, handleAddColumn }) => {
  return (
    <div className="form-section">
      <h2 className="section-title">Budget & Financial Allocation</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-dark fs-26-700">
              Total Project Budget <span className="required">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="totalBudget"
              placeholder="Type amount"
              value={formData.totalBudget}
              onChange={handleInputChange}
              isInvalid={!!formErrors.totalBudget}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.totalBudget}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-dark fs-26-700">Send To</Form.Label>
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
        </Col>
      </Row>
      <div className="budget-breakdown">
        <h3 className="text-dark-gray fs-22-700 mb-0">Budget Breakdown</h3>
        <table
          bordered
          responsive
          className="mt-3 tbl tbl-budget-financial w-100"
        >
          <thead>
            <tr>
              <th className="text-center text-dark fs-18-500">S.No</th>
              <th className="text-center text-dark fs-18-500">
                Expense Category
              </th>
              <th className="text-center text-dark fs-18-500">
                Estimated Cost (₹)
              </th>
              <th className="text-center text-dark fs-18-500">
                Approved Budget (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {formData.budgetBreakdown.map((item) => (
              <tr key={item.id}>
                <td className="text-dark-gray fs-16-500 text-center">
                  {String(item.id).padStart(2, "0")}
                </td>
                <td className="text-dark-gray fs-16-500 text-center">
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={item.category}
                    maxLength={20} // Limit to 20 characters
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "category",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="text-dark-gray fs-16-500 text-center">
                  <Form.Control
                    type="text"
                    value={item.estimatedCost}
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "estimatedCost",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="text-dark-gray fs-16-500 text-center">
                  <Form.Control
                    type="text"
                    value={item.approvedBudget}
                    onChange={(e) =>
                      handleBudgetBreakdownChange(
                        item.id,
                        "approvedBudget",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-column text-end">
          <Button
            className="text-primary bg-transparent border-0 fs-16-500 me-0 ms-auto"
            onClick={handleAddColumn}
          >
            + Add Column
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetFinancialAllocation;