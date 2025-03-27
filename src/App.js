import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";

import "./styles/index.scss";
import "./styles/index.css";

/** LAYOUTS */
const MdLayout = lazy(() => import("./components/layout/user-layout.component"));
const EngineerLayout = lazy(() => import("./components/layout/engineer-layout.component"));
const AqsLayout = lazy ( ( ) => import('./components/layout/aqs-layout.component'));
const CeoLayout = lazy ( ( ) => import('./components/layout/ceo-layout.component'));

/** PAGES */
const Login = lazy(() => import("./pages/Login/Login"));

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

const AqsDashboard = lazy ( () => import ('./pages/aqsFlow/Dashboard/index'));
const KanbanAqs = lazy ( () => import ('./pages/aqsFlow/KanbanBoard/index'));
const AqsTicketDetails = lazy ( ( ) => import('./pages/aqsFlow/KanbanBoard/TicketDetails'));
const AqsChat = lazy( ( ) => import('./pages/aqsFlow/ChatPage/Chat/ChatApp'));
const AqsMaterial = lazy( ( ) => import('./pages/aqsFlow/Materials/index'));
const AqsInventory = lazy ( ( ) => import('./pages/aqsFlow/Inventory/index'));
const AqsBoq = lazy ( ( ) => import('./pages/aqsFlow/Boq/index'));
const AqsBoqCreate = lazy ( ( ) => import ('./pages/aqsFlow/Boq/BoqCreate'));
const AqsBoqOpen = lazy ( ( ) => import ('./pages/aqsFlow/Boq/BoqOpen'));
const AqsCostEstimation = lazy ( ( ) => import('./pages/aqsFlow/CostEstimation/index'));
const AqsCostEstimationCreate = lazy ( ( ) => import('./pages/aqsFlow/CostEstimation/CostEstimationCreate'));
const AqsCostEstimationOpen = lazy ( ( ) => import('./pages/aqsFlow/CostEstimation/CostEstimationOpen'));
const AqsVendor = lazy( ( ) => import('./pages/aqsFlow/Vendors/index'));
const AqsVendorDetails = lazy ( ( ) => import ('./pages/aqsFlow/Vendors/VendorDetails'));
const AqsVendorPriceDetails = lazy ( ( ) => import ('./pages/aqsFlow/Vendors/VendorPriceDetails'));
const AqsSetting = lazy( ( ) => import ('./pages/aqsFlow/Settings/index'));


// CEO FLOW

const CeoDashboard = lazy ( () => import ('./pages/ceoFlow/Dashboard/index'));
const CeoProject = lazy ( () => import ('./pages/ceoFlow/Project/index'));
const CeoTicketDetails = lazy ( () => import ('./pages/ceoFlow/KanbanBoard/TicketDetails'));
const CeoChat = lazy ( () => import ('./pages/ceoFlow/ChatPage/Chat/ChatApp'));
const KanbanCeo = lazy ( () => import ('./pages/ceoFlow/KanbanBoard/index'));
const CeoResources = lazy ( () => import ('./pages/ceoFlow/Resources/index'));
const CeoFinance = lazy ( () => import ('./pages/ceoFlow/Finance/index'));
const CeoDepartment = lazy ( () => import ('./pages/ceoFlow/Departments/index'));
const CeoReport = lazy ( () => import ('./pages/ceoFlow/Reports/index'));
const CeoSettings = lazy ( () => import ('./pages/ceoFlow/Settings/index'));
// Not Found
const NotFound = lazy(() => import("./pages/mdflow/NotFound/NotFound"));

