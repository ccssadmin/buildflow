import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";

import "./styles/index.scss";
import "./styles/index.css";

/** LAYOUTS */
const MdLayout = lazy(() => import("./components/layout/user-layout.component"));
const EngineerLayout = lazy(() => import("./components/layout/engineer-layout.component"));
const AqsLayout = lazy(() => import('./components/layout/aqs-layout.component'));
const CeoLayout = lazy(() => import('./components/layout/ceo-layout.component'));
const FinanceLayout = lazy(() => import('./components/layout/finance-layout.component'));
const PmLayout = lazy(() => import('./components/layout/pm-layout.component'));
const HrLayout = lazy(() => import('./components/layout/hr-layout.component'));
const PurchasemanagerLayout = lazy(() => import('./components/layout/purchasemanager-layout.component'));
const VendorLayout = lazy(() => import('./components/layout/vendor-layout.component'));

/** PAGES */
const Login = lazy(() => import("./pages/Login/Login"));

// [Keep all your existing page imports...]
// common Ticket Details for all flows

const CommonTicketDetails = lazy(() => import('./components/common/TicketDetails'));
const CommonBOQDetails =  lazy(() => import('./components/common/MaterialViewScreen'));
const CommonProjectSummary = lazy(() => import('./components/common/ProjectSummary'));
const CommonKanban = lazy(() => import('./components/common/KanbanBoard'));

// SuperAdmin (MD Flow)
const MdDashboard = lazy(() => import("./pages/mdflow/Dashboard/Home"));
const Kanban = lazy(() => import("./pages/mdflow/KanbanBoard/Kanban"));
const TicketDetails = lazy(() => import("./pages/mdflow/KanbanBoard/TicketDetails"));
const Projects = lazy(() => import("./pages/mdflow/Project/Project"));
const ProjectDetails = lazy(() => import("./pages/mdflow/Project/ProjectDeatils"));
const ChatApp = lazy(() => import("./pages/mdflow/ChatPage/Chat/ChatApp"));
const Settings = lazy(() => import("./pages/mdflow/Settings/Settings"));

// Admin Dashboard (Engineering Flow)
const EngineerDashboard = lazy(() => import("./pages/engineerFlow/Dashboard/index"));
const EngineerProject = lazy(() => import('./pages/engineerFlow/Project/index'));
const KanbanEngineer = lazy(() => import('./pages/engineerFlow/KanbanBoard/index'));
const EngineerTicketDetails = lazy(() => import('./pages/engineerFlow/KanbanBoard/TicketDetails'));
const EngineerReport = lazy(() => import('./pages/engineerFlow/Report/index'));
const EngineerReportView = lazy(() => import('./pages/engineerFlow/Report/ReportViewScreen'));
const EngineerReportCreate = lazy(() => import('./pages/engineerFlow/Report/ReportCreateScreen'));
const EngineerMaterial = lazy(() => import('./pages/engineerFlow/Material/index'));
const EngineerMaterialView = lazy(() => import('./pages/engineerFlow/Material/MaterialViewScreen'));
const EngineerMaterialCreate = lazy(() => import('./pages/engineerFlow/Material/MaterialCreateScreen'));
const EngineerChat = lazy(() => import('./pages/engineerFlow/ChatPage/Chat/ChatApp'));
const EngineerTask = lazy(() => import('./pages/engineerFlow/Task/index'));
const EngineerSetting = lazy(() => import('./pages/engineerFlow/Settings/index'));


// AQS FLOW

