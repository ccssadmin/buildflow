import { createSlice } from "@reduxjs/toolkit";
import { getdepartmentsAction } from "../../actions/Ceo/DepartmentAction";

const departmentSlice = createSlice({
    name: 'departments',
    initialState: {
      data: [],
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
        });
    },
  });
  
  export default departmentSlice.reducer;