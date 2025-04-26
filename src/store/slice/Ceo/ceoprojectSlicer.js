import { createSlice } from "@reduxjs/toolkit";
import {
  createCeoProjectAction,
  createProjectBudgetAction,
  createProjectFinanceApprovedAction,
  createProjectMilestoneAction,
  createProjectTeamAction,
  getProjectTypeSectorAction,
} from "../../actions/Ceo/ceoprojectAction";

const initialState = {
  projects: [],
  projectBudgets: [],
  projectMilestone : [], 
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
    logoutClearProjectState: (state) => {
      state.projects = [];
      state.projectBudgets = [];
      state.currentProject = null;
      state.projectTypesAndSectors = [];
      state.loading = false;
      state.error = null;
      state.success = false;
      localStorage.removeItem("projectId"); // ✅ remove projectId only on logout
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
        const projectData = action.payload?.data || action.payload;
        state.projects.push(projectData);
        state.currentProject = projectData;

        const projectId = projectData?.projectId || projectData?.projectid;
        if (projectId !== undefined) {
          localStorage.setItem("projectId", projectId.toString());
          console.log("📌 Project ID saved to localStorage:", projectId);
        } else {
          console.error("❌ Project ID not found in payload");
        }
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
      })

      // Create Project Budget
      .addCase(createProjectBudgetAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectBudgetAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projectBudgets.push(action.payload);
        // ❌ DO NOT modify projectId or currentProject here
      })
      .addCase(createProjectBudgetAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      // Create Project Team
      .addCase(createProjectTeamAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectTeamAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log("✅ Project Team created:", action.payload);
        // ❌ Again do not touch projectId or localStorage
      })
      .addCase(createProjectTeamAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      // Create Project Finance Approved
      .addCase(createProjectFinanceApprovedAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectFinanceApprovedAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log("✅ Project Finance Approved:", action.payload);
        // ❌ Again do not touch projectId or localStorage
      })
      .addCase(createProjectFinanceApprovedAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })
      .addCase(createProjectMilestoneAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectMilestoneAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.milestones = action.payload.data || action.payload;
      })
      .addCase(createProjectMilestoneAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.success = false;
      });

  },
});

export const { resetProjectState, setCurrentProject, logoutClearProjectState } = ceoProjectSlice.actions;
export default ceoProjectSlice.reducer;
