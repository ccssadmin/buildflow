import { createAsyncThunk } from "@reduxjs/toolkit";
import { crateFinanceApproved, createceoproject, createProjectBudget, createProjectMilestone, createProjectTeam, getAllProjectByFilter, getProjectDetails, getProjectTypeSector } from "../../../services";

// Get Project Type & Sector
export const getProjectTypeSectorAction = createAsyncThunk(
  "project/getTypeSector",
  async () => {
    const response = await getProjectTypeSector();
    return response.data;
  }
);

// Create Project
export const createCeoProjectAction = createAsyncThunk(
  "project/create",
  async (params) => {
    const response = await createceoproject(params);
    return response.data;
  }
);

//Create Project Budget

// ceoprojectAction.js
export const createProjectBudgetAction = createAsyncThunk(
  "project/budget",
  async (params) => {
    const response = await createProjectBudget(params);
    return response.data;
  }
);

export const createProjectTeamAction = createAsyncThunk(
  "project/team",
  async (params) => {
    const response = await createProjectTeam(params);
    return { success: true, data: response.data }; 
  }
);


export const createProjectFinanceApprovedAction = createAsyncThunk(
  "project/finance",
  async (params, { rejectWithValue }) => {
    try {
      console.log("Calling API with params:", params);
      const response = await crateFinanceApproved(params);
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


export const createProjectMilestoneAction = createAsyncThunk(
  "project/milestone",
  async ({ projectId, milestoneDto }, { rejectWithValue }) => {
    try {
      if (!projectId || projectId <= 0) {
        return rejectWithValue({
          message: "Invalid project ID",
          data: { projectId }
        });
      }
      
      console.log("Sending milestone data:", milestoneDto);
      const response = await createProjectMilestone(projectId, milestoneDto);
      
      console.log("Received response:", response);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(error.response?.data || { 
        message: error.message,
        data: { projectId }
      });
    }
  }
);
/** USED TO GET PROJECT DETAILS - CEO FLOW */
export const getProjectDetailsAction = createAsyncThunk(
  "getProjectDetails",
  async (params) => {
    const response = await getProjectDetails(params);
    return response.data;
  }
);

export const getAllProjectByFilterAction = createAsyncThunk (
  "proect/getProjectByStatus",
  async () => {
    const response = await getAllProjectByFilter();
    return response.data;
  }
)