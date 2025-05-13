import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLogin,
  logout,
  getUserInfo,
  getUserDetailsById,
  agencyUserSignUp,
  refreshToken
} from "../../services";

export const loginAction = createAsyncThunk("login", async params => {
  const response = await getLogin(params);
  return response.data;
});

export const refreshTokenAction = createAsyncThunk("refreshToken", async (refreshToken) => {
  const response = await refreshToken({ refreshToken });
  return response.data;
});

export const logoutAction = createAsyncThunk("logout", async params => {
  const response = await logout(params);
  return response.data;
});

export const userInfoAction = createAsyncThunk("userInfo", async params => {
  const response = await getUserInfo(params);
  return response.data;
});

export const userDetailsByIdAction = createAsyncThunk("userDetailsById", async params => {
  const response = await getUserDetailsById(params);
  return response.data;
});

export const agencyUserSignUpAction = createAsyncThunk("agencyUserSignUp", async params => {
  const response = await agencyUserSignUp(params);
  return response.data;
});