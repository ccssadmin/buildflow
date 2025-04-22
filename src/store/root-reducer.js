import { combineReducers } from 'redux';
import authSlice from './slice/auth';
import toastSlice from './slice/toast';
import kanbanSlice from './slice/kanban';
import masterSlice from './slice/master';
import ceoProjectReducer from './slice/Ceo/ceoprojectSlicer'; 
import rolebasedemp from "./slice/Ceo/RoleBasedEmpSlice";
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  toast: toastSlice.reducer,
  kanban: kanbanSlice.reducer,
  master: masterSlice.reducer,
  project: ceoProjectReducer,
  rolebasedemp : rolebasedemp,
});
