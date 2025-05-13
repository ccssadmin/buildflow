import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../store/slice/toast";
import {
  setAuthToken,
  getAuthToken,
  setExpiresOn,
  getAuthType,
  getDeepLinkURL,
  setDeepLinkURL,
} from "../../utils/storage";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { PRODUCT_LOGO } from "../../assets/images";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { PiBuildingOffice } from "react-icons/pi";
import '../../styles/components/css/login.css';
import { setJustLoggedIn } from "../../services/api";

export default function Login({ onLoginSuccess }) {
  const [{ data }, { getAuth, setAuth, getUserInfo , setRefreshToken }] = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // Login mode state (employee or vendor)
  const [loginMode, setLoginMode] = useState("employee");
  
  // Form state
  const [activeForm, setActiveForm] = useState("login");
  const [inProgress, setInProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    type: "", // Will be set to "vendor" for vendor login
  });
  const [errorMsg, setErrorMsg] = useState({});
  
  const inputRef = useRef(null);

  // Toggle between employee and vendor login
  const toggleLoginMode = () => {
    const newMode = loginMode === "employee" ? "vendor" : "employee";
    setLoginMode(newMode);
    
    // Reset form data when switching modes
    setFormData(prev => ({
      ...prev,
      username: "",
      password: "",
      type: newMode === "vendor" ? "vendor" : "", // Set type for vendor login
    }));
    
    // Clear any error messages
    setErrorMsg({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setErrorMsg((prev) => ({
        ...prev,
        username: !formData.username,
        password: !formData.password,
      }));
      return;
    }
    
    setInProgress(true);
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
        Email: formData.username,
      };
      
      if (loginMode === "vendor") {
        payload.type = "vendor";
      }
      
      setJustLoggedIn(true);
      
      const response = await getAuth(payload);
      
      if (response?.payload?.token) {
        // Store authentication token and refresh token
        setAuthToken(response.payload.token);
        localStorage.setItem("accessToken", response.payload.token);
        localStorage.setItem("refreshToken", response.payload.refreshToken);
        
        if (response.payload.expiresIn || response.payload.expires_in) {
          const expiresIn = response.payload.expiresIn || response.payload.expires_in;
          const expirationTime = Date.now() + (expiresIn * 1000);
          localStorage.setItem("tokenExpiration", expirationTime.toString());
          
          if (setExpiresOn) {
            setExpiresOn(expirationTime.toString());
          }
        }
        
        setAuth(response.payload.token);
        setRefreshToken(response.payload.refreshToken);
        
        // Fetch user information
        const userInfo = await getUserInfo();
        
        if (userInfo && userInfo.payload) {
          const userData = userInfo.payload;
          // Store user data in localStorage
          localStorage.setItem("userData", JSON.stringify(userData));
          
          // Store user role and roleId
          if (userData.role) {
            localStorage.setItem("userRole", userData.role);
          }
          
          if (loginMode === "vendor") {
            localStorage.setItem("userRoleId", "14");  // Vendor role ID
            localStorage.setItem("userType", "vendor");
          } else if (userData.roleId) {
            localStorage.setItem("userRoleId", userData.roleId.toString());
            localStorage.setItem("userType", "employee");
          }
          
          // If callback for login success exists, call it with user data
          if (onLoginSuccess && typeof onLoginSuccess === 'function') {
            onLoginSuccess(userData);
          } else {
            // Redirect based on role if no callback
            const roleId = loginMode === "vendor" ? "14" : userData.roleId;
            const redirectPath = getRedirectPathForRole(roleId);
            navigate(redirectPath, { replace: true });
          }
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(showToast({ message: error.message || "Login failed. Please try again.", variant: "danger" }));
    } finally {
      setInProgress(false);
    }
  };
  
  // Helper function to determine redirect path based on role
  const getRedirectPathForRole = (roleId) => {
    const roleRoutes = {
      1: "/ceo/dashboard",     // CEO
      2: "/admin/engineerdashboard",  // Site Engineer
      3: "/aqs/aqsdashboard",  // Assistant QS
      4: "/aqs/aqsdashboard",  // QS
      5: "/admin/engineerdashboard",  // Site Supervisor
      6: "/admin/engineerdashboard",  // Lead Engineer
      7: "/pm/dashboard",      // Assistant Project Manager
      8: "/pm/dashboard",      // Project Manager
      9: "/admin/engineerdashboard",  // Designer
      10: "/admin/engineerdashboard", // Engineer
      11: "/home",             // Managing Director
      13: "/finance/dashboard", // Finance Head
      14: "/vendor/dashboard",  // Vendor
      15: "/hr/dashboard",      // HR
      17: "/purchasemanager/dashboard" // Purchase Manager
    };
    
    return roleRoutes[roleId] || "/login";
  };
  
  
  // Check if already authenticated on component mount
  useEffect(() => {
    // We're intentionally not doing anything here now
    // Token validation is handled at the App level
  }, []);

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  // Update form field to show it as email input
  const updateUsername = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      username: value,
      email: value, // Update both fields to ensure consistency
    }));
  };

  return (
    <main className="main-login">
      <div className="login-page">
        <div className="login-form">
          <div className="login-form-container">
            {activeForm === "login" && (
              <div className="login-form-container-button">
                <div className="user-flex">
                  <img
                    className="mb-5"
                    src={PRODUCT_LOGO}
                    alt="Agent Board Icon"
                  />
                  
                  {/* Login title showing current mode with appropriate icon */}
                  <h3 className="mb-4">
                    {loginMode === "employee" ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <IoPerson className="me-2" size={24} />
                        Employee Login
                      </span>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center">
                        <PiBuildingOffice className="me-2" size={24} />
                        Vendor Login
                      </span>
                    )}
                  </h3>
                  
                  <div className="user-row">
                    <label>{t("Email Id")} </label>
                    <input
                      type="email"
                      value={formData.username}
                      onChange={updateUsername}
                      onKeyDown={handleKeyDown}
                      placeholder="Enter your email"
                    />
                    {errorMsg.username && (
                      <p className="errorMsg">{t("login.error.email")}</p>
                    )}
                  </div>
                  <div className="user-row mb-0" style={{ position: "relative" }}>
                    <label>{t("login.label.password")}</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      onKeyDown={handleKeyDown}
                      style={{ paddingRight: "40px" , marginBottom :'10px'}}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "40%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#BBBBBB",
                      }}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    {errorMsg.password && (
                      <p className="errorMsg">
                        {t("please enter valid password.")}
                      </p>
                    )}
                  </div>
                  <div className="forgot-password">
                    <Link className="text-decoration-none forgot">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button
                  className="login-form-container-button-common btn-login my-4"
                  onClick={(e) => handleLogin(e)}
                  disabled={inProgress}
                >
                  {inProgress ? (
                    t("login.inprogress")
                  ) : (
                    <span className="d-flex align-items-center justify-content-center">
                      {loginMode === "employee" ? (
                        <>
                          <IoPerson className="me-2" />
                          {t("login.with_eurolandID")}
                        </>
                      ) : (
                        <>
                          <PiBuildingOffice className="me-2" />
                          Login as Vendor
                        </>
                      )}
                    </span>
                  )}
                </button>
                
                {/* Toggle button to switch between employee and vendor login with icons */}
                <button
                  className="login-form-container-button-common btn-toggle-login my-2"
                  onClick={toggleLoginMode}
                  type="button"
                  style={{
                    backgroundColor: "#EBEBEB",
                    color: "#606060",
                    border: "1px solid blue"
                  }}
                >
                  {loginMode === "employee" ? (
                    <span className="d-flex align-items-center justify-content-center">
                      <PiBuildingOffice className="me-2" />
                      Switch to Vendor Login
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center">
                      <IoPerson className="me-2" />
                      Switch to Employee Login
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}