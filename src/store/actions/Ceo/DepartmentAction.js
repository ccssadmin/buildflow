import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDepartments } from "../../../services";

export const getdepartmentsAction = createAsyncThunk(
  "departments/getdepartments",
  async () => {
    const response = await getDepartments();
    return response.data;
  }
);