const App = () => {
  const [role, setRole] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Define role-based routes and default paths
  const roleRoutes = {
    ManagingDirector: {
      default: "/home",
      layout: MdLayout,
    },
    Engineer: {
      default: "/admin/engineerdashboard",
      layout: EngineerLayout,
    },
    AQS : {
      default : "/aqs/aqsdashboard",
      layout : AqsLayout,
    },
    CEO : {
      default : "/ceo/dashboard",
      layout : CeoLayout,
    }
  };

  // ProtectedRoute component
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!role) {
      return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
      // Redirect to default path for user's role
      return <Navigate to={roleRoutes[role]?.default || "/login"} replace />;
    }

    return children;
  };

  // Check for existing role on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedRole = localStorage.getItem("userRole");
      const storedRoleId = localStorage.getItem("userRoleId");
      const accessToken = localStorage.getItem("accessToken");

      // Only set role if we have an access token
      if (accessToken && storedRole) {
        setRole(storedRole);
        setRoleId(storedRoleId);

        // Redirect only if on login page or root
        if (["/", "/login"].includes(location.pathname)) {
          // Get default path for this role
          const defaultPath = roleRoutes[storedRole]?.default || "/login";
          navigate(defaultPath, { replace: true });
        }
      } else {
        // Clear role data if no token
        setRole(null);
        setRoleId(null);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, [navigate, location.pathname]);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    if (userData && userData.roleName) {
      const userRole = userData.roleName;
      const userRoleId = userData.roleId || "1";

      // Update state
      setRole(userRole);
      setRoleId(userRoleId);

      // Get default path for this role
      const defaultPath = roleRoutes[userRole]?.default || "/login";
      navigate(defaultPath, { replace: true });
    } else {
      console.error("Invalid user data received:", userData);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userRoleId");
    localStorage.removeItem("userData");

    // Reset state
    setRole(null);
    setRoleId(null);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={
            role ? (
              <Navigate to={roleRoutes[role]?.default || "/login"} replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* SUPERADMIN ROUTES (MD Flow) */}
        <Route
          path="/"
          element={<ProtectedRoute allowedRole="ManagingDirector"><MdLayout onLogout={handleLogout} /></ProtectedRoute>}
        >
          <Route path="home" element={<MdDashboard />} />
          <Route path="approvals" element={<Kanban />} />
          <Route path="ticket/:ticketId" element={<TicketDetails />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projectdetails" element={<ProjectDetails />} />
          <Route path="chat" element={<ChatApp />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ADMIN ROUTES (Engineering Flow) */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRole="Engineer"><EngineerLayout onLogout={handleLogout} /></ProtectedRoute>}
        >
          <Route path="engineerdashboard" element={<EngineerDashboard />} />
          <Route path="engineerproject" element={<EngineerProject />} />
          <Route path="engineerapprovals" element={<KanbanEngineer />} />
          <Route path="engineerticketdetails/:ticketId" element={<EngineerTicketDetails />} />
          <Route path="engineerchats" element={<EngineerChat />} />
          <Route path="engineerreport" element={<EngineerReport />} />
          <Route path="engineerreportview" element={<EngineerReportView />} />
          <Route path="engineerreportcreate" element={<EngineerReportCreate />} />
          <Route path="engineermaterial" element={<EngineerMaterial />} />
          <Route path="engineermaterialview" element={<EngineerMaterialView />} />
          <Route path="engineermaterialcreate" element={<EngineerMaterialCreate />} />
          <Route path="engineertask" element={<EngineerTask />} />
          <Route path="engineersetting" element={<EngineerSetting />} />
          <Route path="*" element={<NotFound />} />
        </Route>


        {/* AqsRoutes */}

        <Route
          path="/aqs"
          element={<ProtectedRoute allowedRole="AQS"><AqsLayout onLogout={handleLogout} /></ProtectedRoute>}
        >
          <Route path="aqsdashboard" element={ <AqsDashboard />} />
          <Route path="aqsapprovals" element={ <KanbanAqs />} />
          <Route path="aqsticketdetails/:ticketId" element={ <AqsTicketDetails />} />
          <Route path="aqschats" element={<AqsChat />} />
          <Route path="aqsmaterial" element={ <AqsMaterial />} />
          <Route path="aqsinventory" element={ <AqsInventory />} />
          <Route path="aqsboq" element={ <AqsBoq />} />
          <Route path="aqsboqcreate" element={ <AqsBoqCreate />} />
          <Route path="aqsboqopen" element= { <AqsBoqOpen />} />
          <Route path="aqscostestimation" element={ <AqsCostEstimation />} />
          <Route path="aqscostestimationcreate" element={ <AqsCostEstimationCreate />} />
          <Route path="aqscostestimationopen" element={ <AqsCostEstimationOpen />} />
          <Route path="aqsvendor" element={ <AqsVendor />} />
          <Route path="aqsvendordetails" element={ <AqsVendorDetails />} />
          <Route path="aqsvendorpricedetails" element = {<AqsVendorPriceDetails />} />
          <Route path="aqssetting" element={ <AqsSetting />} />
          </Route>


        {/* CEORoutes */}

        <Route
          path="/ceo"
          element={<ProtectedRoute allowedRole="CEO"><CeoLayout onLogout={handleLogout} /></ProtectedRoute>}
        >
          <Route path="dashboard" element={ <CeoDashboard />} />
          <Route path="project" element={<CeoProject />} />
          <Route path="approvals" element={<KanbanCeo />} />
          <Route path="ticketdetails/:ticketId" element={<CeoTicketDetails />} />
          <Route path="chats" element={<CeoChat />} />
          <Route path="finance" element={<CeoFinance />} />
          <Route path="resources" element={<CeoResources />} />
          <Route path="departments" element={<CeoDepartment />} />
          <Route path="reports" element={<CeoReport />} />
          <Route path="settings" element={<CeoSettings />} />

        </Route>

        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;