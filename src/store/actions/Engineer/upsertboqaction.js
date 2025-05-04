// features/boq/boqActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const upsertBoq = createAsyncThunk(
  "boq/upsertBoq",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.POST("/api/Project/upsertBoq", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
