import { createSlice } from "@reduxjs/toolkit";
import { createCeoProjectAction, getProjectTypeSectorAction } from "../../actions/Ceo/ceoprojectAction";

const initialState = {
  projects: [],
  currentProject: null,
  projectTypesAndSectors: [],
  loading: false,
  error: null,
  success: false,
};

const ceoProjectSlice = createSlice({
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
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
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
      })

      // Get Project Type & Sector
      .addCase(getProjectTypeSectorAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProjectTypeSectorAction.fulfilled, (state, action) => {
        state.loading = false;
        state.projectTypesAndSectors = action.payload;
      })
      .addCase(getProjectTypeSectorAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



export const { resetProjectState, setCurrentProject } = ceoProjectSlice.actions;
export default ceoProjectSlice.reducer;
