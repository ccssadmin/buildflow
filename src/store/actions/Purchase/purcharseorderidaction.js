import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const getNewPoId = createAsyncThunk(
  "boq/getNewPoId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET("/api/Vendor/Get-NewPOId");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
