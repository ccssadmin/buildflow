import { useDispatch, useSelector } from "react-redux";
import { createCeoProjectAction } from "./projectActions";
import { selectAllProjects, selectCurrentProject, selectProjectError, selectProjectLoading, selectProjectSuccess } from "../../store/selector/ceo/ceoProjectSelector";
import { resetProjectState, setCurrentProject } from "../../store/slice/Ceo/ceoprojectSlicer";


export const useProject = () => {
  const dispatch = useDispatch();
  
  const projects = useSelector(selectAllProjects);
  const currentProject = useSelector(selectCurrentProject);
  const loading = useSelector(selectProjectLoading);
  const error = useSelector(selectProjectError);
  const success = useSelector(selectProjectSuccess);
  
  const createProject = async (projectData) => {
    try {
      await dispatch(createCeoProjectAction(projectData)).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to create project:", error);
      return false;
    }
  };
  
  const resetState = () => {
    dispatch(resetProjectState());
  };
  
  const setProject = (project) => {
    dispatch(setCurrentProject(project));
  };
  
  return {
    // State
    projects,
    currentProject,
    loading,
    error,
    success,
    
    // Actions
    createProject,
    resetState,
    setProject
  };
};