const AqsDashboard = lazy(() => import('./pages/aqsFlow/Dashboard/index'));
const KanbanAqs = lazy(() => import('./pages/aqsFlow/KanbanBoard/index'));
const AqsTicketDetails = lazy(() => import('./pages/aqsFlow/KanbanBoard/TicketDetails'));
const AqsChat = lazy(() => import('./pages/aqsFlow/ChatPage/Chat/ChatApp'));
const AqsMaterial = lazy(() => import('./pages/aqsFlow/Materials/index'));
const AqsInventory = lazy(() => import('./pages/aqsFlow/Inventory/index'));
const AqsBoq = lazy(() => import('./pages/aqsFlow/Boq/index'));
const AqsBoqCreate = lazy(() => import('./pages/aqsFlow/Boq/BoqCreate'));
const AqsBoqOpen = lazy(() => import('./pages/aqsFlow/Boq/BoqOpen'));
const AqsCostEstimation = lazy(() => import('./pages/aqsFlow/CostEstimation/index'));
const AqsCostEstimationCreate = lazy(() => import('./pages/aqsFlow/CostEstimation/CostEstimationCreate'));
const AqsCostEstimationOpen = lazy(() => import('./pages/aqsFlow/CostEstimation/CostEstimationOpen'));
const AqsVendor = lazy(() => import('./pages/aqsFlow/Vendors/index'));
const AqsVendorDetails = lazy(() => import('./pages/aqsFlow/Vendors/VendorDetails'));
const AqsVendorPriceDetails = lazy(() => import('./pages/aqsFlow/Vendors/VendorPriceDetails'));
const AqsSetting = lazy(() => import('./pages/aqsFlow/Settings/index'));


// CEO FLOW

const CeoDashboard = lazy(() => import('./pages/ceoFlow/Dashboard/index'));
const CeoDashboard1 = lazy(() => import('./pages/ceoFlow/Dashboard/index1'));
const CeoProject = lazy(() => import('./pages/ceoFlow/Project/index'));
const CeoProjectDetails = lazy(() => import('./pages/ceoFlow/Project/ProjectDeatils'));
const CeoCreateProject = lazy(() => import('./pages/ceoFlow/Project/CreateProject'));
const CeoProjectSummary = lazy(()=>import('./components/common/ProjectSummary'));
const CeoTicketDetails = lazy(() => import('./pages/ceoFlow/KanbanBoard/TicketDetails'));
const CeoChat = lazy(() => import('./pages/ceoFlow/ChatPage/Chat/ChatApp'));
const KanbanCeo = lazy(() => import('./pages/ceoFlow/KanbanBoard/index'));
const CeoResources = lazy(() => import('./pages/ceoFlow/Resources/index'));
const CeoFinance = lazy(() => import('./pages/ceoFlow/Finance/index'));
const Ceodepartments = lazy(() => import('./pages/ceoFlow/Departments/index'));
const CeoReport = lazy(() => import('./pages/ceoFlow/Reports/index'));
const CeoReportView = lazy(() => import('./pages/ceoFlow/Reports/ViewReport'));
const CeoSettings = lazy(() => import('./pages/ceoFlow/Settings/index'));
const ProjectTimeline = lazy(() => import('./pages/ceoFlow/Project/TimelineMilestonePlanning'));
// Not Found
const NotFound = lazy(() => import("./pages/ceoFlow/NotFound/NotFound"));


// Finance Flow

const FinanceDashboard = lazy(() => import('./pages/financeFlow/Dashboard/index'));
const FinanceBudget = lazy(() => import('./pages/financeFlow/Budget/index'));
const FinanceBudgetCreate = lazy(() => import('./pages/financeFlow/Budget/BudgetCreate'));
const FinanceBudgetDetails = lazy(() => import('./pages/financeFlow/Budget/BudgetDetails'));
const KanbanFinance = lazy(() => import('./pages/financeFlow/KanbanBoard/index'));
const FinanceTicketDetails = lazy(() => import('./pages/financeFlow/KanbanBoard/TicketDetails'));
const FinanceChat = lazy(() => import('./pages/financeFlow/ChatPage/Chat/ChatApp'));
const FinanceInvoice = lazy(() => import('./pages/financeFlow/Invoices/index'));
const FinanceInvoiceDetails = lazy(() => import('./pages/financeFlow/Invoices/InvoiceDetails'));
const FinanceCashFlow = lazy(() => import('./pages/financeFlow/CashFlow/index'));
const FinanceVendorAndPo = lazy(() => import('./pages/financeFlow/VendorAndPo/index'));
const FinanceTax = lazy(() => import('./pages/financeFlow/Tax/index'));
const FinanceReport = lazy(() => import('./pages/financeFlow/Reports/index'));
const FinanceReportCreate = lazy(() => import('./pages/financeFlow/Reports/ReportCreate'));
const FinanceSettings = lazy(() => import('./pages/financeFlow/Settings/index'));

