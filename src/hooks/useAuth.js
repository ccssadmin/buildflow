import { useCallback, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector, setAuthAction, setRefreshTokenAction } from "../store/slice/auth";
import {
  loginAction,
  logoutAction,
  userInfoAction,
  userDetailsByIdAction,
  refreshTokenAction
} from "../store/actions";

const useAuth = () => {
  const dispatch = useDispatch();
  const { 
    data, 
    loading, 
    error, 
    logoutError, 
    logoutLoading,
    refreshTokenLoading,
    refreshTokenError
  } = useSelector(authSelector);

  const getAuth = useCallback((params) => dispatch(loginAction(params)), [dispatch]);
  const setAuth = useCallback((params) => dispatch(setAuthAction(params)), [dispatch]);
  const setRefreshToken = useCallback((params) => dispatch(setRefreshTokenAction(params)), [dispatch]);
  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);
  const getUserInfo = useCallback((params) => dispatch(userInfoAction(params)), [dispatch]);
  const getUserDetailsById = useCallback((params) => dispatch(userDetailsByIdAction(params)), [dispatch]);
  const refreshToken = useCallback((refreshToken) => dispatch(refreshTokenAction(refreshToken)), [dispatch]);

  return [
    { 
      data, 
      loading, 
      error, 
      logoutError, 
      logoutLoading,
      refreshTokenLoading,
      refreshTokenError
    },
    { 
      getAuth, 
      setAuth, 
      setRefreshToken,
      getUserInfo, 
      getUserDetailsById, 
      logout,
      refreshToken
    },
  ];
};

export default useAuth;