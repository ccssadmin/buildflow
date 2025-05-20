import { combineReducers } from 'redux';
import authSlice from './slice/auth';
import toastSlice from './slice/toast';
import kanbanSlice from './slice/kanban';
import masterSlice from './slice/master';
import ceoProjectReducer from './slice/Ceo/ceoprojectSlicer'; 
import rolebasedemp from "./slice/Ceo/RoleBasedEmpSlice";
import createNotifyReducer from "./slice/Ceo/notificationSlicer";
import departmentReducer from "./slice/Ceo/DepartmentSlicer";
import riskReducer from "./slice/Ceo/riskSlice";
import roleReducer from "./slice/hr/designationslice"
import employeeReducer from "./slice/hr/createemployeeslice";
import boqReducer from "./slice/Engineer/upsertboqslice";
import purchaseReducer from "./slice/Purchase/purchaseorderidslice";
import purchaseOrderReducer from "./slice/vendorflow/po-vendorslice";
import reportReducer from './slice/report/reportslice';
import vendorReducer from  "./slice/Vendor/getvendorslice";
import ceoReportReducer from './slice/report/ceoreportslice';
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  toast: toastSlice.reducer,
  kanban: kanbanSlice.reducer,
  master: masterSlice.reducer,
  project: ceoProjectReducer,
  rolebasedemp: rolebasedemp,
  createnotify: createNotifyReducer,
  departments: departmentReducer,
  risk: riskReducer,
  department: departmentReducer,
  role: roleReducer,
  employee: employeeReducer,
  boq: boqReducer,
  vendor: vendorReducer, 
  purchase: purchaseReducer,
  purchaseOrder: purchaseOrderReducer,
  report: reportReducer,
  ceoReport: ceoReportReducer,
});