// PM FLOW

const PmDashboard = lazy(() => import('./pages/pmFlow/Dashboard/index'));
const PmProject = lazy(() => import('./pages/pmFlow/Project/index'));
const PmTicketDetails = lazy(() => import('./pages/pmFlow/KanbanBoard/TicketDetails'));
const PmChat = lazy(() => import('./pages/pmFlow/ChatPage/Chat/ChatApp'));
const KanbanPm = lazy(() => import('./pages/pmFlow/KanbanBoard/index'));
const PmTask = lazy(() => import('./pages/pmFlow/Task/index'));
const PmResources = lazy(() => import('./pages/pmFlow/Resources/index'));
const PmMaterial = lazy(() => import('./pages/pmFlow/Material/index'));
const PmVendor = lazy(() => import('./pages/pmFlow/Vendors/index'));
const PmVendorDetails = lazy(() => import('./pages/pmFlow/Vendors/VendorDetails'));
const PmVendorPriceDetails = lazy(() => import('./pages/pmFlow/Vendors/VendorPriceDetails'));
const PmReport = lazy(() => import('./pages/pmFlow/Reports/index'));
const PmReportView = lazy(() => import('./pages/pmFlow/Reports/ViewReport'));
const PmSettings = lazy(() => import('./pages/pmFlow/Settings/index'));

//Hr Flow

const HrDashboard = lazy(() => import('./pages/hrFlow/Dashboard/index'));
const HrEmployee = lazy(() => import('./pages/hrFlow/Employee/index'));
const AddHrEmployee = lazy(() => import('./pages/hrFlow/Employee/AddEmployee'));
const HrEmployeeDetail = lazy(() => import('./pages/hrFlow/Employee/EmployeeDetail'));
const HrKanban = lazy(() => import('./pages/hrFlow/KanbanBoard/index'));
const HrKanbanTicketDetails = lazy(() => import('./pages/hrFlow/KanbanBoard/TicketDetails'));
const HrChat = lazy(() => import('./pages/hrFlow/ChatPage/Chat/ChatApp'));
const HrSettings = lazy(() => import('./pages/hrFlow/Settings/index'));
//Purchasemanager Flow

const PurchasemanagerDashboard = lazy(() => import('./pages/purchasemanagerFlow/Dashboard/index'));
const PurchasemanagerVendor = lazy(() => import('./pages/purchasemanagerFlow/Vendors/index'));
const PurchasemanagerVendorDetails = lazy(() => import('./pages/purchasemanagerFlow/Vendors/VendorDetails'));
const PurchasemanagerVendorPriceDetails = lazy(() => import('./pages/purchasemanagerFlow/Vendors/VendorPriceDetails'));
const PurchasemanagerPo = lazy(() => import('./pages/purchasemanagerFlow/Po/index'));
const PurchasemanagerPoDetails = lazy(() => import('./pages/purchasemanagerFlow/Po/purchaseOrder'));
const PurchasemanagerPoCreate = lazy(() => import('./pages/purchasemanagerFlow/Po/purchaseOrderCreate'));
const PurchasemanagerKanban = lazy(() => import('./pages/purchasemanagerFlow/KanbanBoard/index'));
const PurchasemanagerKanbanTicketDetails = lazy(() => import('./pages/purchasemanagerFlow/KanbanBoard/TicketDetails'));
const PurchasemanagerChat = lazy(() => import('./pages/purchasemanagerFlow/ChatPage/Chat/ChatApp'));
const PurchasemanagerSettings = lazy(() => import('./pages/purchasemanagerFlow/Settings/index'));
const PurchaseBoq = lazy(() => import('./pages/purchasemanagerFlow/BoqView/MaterialViewScreen'));



//Vendor Flow

