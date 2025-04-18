import { useDispatch, useSelector } from "react-redux";
import { createCeoProjectAction, getProjectTypeSectorAction } from "../../store/actions/Ceo/ceoprojectAction";
import {
  selectAllProjects,
  selectCurrentProject,
  selectProjectError,
  selectProjectLoading,
  selectProjectSuccess,
  selectProjectTypeSector,
} from "../../store/selector/ceo/ceoProjectSelector";
import { resetProjectState, setCurrentProject } from "../../store/slice/Ceo/ceoprojectSlicer";
import { useEffect, useState } from "react";

export const useProject = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectProjectLoading);
  const error = useSelector(selectProjectError);
  const success = useSelector(selectProjectSuccess);
  const projectTypeSectorData = useSelector(selectProjectTypeSector);

  // Structured project type and sector data
  const [projectTypeSector, setProjectTypeSector] = useState({
    projectTypes: [],
    projectSectors: [],
  });

  // Update local state when Redux state changes
  useEffect(() => {
    if (projectTypeSectorData) {
      setProjectTypeSector({
        projectTypes: projectTypeSectorData.projectTypes || [],
        projectSectors: projectTypeSectorData.projectSectors || []
      });
    }
  }, [projectTypeSectorData]);

  const createProject = async (projectData) => {
    try {
      const result = await dispatch(createCeoProjectAction(projectData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to create project:", error);
      return { success: false, error };
    }
  };

  const fetchProjectTypeSector = async () => {
    try {
      await dispatch(getProjectTypeSectorAction()).unwrap();
    } catch (error) {
      console.error("Failed to fetch project type/sector:", error);
    }
  };

  const resetProject = () => {
    dispatch(resetProjectState());
  };

  const updateCurrentProject = (project) => {
    dispatch(setCurrentProject(project));
  };

  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    success,
    projectTypeSector,

    // Actions
    createProject,
    fetchProjectTypeSector,
    resetProject,
    updateCurrentProject
  };
};