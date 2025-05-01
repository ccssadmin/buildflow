import { createSlice } from "@reduxjs/toolkit";
import { getdepartmentsAction, getDepartmentsByIdAction } from "../../actions/Ceo/DepartmentAction";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    data: [],
    selectedDepartmentEmployees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getdepartmentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getdepartmentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getdepartmentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDepartmentsByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentsByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDepartmentEmployees = action.payload;
      })      
      .addCase(getDepartmentsByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default departmentSlice.reducer;
