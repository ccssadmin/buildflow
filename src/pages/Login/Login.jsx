import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { showToast } from "../../store/slice/toast";
import {
  setAuthToken,
  getAuthToken,
  setExpiresOn,
  setAuthType,
  getAuthType,
  getDeepLinkURL,
  setDeepLinkURL,
} from "../../utils/storage";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [{ data }, { getAuth, setAuth, getUserInfo }] = useAuth();
  const [isTokenSuccess, setIsTokenSuccess] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticatedToken = !!getAuthToken();
  const [activeForm, setActiveForm] = useState("login");
  const [inProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();

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

  const handlePhoneNumber = (e) => {
    const phone = e.target.value;
    if (!/^[0-9]*$/.test(phone)) {
      setErrorMsg((prev) => ({ ...prev, phone: true }));
    } else {
      setFormData((prev) => ({ ...prev, phone }));
      setErrorMsg((prev) => ({ ...prev, phone: false }));
    }
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
      const response = await getAuth({
        username: formData.username,
        password: formData.password,
      });

      if (response.payload?.token) {
        setAuthToken(response.payload.token);
        setAuth(response.payload.token);
        await getUserInfo(); // Call immediately
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // Perform form validation and API call for signup
  };

  useEffect(() => {
    if (activeForm === "signup" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeForm]);

  const getUserNameData = (val) => {
    setFormData((prev) => ({ ...prev, username: val }));
    if (val.length > 0) {
      setErrorMsg((prev) => ({ ...prev, username: false }));
    }
  };
  const getUserPasswordData = (val) => {
    setFormData((prev) => ({ ...prev, password: val }));
    if (val.length > 0) {
      setErrorMsg((prev) => ({ ...prev, password: false }));
    }
  };

  // Handle "Enter" key press to trigger login
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-form-container">
          {activeForm === "login" && (
            <div className="login-form-container-button">
              <div className="user-flex">
                <div className="user-row">
                  <label>{t("login.label.userName")} </label>
                  <input
                    type="email"
                    value={formData.username}
                    onChange={(e) => getUserNameData(e.target.value)}
                    onKeyDown={handleKeyDown} // Press "Enter" to trigger login
                    placeholder={t("login.label.userName")}
                  />
                </div>
                <div className="user-row">
                  {errorMsg.username && (
                    <p className="errorMsg">{t("login.error.email")}</p>
                  )}
                </div>
                <div className="user-row">
                  <label>{t("login.label.password")}</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => getUserPasswordData(e.target.value)}
                    onKeyDown={handleKeyDown} // Press "Enter" to trigger login
                    placeholder={t("login.label.password")}
                  />
                </div>
                <div className="user-row">
                  {errorMsg.password && (
                    <p className="errorMsg">
                      {t("please enter valid password.")}
                    </p>
                  )}
                </div>
              </div>
              <button
                className="login-form-container-button-common"
                onClick={(e)=>handleLogin(e)}
                disabled={inProgress}
              >
                {inProgress
                  ? t("login.inprogress")
                  : t("login.with_eurolandID")}
              </button>
              {/* <p className="login-form-container-signupbtn">
                {t("login.no_account")}{" "}
                <span onClick={() => setActiveForm("signup")}>
                  {t("login.signup")}
                </span>{" "}
                ?
              </p> */}
            </div>
          )}

          {/* {activeForm === "signup" && (
            <form onSubmit={handleSubmitForm}>
              <div className="login-form-signup">
                <div className="form-row">
                  <div className="form-col">
                    <label className="input-label">
                      {t("login.label.firstname")} <sup>*</sup>{" "}
                    </label>
                    <input
                      ref={inputRef}
                      className="input-type"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target?.value,
                        })
                      }
                      placeholder={t("login.label.firstname")}
                      maxLength={"50"}
                      autofocus
                    />
                    <label className="error-msg">
                      {errorMsg.firstName === true &&
                        t("login.error.firstname")}
                    </label>
                  </div>
                  <div className="form-col">
                    <label className="input-label">
                      {" "}
                      {t("login.label.lastname")}{" "}
                    </label>
                    <input
                      className="input-type"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target?.value,
                        })
                      }
                      maxLength={"50"}
                      placeholder={t("login.label.lastname")}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label className="input-label">
                      {" "}
                      {t("login.label.email")} <sup>*</sup>{" "}
                    </label>
                    <input
                      className="input-type"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target?.value,
                        })
                      }
                      placeholder={t("login.label.email")}
                    />
                    <label className="error-msg">
                      {errorMsg.email === true &&
                        formData.email === "" &&
                        t("login.error.email")}
                      {errorMsg.email === true &&
                        formData.email !== "" &&
                        errorMsg.invalidEmail === true &&
                        t("login.error.invalidEmail")}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label className="input-label">
                      {" "}
                      {t("login.label.jobTitle")} <sup>*</sup>{" "}
                    </label>
                    <input
                      className="input-type"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target?.value,
                        })
                      }
                      placeholder={t("login.label.jobTitle_placeholder")}
                    />
                    <label className="error-msg">
                      {errorMsg.email === true &&
                        formData.email === "" &&
                        t("login.error.jobTitle")}
                    </label>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <label className="input-label">
                      {t("login.label.password")} <sup>*</sup>{" "}
                    </label>
                    <input
                      className="input-type"
                      value={formData.password}
                      onChange={(e) => getUserPasswordData(e.target.value)}
                      placeholder={t("login.label.password")}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-col">
                    <button
                      className="form-button"
                      disabled={inProgress}
                      onClick={handleSubmitForm}
                    >
                      {inProgress ? t("login.inprogress") : t("signup.submit")}
                    </button>
                  </div>
                </div>
              </div>
            </form> 
          )} */}
        </div>
      </div>
    </div>
  );
}
