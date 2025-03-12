import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/spinner/spinner.component";
import useAuth from "./hooks/useAuth";
import "./styles/index.scss";
import "./styles/index.css";

/** LAYOUTS */
const UserLayout = lazy(() => import("./components/layout/user-layout.component"));
const DefaultLayout = lazy(() => import("./components/layout/default-layout.component"));
const SettingLayout = lazy(() => import("./components/layout/setting-layout.component"));

/** PAGES */
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  const [{ data: auth }] = useAuth();
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />
        {/* HEADER WITH SIDE MENU LAYOUT */}
        <Route path="/" element={<UserLayout />}>
          <Route index path="home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
