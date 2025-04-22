import { createAsyncThunk } from "@reduxjs/toolkit";
import { createceoproject, createProjectBudget, getProjectTypeSector } from "../../../services";

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
