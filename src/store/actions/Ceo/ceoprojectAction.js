import { createAsyncThunk } from "@reduxjs/toolkit";
import { createceoproject, getProjectTypeSector } from "../../../services";

// Create Project
export const createCeoProjectAction = createAsyncThunk(
  "project/create",
  async (params) => {
    const response = await createceoproject(params);
    return response.data;
  }
);

// Get Project Type & Sector
export const getProjectTypeSectorAction = createAsyncThunk(
  "project/getTypeSector",
  async () => {
    const response = await getProjectTypeSector();
    return response.data;
  }
);
