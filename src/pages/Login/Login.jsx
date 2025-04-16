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
import '../../styles/components/css/login.css';

export default function Login({ onLoginSuccess }) {
  const [{ data }, { getAuth, setAuth, getUserInfo }] = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // Form state
  const [activeForm, setActiveForm] = useState("login");
  const [inProgress, setInProgress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",  // Added explicit email field
    phone: "",
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({});
  
  const inputRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check that either username or email is provided along with password
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
      // Send email field as required by the API
      // Use username value for both username and email fields to ensure compatibility
      const response = await getAuth({
        username: formData.username,
        password: formData.password,
        Email: formData.username, // This is the key change - providing the Email field expected by the API
      });
  
      if (response?.payload?.token) {
        // Store authentication token
        setAuthToken(response.payload.token);
        localStorage.setItem("accessToken", response.payload.token);
        setAuth(response.payload.token);
  
        // Fetch user details
        const userInfoResponse = await getUserInfo();
        
        console.log("User info response:", userInfoResponse); // Debug log
        
        // Check if user details exist in the response
        if (userInfoResponse?.payload?.details) {
          const userDetails = userInfoResponse.payload.details;
          
          // For debugging, let's log what we received
          console.log("User details:", userDetails);
          
          // Set default role if not present
          // Assuming role hierarchy: SuperAdmin > Admin > User
          const userData = {
            ...userDetails,
            roleName: userDetails.roleName || userDetails.role_name || "ManagingDirector",
            roleId: userDetails.roleId || userDetails.role_id || "1",
          };
          
          console.log("Processed user data:", userData); // Debug log
  
          // Store user data and role information
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.roleName);
          localStorage.setItem("userRoleId", userData.roleId);
  
          // Call onLoginSuccess callback
          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
        } else if (userInfoResponse?.payload) {
          // If details are not in the expected structure, try to use the payload directly
          const userData = {
            ...userInfoResponse.payload,
            roleName: userInfoResponse.payload.roleName || userInfoResponse.payload.role_name || "ManagingDirector",
            roleId: userInfoResponse.payload.roleId || userInfoResponse.payload.role_id || "1",
          };
          
          console.log("Using payload as user data:", userData); // Debug log
          
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.roleName);
          localStorage.setItem("userRoleId", userData.roleId);
          
          if (onLoginSuccess) {
            onLoginSuccess(userData);
          }
        } else {
          // If we have a token but no user details, create a default user
          // This is a fallback to prevent login failures
          console.log("No user details found, using default values"); // Debug log
          
          const defaultUserData = {
            username: formData.username,
            email: formData.username, // Store email too
            roleName: "ManagingDirector",
            roleId: "1",
          };
          
          localStorage.setItem("userData", JSON.stringify(defaultUserData));
          localStorage.setItem("userRole", defaultUserData.roleName);
          localStorage.setItem("userRoleId", defaultUserData.roleId);
          
          if (onLoginSuccess) {
            onLoginSuccess(defaultUserData);
          }
          
          // Show a warning that we're using default values
          dispatch(showToast({ 
            message: "Logged in with default permissions. Some features may be limited.", 
            variant: "warning" 
          }));
        }
      } else {
        throw new Error(response?.message || t("login.error.invalid"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(showToast({ message: error.message, variant: "danger" }));
    } finally {
      setInProgress(false);
    }
  };
  
  // Check if already authenticated on component mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      const authToken = getAuthToken() || localStorage.getItem("accessToken");
      
      if (authToken) {
        setAuth(authToken);
        try {
          const userInfo = await getUserInfo();
          
          if (userInfo?.payload?.details) {
            const userDetails = userInfo.payload.details;
            
            // Create user data object with role information
            const userData = {
              ...userDetails,
              roleName: userDetails.roleName || userDetails.role_name || "ManagingDirector",
              roleId: userDetails.roleId || userDetails.role_id || "1"
            };
            
            // Store user data and role information in localStorage
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("userRole", userData.roleName);
            localStorage.setItem("userRoleId", userData.roleId);
            
            // Call onLoginSuccess with user data
            if (onLoginSuccess) {
              onLoginSuccess(userData);
            }
          } else if (userInfo?.payload) {
            // If details are not in the expected structure, try to use the payload directly
            const userData = {
              ...userInfo.payload,
              roleName: userInfo.payload.roleName || userInfo.payload.role_name || "ManagingDirector",
              roleId: userInfo.payload.roleId || userInfo.payload.role_id || "1"
            };
            
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("userRole", userData.roleName);
            localStorage.setItem("userRoleId", userData.roleId);
            
            if (onLoginSuccess) {
              onLoginSuccess(userData);
            }
          } else {
            // Token exists but no user data - clear and force re-login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userRoleId");
            localStorage.removeItem("userData");
            setAuthToken("");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          // Clear invalid token
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userRoleId");
          localStorage.removeItem("userData");
          setAuthToken("");
        }
      }
    };
    
    checkExistingAuth();
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
                        top: "50%",
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
                  {inProgress
                    ? t("login.inprogress")
                    : t("login.with_eurolandID")}
                </button>
                <div className="google mt-3">
                  <Link className="text-decoration-none">                    
                    <svg className="me-2" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z" fill="#FFC107"/>
                    <path d="M3.65295 7.3455L6.93845 9.755C7.82745 7.554 9.98045 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C8.65895 2 5.32795 4.1685 3.65295 7.3455Z" fill="#FF3D00"/>
                    <path d="M12.5 22C15.083 22 17.43 21.0115 19.2045 19.404L16.1095 16.785C15.072 17.5745 13.8038 18.0014 12.5 18C9.89903 18 7.69053 16.3415 6.85853 14.027L3.59753 16.5395C5.25253 19.778 8.61353 22 12.5 22Z" fill="#4CAF50"/>
                    <path d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.7571 15.1082 17.0467 16.0766 16.108 16.7855L16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z" fill="#1976D2"/>
                    </svg>
                    Login with Google Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}