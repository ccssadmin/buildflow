// src/redux/features/employee/employeeSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createEmployee, createOrUpdateEmployee, deleteEmployee, getEmployees } from "../../actions/hr/createemployeaction";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    loading: false,
    employee: null,
    employeeList: [],
    error: null,
    success: false,
  },
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.employee = null;
      state.employeeList = [];
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.success = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createOrUpdateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrUpdateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.employeeList.findIndex(emp => emp.empId === action.payload.empId);
        if (index !== -1) {
          state.employeeList[index] = action.payload;
        }
      })
      .addCase(createOrUpdateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = state.employeeList.filter(emp => emp.empId !== action.payload.empId);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { resetEmployeeState } = employeeSlice.actions;
export default employeeSlice.reducer;
