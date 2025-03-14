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

export default function Login() {
  const [{ data }, { getAuth, setAuth, getUserInfo }] = useAuth();
  const [isTokenSuccess, setIsTokenSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticatedToken = !!getAuthToken();
  const [activeForm, setActiveForm] = useState("login");
  const [inProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({});
  const inputRef = useRef(null);

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
      const response = await getAuth({
        username: formData.username,
        password: formData.password,
      });

      if (response.payload?.token) {
        setAuthToken(response.payload.token);
        setAuth(response.payload.token);
        await getUserInfo();
      } else {
        setIsTokenSuccess(false);
        dispatch(
          showToast({ message: t("login.error.invalid"), variant: "danger" })
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(showToast({ message: error.message, variant: "danger" }));
    } finally {
      setInProgress(false);
    }
  };

  useEffect(() => {
    if (isTokenSuccess) {
      getUserInfo().catch((err) =>
        console.error("Error fetching user info:", err)
      );
      setIsTokenSuccess(false);
    }
  }, [isTokenSuccess]);

  useEffect(() => {
    if (isAuthenticatedToken && data?.details) {
      const storageData = localStorage.getItem("accessToken");
      setAuth(storageData);
      const redirectURL = getDeepLinkURL();
      if (redirectURL) {
        setDeepLinkURL("");
        navigate(redirectURL);
      } else if (data.details.is_active) {
        navigate("/home");
      } else {
        handleUnauthorizedUser();
      }
    }
  }, [isAuthenticatedToken, data]);

  const handleUnauthorizedUser = () => {
    dispatch(
      showToast({ message: t("login.inactive_user"), variant: "danger" })
    );
    setAuthToken("");
    setExpiresOn("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
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
                    <label>{t("login.label.userName")} </label>
                    <input
                      type="email"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      onKeyDown={handleKeyDown}
                    />
                    {errorMsg.username && (
                      <p className="errorMsg">{t("login.error.email")}</p>
                    )}
                  </div>
                  <div className="user-row mb-0">
                    <label>{t("login.label.password")}</label>
                    {/* <div style={{ position: "relative" }}> */}
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
                        style={{ paddingRight: "40px" }}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEye /> :<FaEyeSlash />  }
                      </span>
                    {/* </div> */}
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
