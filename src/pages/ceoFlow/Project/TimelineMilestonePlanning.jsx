import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProject } from "../../../hooks/Ceo/useCeoProject";
import TimelineMilestonePlanning from './TimelineMilestonePlanning';

const TimelineContainer = () => {
  const { createProjectMilestone, loading, currentProject } = useProject();
  const [formData, setFormData] = useState({
    projectId: null,
    milestones: [
      {
        id: 1,
        name: "Initial Planning",
        description: "Project kickoff and initial planning phase",
        startDate: "",
        endDate: "",
        status: "Planned"
      }
    ]
  });

  useEffect(() => {
    // Get project ID from localStorage or current project
    const storedProjectId = localStorage.getItem("projectId");
    const projectId = storedProjectId || (currentProject?.projectId || currentProject?.data?.projectid);
    
    if (projectId) {
      setFormData(prev => ({
        ...prev,
        projectId
      }));
    }
  }, [currentProject]);

  const handleMilestoneChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(milestone => 
        milestone.id === id ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const handleAddColumn = () => {
    const newId = formData.milestones.length > 0 
      ? Math.max(...formData.milestones.map(m => m.id)) + 1 
      : 1;
      
    setFormData(prev => ({
      ...prev,
      milestones: [
        ...prev.milestones, 
        {
          id: newId,
          name: `Milestone ${newId}`,
          description: "",
          startDate: "",
          endDate: "",
          status: "Planned"
        }
      ]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.projectId) {
      Swal.fire({
        icon: "error",
        title: "No Project Selected",
        text: "Please create or select a project first."
      });
      return;
    }

    // Validate required fields
    const invalidMilestones = formData.milestones.filter(
      m => !m.name || !m.startDate || !m.endDate
    );

    if (invalidMilestones.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please fill in all required fields (name, start date, end date) for all milestones."
      });
      return;
    }

    // Format the milestone data according to API requirements
    const formattedMilestones = formData.milestones.map(milestone => ({
      milestoneId: 0,
      milestoneName: milestone.name,
      milestoneDescription: milestone.description,
      milestoneStartDate: milestone.startDate,
      milestoneEndDate: milestone.endDate,
      milestoneStatus: milestone.status
    }));
    
    // Create the DTO structure the API expects
    const milestoneDto = {
      projectId: parseInt(formData.projectId),
      milestoneList: formattedMilestones
    };
    
    console.log("Submitting milestones:", milestoneDto);
    
    try {
      const response = await createProjectMilestone(formData.projectId, milestoneDto);
      
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Project milestones have been saved successfully.",
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        throw new Error(response.message || "Failed to save milestones");
      }
    } catch (error) {
      console.error("Error saving milestones:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong. Please try again."
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-3">Timeline & Milestone Planning</h4>
        </div>
      </div>
      
      <TimelineMilestonePlanning
        formData={formData}
        handleMilestoneChange={handleMilestoneChange}
        handleAddColumn={handleAddColumn}
      />

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Milestones"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimelineContainer;