import { createAsyncThunk } from "@reduxjs/toolkit";
import { crateFinanceApproved, createceoproject, createProjectBudget, createProjectTeam, getProjectTypeSector } from "../../../services";

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
    return response.data;
  }
);

export const createProjectFinanceApprovedAction = createAsyncThunk(
  "project/finance",
  async (params) => {
    const response = await crateFinanceApproved(params);
    return response.data;
  }
);