import { Calendar } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { Form, Row, Col, Spinner, Button } from "react-bootstrap";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import Swal from "sweetalert2";

const ProjectBasicDetails = ({ formData, setFormData, onProjectCreated, formErrors, setFormErrors }) => {
  const dateInputRef = useRef(null);
  const completionDateInputRef = useRef(null);
  const { projectTypeSector, fetchProjectTypeSector, createProject } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectCreated, setProjectCreated] = useState(false);

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

  const validateInputs = () => {
    const letterRegex = /[a-zA-Z]/;
    const errors = {};

    if (!formData.projectName?.trim()) errors.projectName = "Project Name is required.";
    if (!formData.projectLocation?.trim()) errors.projectLocation = "Location is required.";
    if (formData.projectLocation && !letterRegex.test(formData.projectLocation)) 
      errors.projectLocation = "Location must contain letters.";
    if (!formData.projectTypeId) errors.projectTypeId = "Project Type must be selected.";
    if (!formData.projectSectorId) errors.projectSectorId = "Project Sector must be selected.";
    if (!formData.projectStartDate) errors.projectStartDate = "Project Start Date is required.";
    if (!formData.expectedCompletionDate) errors.expectedCompletionDate = "Expected Completion Date is required.";
    if (!formData.description?.trim()) errors.description = "Project Description is required.";

    if (setFormErrors) {
      setFormErrors(errors);
    }
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleCreateClick = async () => {
    const isValid = validateInputs();
    if (!isValid) return;
  
    try {
      setSubmitting(true);
  
      const cleanFormData = {
        projectName: formData.projectName.trim(),
        projectLocation: formData.projectLocation.trim(),
        projectTypeId: parseInt(formData.projectTypeId),
        projectSectorId: parseInt(formData.projectSectorId),
        projectStartDate: formData.projectStartDate,
        expectedCompletionDate: formData.expectedCompletionDate,
        description: formData.description.trim(),
      };
  
      const result = await createProject(cleanFormData);
      console.log("💬 API Response:", result);
  
      if (result?.success === true && result?.data?.projectid) {
        // ✅ SUCCESS Case
        const projectId = result.data.projectid;
  
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Project created successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
  
        if (projectId) {
          localStorage.setItem("projectId", projectId); // ✅ Save to localStorage
  
          setFormData((prevFormData) => ({
            ...prevFormData,
            projectId: projectId,
          }));
  
          setProjectCreated(true);
  
          setTimeout(() => {
            if (onProjectCreated) {
              onProjectCreated(projectId);
            }
          }, 300);
        }
      } 
      else {
        // ❌ FAILURE Case
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result?.message || "Failed to create project. Please try again.",
        });
      }
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
      console.error("💥 Create project error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  console.log("Updated formData after creating project:", formData);
  
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
                style={{ color: "#212529" }}
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
                style={{ color: "#212529" }}
                type="text"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={handleInputChange}
                placeholder="Enter location"
                isInvalid={!!formErrors?.projectLocation}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.projectLocation}
              </Form.Control.Feedback>
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
                style={{ color: "#212529" }}
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

          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="text-dark">
                Project Sector <span className="required">*</span>
              </Form.Label>
              <Form.Select
                style={{ color: "#212529" }}
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
              <div className="date-input-container" onClick={handleContainerClick}>
                <Form.Control
                  ref={dateInputRef}
                  type="date"
                  style={{ color: "#212529" }}
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
              <div className="date-input-container" onClick={handleContainerClickCompletionDate}>
                <Form.Control
                  ref={completionDateInputRef}
                  type="date"
                  style={{ color: "#212529" }}
                  name="expectedCompletionDate"
                  value={formData.expectedCompletionDate}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors?.expectedCompletionDate}
                />
                <span className="date-icon">
                  <Calendar size={18} />
                </span>
              </div>
              <Form.Control.Feedback type="invalid">
                {formErrors?.expectedCompletionDate}
              </Form.Control.Feedback>
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
                style={{ color: "#212529" }}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
                isInvalid={!!formErrors?.description}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors?.description}
              </Form.Control.Feedback>
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