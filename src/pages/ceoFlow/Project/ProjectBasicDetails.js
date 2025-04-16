import { Calendar } from "lucide-react";
import React, { useRef } from "react";
import { Form, Row, Col } from "react-bootstrap";

const ProjectBasicDetails = ({ formData, setFormData, formErrors }) => {
  const dateInputRef = useRef(null);
  const completionDateInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Opens the date picker
    }
  };

  const handleContainerClickCompletionDate = () => {
    if (completionDateInputRef.current) {
      completionDateInputRef.current.showPicker(); // Opens the date picker
    }
  };

  return (
    <div className="step-basic-details">
      <h2 className="section-title">Project Basic Details</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Name <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name"
                isInvalid={!!formErrors?.projectName}
              />
              {formErrors?.projectName && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.projectName}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Type <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectType}
              >
                <option value="">Select project type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Industrial">Industrial</option>
              </Form.Select>
              {formErrors?.projectType && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.projectType}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Sector <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectSector"
                value={formData.projectSector}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectSector}
              >
                <option value="">Select project sector</option>
                <option value="Private">Private</option>
                <option value="Government">Government</option>
                <option value="Joint Venture">Joint Venture</option>
              </Form.Select>
              {formErrors?.projectSector && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.projectSector}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Start Date <span className="required">*</span>
              </Form.Label>
              <div className="date-input-container" onClick={handleContainerClick}>
                <Form.Control
                  ref={dateInputRef}
                  type="date"
                  name="projectStartDate"
                  value={formData.projectStartDate}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors?.projectStartDate}
                />
                <span className="date-icon">
                  <Calendar size={18} />
                </span>
              </div>
              {formErrors?.projectStartDate && (
                <Form.Control.Feedback type="invalid">
                  {formErrors.projectStartDate}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">Expected Completion Date</Form.Label>
              <div className="date-input-container" onClick={handleContainerClickCompletionDate}>
                <Form.Control
                  ref={completionDateInputRef}
                  type="date"
                  name="expectedCompletionDate"
                  value={formData.expectedCompletionDate}
                  onChange={handleInputChange}
                />
                <span className="date-icon">
                  <Calendar size={18} />
                </span>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectBasicDetails;