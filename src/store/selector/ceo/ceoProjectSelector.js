// src/features/project/projectSelectors.js

// Select all projects
export const selectAllProjects = (state) => state.project.projects;

// Select current project
export const selectCurrentProject = (state) => state.project.currentProject;

// Select loading state
export const selectProjectLoading = (state) => state.project.loading;

// Select error state
export const selectProjectError = (state) => state.project.error;

// Select success state
export const selectProjectSuccess = (state) => state.project.success;