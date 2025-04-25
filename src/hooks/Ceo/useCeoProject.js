import { useDispatch, useSelector } from "react-redux";
import { createCeoProjectAction, createProjectBudgetAction, createProjectFinanceApprovedAction, createProjectMilestoneAction, createProjectTeamAction, getProjectTypeSectorAction } from "../../store/actions/Ceo/ceoprojectAction";
import {
  selectAllProjects,
  selectCurrentProject,
  selectProjectError,
  selectProjectLoading,
  selectProjectSuccess,
  selectProjectTypeSector,
} from "../../store/selector/ceo/ceoProjectSelector";
import { resetProjectState, setCurrentProject } from "../../store/slice/Ceo/ceoprojectSlicer";
import { useEffect, useState } from "react";
import axios from "axios";

export const useProject = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectProjectLoading);
  const error = useSelector(selectProjectError);
  const success = useSelector(selectProjectSuccess);
  const projectTypeSectorData = useSelector(selectProjectTypeSector);

  // Structured project type and sector data
  const [projectTypeSector, setProjectTypeSector] = useState({
    projectTypes: [],
    projectSectors: [],
  });

  // Update local state when Redux state changes
  useEffect(() => {
    if (projectTypeSectorData) {
      setProjectTypeSector({
        projectTypes: projectTypeSectorData.projectTypes || [],
        projectSectors: projectTypeSectorData.projectSectors || []
      });
    }
  }, [projectTypeSectorData]);


  const fetchProjectTypeSector = async () => {
    try {
      await dispatch(getProjectTypeSectorAction()).unwrap();
    } catch (error) {
      console.error("Failed to fetch project type/sector:", error);
    }
  };

  const resetProject = () => {
    dispatch(resetProjectState());
  };

  const updateCurrentProject = (project) => {
    dispatch(setCurrentProject(project));
  };

  const createProject = async (projectData) => {
    try {
      const result = await dispatch(createCeoProjectAction(projectData)).unwrap();
      return result; // ✅ Just return directly
    } catch (error) {
      console.error("Failed to create project:", error);
      return { success: false, error };
    }
  };
  
  
  const createProjectBudget = async (ProjectBudgetData) => {
    try {
      const result = await dispatch(createProjectBudgetAction(ProjectBudgetData)).unwrap();
      return result;
    } catch (error) {
      console.error("Failed to create project budget:", error);
      return { success: false, error };
    }
  };

  const createProjectteams = async (data) => {
    try {
      const res = await axios.post(`/api/project/upsertProjectTeam`, data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("createProjectteams error:", err);
      return { success: false, message: err?.response?.data?.message || "Team API error" };
    }
  };
  
  const createProjectFinanceApprove = async (data) => {
    try {
      const res = await axios.post(`/api/project/upsertPermissionFinanceApproval`, data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("createProjectFinanceApprove error:", err);
      return { success: false, message: err?.response?.data?.message || "Finance API error" };
    }
  };
  


// In your useProject.js hook
const createProjectMilestone = async (projectId, milestones) => {
  try {
    // Make sure projectId is a number
    const numericProjectId = parseInt(projectId, 10);
    
    if (isNaN(numericProjectId) || numericProjectId <= 0) {
      console.error("❌ Invalid project ID:", projectId);
      return { success: false, error: "Invalid project ID" };
    }
    
    // Structure the payload exactly as the API expects it
 const payload = {
  dto: {
    projectId: numericProjectId,
    milestoneList: milestones.map((m) => ({
      milestoneId: 0,
      milestoneName: m.name,
      milestoneDescription: m.description,
      milestoneStartDate: m.startDate ? formatDateString(m.startDate) : null,
      milestoneEndDate: m.endDate ? formatDateString(m.endDate) : null,
      status: m.status,
    })),
  },
};

// And make sure formatDateString() looks like:
const formatDateString = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

    console.log("🚀 Sending Payload:", JSON.stringify(payload, null, 2));
    
    const result = await dispatch(createProjectMilestoneAction(payload)).unwrap();
    console.log("✅ Milestone creation result:", result);
    
    if (result.success === false) {
      return { success: false, error: result.message || "Unknown error" };
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Failed to create milestones:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
};

// Helper function to ensure dates are in the correct format
function formatDateString(dateStr) {
  if (!dateStr) return null;
  
  // If already in YYYY-MM-DD format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  } catch (e) {
    console.error("Date parsing error:", e);
    return null;
  }
};

  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    success,
    projectTypeSector,

    // Actions
    createProject,
    fetchProjectTypeSector,
    resetProject,
    updateCurrentProject,
    createProjectBudget,
    createProjectteams,
    createProjectFinanceApprove,
    createProjectMilestone
  };
};