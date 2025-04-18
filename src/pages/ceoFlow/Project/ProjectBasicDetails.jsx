import { Calendar } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { Form, Row, Col, Spinner, Button } from "react-bootstrap";
import { useProject } from "../../../hooks/Ceo/useCeoProject";

const ProjectBasicDetails = ({ formErrors, formData, setFormData, onProjectCreated }) => {
  const dateInputRef = useRef(null);
  const completionDateInputRef = useRef(null);
  const { projectTypeSector, fetchProjectTypeSector, createProject } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectCreated, setProjectCreated] = useState(false);

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchProjectTypeSector();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleContainerClickCompletionDate = () => {
    if (completionDateInputRef.current) {
      completionDateInputRef.current.showPicker();
    }
  };

  const handleCreateClick = async () => {
    try {
      setSubmitting(true);

      // Clean up form data
      const cleanFormData = {
        projectName: formData.projectName,
        projectLocation: formData.projectLocation,
        projectTypeId: parseInt(formData.projectTypeId),
        projectSectorId: parseInt(formData.projectSectorId),
        projectStartDate: formData.projectStartDate,
        expectedCompletionDate: formData.expectedCompletionDate,
        description: formData.description,
      };

      // Check if all required fields are filled
      if (!cleanFormData.projectName || !cleanFormData.projectLocation || 
          !cleanFormData.projectTypeId || !cleanFormData.projectSectorId || 
          !cleanFormData.projectStartDate || !cleanFormData.expectedCompletionDate || 
          !cleanFormData.description) {
        alert("All required fields must be filled out.");
        return;
      }

      // Use createProject function to create the project
      const result = await createProject(cleanFormData);

      if (result.success) {
        console.log("Project created successfully:", result.data);
        // alert("Project created successfully!");
        setProjectCreated(true);
        
        // Notify parent component that project was created successfully
        if (onProjectCreated) {
          onProjectCreated(result.data);
        }
      } else {
        console.error("Error creating project:", result.error);
        // alert("Failed to create project. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
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
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">Location</Form.Label>
              <Form.Control
                type="text"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Project Type */}
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Type <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectTypeId"
                value={formData.projectTypeId}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectTypeId}
              >
                <option value="">Select project type</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  projectTypeSector?.projectTypes?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.projectTypeName}
                    </option>
                  ))
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectTypeId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Project Sector */}
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Sector <span className="required">*</span>
              </Form.Label>
              <Form.Select
                name="projectSectorId"
                value={formData.projectSectorId}
                onChange={handleInputChange}
                isInvalid={!!formErrors?.projectSectorId}
              >
                <option value="">Select project sector</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  projectTypeSector?.projectSectors?.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.projectSectorName}
                    </option>
                  ))
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectSectorId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Start Date <span className="required">*</span>
              </Form.Label>
              <div
                className="date-input-container"
                onClick={handleContainerClick}
              >
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
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectStartDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Expected Completion Date
              </Form.Label>
              <div
                className="date-input-container"
                onClick={handleContainerClickCompletionDate}
              >
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

        <Row className="d-flex justify-content-end align-items-end" style={{ minHeight: '100px' }}>
          <Col xs="auto">
            <Button
              variant="primary"
              style={{ backgroundColor: '#FF6F00', border: 'none' }}
              onClick={handleCreateClick}
              disabled={submitting || projectCreated}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" /> <span>Saving...</span>
                </>
              ) : projectCreated ? (
                "Created ✓"
              ) : (
                "Create Project"
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectBasicDetails;