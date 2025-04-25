import { createAsyncThunk } from "@reduxjs/toolkit";
import { crateFinanceApproved, createceoproject, createProjectBudget, createProjectMilestone, createProjectTeam, getProjectTypeSector } from "../../../services";

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


// In your ceoprojectAction.js
export const createProjectMilestoneAction = createAsyncThunk(
  "project/milestone",
  async (params, { rejectWithValue }) => {
    try {
      // Validate the projectId
      if (!params.projectId || params.projectId <= 0) {
        return rejectWithValue({
          message: "Invalid project ID",
          data: { projectid: params.projectId || 0 }
        });
      }
      
      // Log what we're sending
      console.log("📤 Sending milestone data to API:", JSON.stringify(params, null, 2));
      
      // Pass the params directly to the API function
      const response = await createProjectMilestone(params);
      
      // Log response
      console.log("📥 Received response:", JSON.stringify(response.data, null, 2));
      
      return response.data;
    } catch (error) {
      console.error("💥 API Error:", error);
      return rejectWithValue(error.response?.data || { 
        message: error.message,
        data: { projectid: params?.projectId || 0 }
      });
    }
  }
);