const VendorDashboard = lazy(() => import('./pages/vendorFlow/Dashboard/index'));
const VendorPo = lazy(() => import('./pages/vendorFlow/Po/index'));
const VendorEditPo = lazy(() => import('./pages/vendorFlow/Po/EditPurchaseOrder'));
const VendorKanban = lazy(() => import('./pages/vendorFlow/KanbanBoard/index'));
const VendorTicketDetails = lazy(() => import('./pages/vendorFlow/KanbanBoard/TicketDetails'));
const VendorChat = lazy(() => import('./pages/vendorFlow/ChatPage/Chat/ChatApp'));
const VendorSettings = lazy(() => import('./pages/vendorFlow/Settings/index'));


const App = () => {
  const [roleId, setRoleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const roleRoutes = {
    1: { // CEO
      default: "/ceo/dashboard",
      layout: CeoLayout,
    },
    2: { // Site Engineer
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    3: { // Assistant QS
      default: "/aqs/aqsdashboard",
      layout: AqsLayout,
    },
    4: { // QS
      default: "/aqs/aqsdashboard",
      layout: AqsLayout,
    },
    5: { // Site Supervisor
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    6: { // Lead Engineer
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    7: { // Assistant Project Manager
      default: "/pm/dashboard",
      layout: PmLayout,
    },
    8: { // Project Manager
      default: "/pm/dashboard",
      layout: PmLayout,
    },
    9: { // Designer
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    10: { // Engineer
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    11: { // Managing Director
      default: "/home",
      layout: MdLayout,
    },
    13: { // finance head
      default: "/finance/dashboard",
      layout: FinanceLayout,
    },
    15: { // HR
      default: "/hr/dashboard",
      layout: HrLayout,
    },
    17: { // Purchase Manager (duplicate in your DB?)
      default: "/purchasemanager/dashboard",
      layout: PurchasemanagerLayout,
    },
    "Vendor": {
      default: "/vendor/dashboard",
      layout: VendorLayout
    },
  }
  
  // Fixed ProtectedRoute component to handle both numeric roleIds and string roles like "Vendor"
  const ProtectedRoute = ({ children, allowedRoleIds, allowedRole }) => {
    if (!roleId) {
      return <Navigate to="/login" replace />;
    }

    // Handle both numeric roleIds and string roles
    if (allowedRoleIds && !allowedRoleIds.includes(roleId)) {
      return <Navigate to={roleRoutes[roleId]?.default || "/login"} replace />;
    }

    if (allowedRole && roleId !== allowedRole) {
      return <Navigate to={roleRoutes[roleId]?.default || "/login"} replace />;
    }

    return children;
  };
  

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedRoleId = localStorage.getItem("userRoleId");
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken && storedRoleId) {
        // Check if it's a Vendor role (special case)
        if (storedRoleId === "Vendor") {
          setRoleId("Vendor");
        } else {
          setRoleId(Number(storedRoleId));
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [navigate]);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    if (userData && userData.roleId) {
      const userRoleId = userData.roleId;

      setRoleId(userRoleId);

      const defaultPath = roleRoutes[userRoleId]?.default || "/login";
      navigate(defaultPath, { replace: true });
    } else {
      console.error("Invalid user data received:", userData);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userRoleId");
    localStorage.removeItem("userData");
    localStorage.removeItem('projectId');

    // Reset the state
    setRoleId(null);

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Spinner />;
  }

  // Helper function to render layout with role check
  const renderLayout = (roleId) => {
    const LayoutComponent = roleRoutes[roleId]?.layout;
    return LayoutComponent ? <LayoutComponent onLogout={handleLogout} /> : null;
  };

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={
            roleId ? (
              <Navigate to={roleRoutes[roleId]?.default || "/login"} replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* SUPERADMIN ROUTES (MD Flow) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoleIds={[11]}>
              {renderLayout(11)}
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<MdDashboard />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="ticket/:ticketId" element={<CommonTicketDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projectdetails" element={<ProjectDetails />} />
          <Route path="task" element={<EngineerTask />} />
          <Route path="chat" element={<ChatApp />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
          <Route path="projectsummary/:projectId" element={<CommonProjectSummary />} />
        </Route>

        {/* ADMIN ROUTES (Engineering Flow) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoleIds={[2, 5, 6, 9, 10]}>
              {renderLayout(2)}
            </ProtectedRoute>
          }
        >
          <Route path="engineerdashboard" element={<EngineerDashboard />} />
          <Route path="engineerproject" element={<EngineerProject />} />
          <Route path="engineerapprovals" element={<CommonKanban />} />
          <Route path="engineerticketdetails/:ticketId" element={<CommonTicketDetails />} />
          <Route path="engineerchats" element={<EngineerChat />} />
          <Route path="engineerreport" element={<EngineerReport />} />
          <Route path="engineerreportview" element={<EngineerReportView />} />
          <Route path="engineerreportcreate" element={<EngineerReportCreate />} />
          <Route path="engineermaterial" element={<EngineerMaterial />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
          <Route path="engineermaterialcreate" element={<EngineerMaterialCreate />} />
          <Route path="engineertask" element={<EngineerTask />} />
          <Route path="engineersetting" element={<EngineerSetting />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* AQS ROUTES */}
        <Route
          path="/aqs"
          element={
            <ProtectedRoute allowedRoleIds={[3, 4]}>
              {renderLayout(3)}
            </ProtectedRoute>
          }
        >
          <Route path="aqsdashboard" element={<AqsDashboard />} />
          <Route path="aqsapprovals" element={<CommonKanban />} />
          <Route path="aqsticketdetails/:ticketId" element={<CommonTicketDetails />} />
          <Route path="aqschats" element={<AqsChat />} />
          <Route path="aqsmaterial" element={<AqsMaterial />} />
          <Route path="aqsinventory" element={<AqsInventory />} />
          <Route path="aqsboq" element={<AqsBoq />} />
          <Route path="aqsboqcreate" element={<AqsBoqCreate />} />
          <Route path="aqsboqopen" element={<AqsBoqOpen />} />
          <Route path="aqscostestimation" element={<AqsCostEstimation />} />
          <Route path="aqscostestimationcreate" element={<AqsCostEstimationCreate />} />
          <Route path="aqscostestimationopen" element={<AqsCostEstimationOpen />} />
          <Route path="aqsvendor" element={<AqsVendor />} />
          <Route path="aqsvendordetails" element={<AqsVendorDetails />} />
          <Route path="aqsvendorpricedetails" element={<AqsVendorPriceDetails />} />
          <Route path="aqssetting" element={<AqsSetting />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />

        </Route>

        {/* CEO ROUTES */}
      
<Route
  path="/ceo"
  element={
    <ProtectedRoute allowedRoleIds={[1]}>
      {renderLayout(1)}
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<CeoDashboard />} />
  <Route path="dashboard1" element={<CeoDashboard1 />} />
  <Route path="project" element={<CeoProject />} />
  <Route path="projectdetails/:projectId" element={<CeoProjectDetails />} />
  <Route path="createproject/:projectId" element={<CeoCreateProject />} />
  <Route path="createproject/" element={<CeoCreateProject />} />
  <Route path="projectmilestone" element={<ProjectTimeline />} />
  <Route path="approvals" element={<CommonKanban />} />
  <Route path="ticket/:ticketId" element={<CommonTicketDetails />} />
  <Route path="chats" element={<CeoChat />} />
  <Route path="finance" element={<CeoFinance />} />
  <Route path="resources" element={<CeoResources />} />
  <Route path="departments" element={<Ceodepartments />} />
  <Route path="reports" element={<CeoReport />} />
  <Route path="reportview" element={<CeoReportView />} />
  <Route path="settings" element={<CeoSettings />} />
  <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
  <Route path="projectsummary/:projectId" element={<CommonProjectSummary />} />

</Route>

        {/* FINANCE ROUTES */}
        <Route
          path="/finance"
          element={
            <ProtectedRoute allowedRoleIds={[13]}>
              {renderLayout(13)}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<FinanceDashboard />} />
          <Route path="budget" element={<FinanceBudget />} />
          <Route path="budgetcreate" element={<FinanceBudgetCreate />} />
          <Route path="budgetdetails" element={<FinanceBudgetDetails />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="financeticketdetails/:ticketId" element={<CommonTicketDetails />} />
          <Route path="chats" element={<FinanceChat />} />
          <Route path="invoice" element={<FinanceInvoice />} />
          <Route path="invoicedetails" element={<FinanceInvoiceDetails />} />
          <Route path="cashflow" element={<FinanceCashFlow />} />
          <Route path="vendorandpo" element={<FinanceVendorAndPo />} />
          <Route path="tax" element={<FinanceTax />} />
          <Route path="report" element={<FinanceReport />} />
          <Route path="reportcreate" element={<FinanceReportCreate />} />
          <Route path="settings" element={<FinanceSettings />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
          <Route path="projectsummary/:projectId" element={<CommonProjectSummary />} />
        </Route>

        {/* PM ROUTES */}
        <Route
          path="/pm"
          element={
            <ProtectedRoute allowedRoleIds={[7, 8]}>
              {renderLayout(8)}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PmDashboard />} />
          <Route path="project" element={<PmProject />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="pmticket/:ticketId" element={<CommonTicketDetails />} />
          <Route path="chats" element={<PmChat />} />
          <Route path="task" element={<PmTask />} />
          <Route path="resources" element={<PmResources />} />
          <Route path="material" element={<PmMaterial />} />
          <Route path="vendor" element={<PmVendor />} />
          <Route path="vendordetails" element={<PmVendorDetails />} />
          <Route path="vendorpricedetails" element={<PmVendorPriceDetails />} />
          <Route path="reports" element={<PmReport />} />
          <Route path="reportview" element={<PmReportView />} />
          <Route path="settings" element={<PmSettings />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
          <Route path="projectsummary/:projectId" element={<CommonProjectSummary />} />
        </Route>

        {/* HR ROUTES */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoleIds={[15]}>
              {renderLayout(15)}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="employee" element={<HrEmployee />} />
          <Route path="addemployee/:empId?" element={<AddHrEmployee />} />
          <Route path="employeedetail" element={<HrEmployeeDetail />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="hrticketdetails/:ticketId" element={<CommonTicketDetails />} />
          <Route path="chats" element={<HrChat />} />
          <Route path="settings" element={<HrSettings />} />
        </Route>

        {/* PURCHASE MANAGER ROUTES */}
        <Route
          path="/purchasemanager"
          element={
            <ProtectedRoute allowedRoleIds={[17]}>
              {renderLayout(17)}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PurchasemanagerDashboard />} />
          <Route path="vendors" element={<PurchasemanagerVendor />} />
          <Route path="vendorsDetails" element={<PurchasemanagerVendorDetails/>} />
          <Route path="vendorsPriceDetails" element={<PurchasemanagerVendorPriceDetails/>} />
          <Route path="po" element={<PurchasemanagerPo />} />
          <Route path="poCreate" element={<PurchasemanagerPoCreate />} />
          <Route path="boqDetails/:boqId" element={<PurchaseBoq />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="purchaseticketdetails/:ticketId" element={<CommonTicketDetails />} />
          <Route path="chats" element={<PurchasemanagerChat />} />
          <Route path="settings" element={<PurchasemanagerSettings />} />
          <Route path="materialview/:boqId" element={<CommonBOQDetails />} />
          <Route path="poDetails/:purchaseOrderId" element={<PurchasemanagerPoDetails/>} />
          <Route path="ticket/:ticketId" element={<CommonTicketDetails />} />
          
        </Route>


        {/* Vendor */}

        <Route 
          path="/vendor" 
          element={
            <ProtectedRoute allowedRole="Vendor">
              {renderLayout("Vendor")}
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<VendorDashboard />}/>
          <Route path="po" element={<VendorPo />} />
          <Route path="editpo/:purchaseOrderId" element={<VendorEditPo />} />
          <Route path="approvals" element={<CommonKanban />} />
          <Route path="vendorticketdetails/:ticketId" element={<VendorTicketDetails />} />
          <Route path="chats" element={<VendorChat />} />
          <Route path="settings" element={<VendorSettings />} />
        </Route>
        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;