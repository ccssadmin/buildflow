import { createSlice } from "@reduxjs/toolkit";
import { createCeoProjectAction } from "../../actions/Ceo/ceoprojectAction";


const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  success: false
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCeoProjectAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCeoProjectAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createCeoProjectAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  }
});

export const { resetProjectState, setCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;