// Example slice: roleSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchRolesByDepartment } from "../../actions/hr/designationaction";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesByDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRolesByDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles || action.payload; // <- make sure this matches API response shape
      })
      .addCase(fetchRolesByDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles";
      });
  },
});

export default roleSlice.reducer;
