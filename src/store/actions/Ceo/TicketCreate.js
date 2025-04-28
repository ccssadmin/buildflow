import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTicket, createprojectapproval } from "../../../services";

export const createticketAction = createAsyncThunk(
  "createTicket",
  async (ticketPayload) => {
    const response = await addTicket(ticketPayload);
    return response.data;
  }
);

export const createprojectapprovalAction = createAsyncThunk(
  "projectApproval",
  async (approvalPayload) => {
    const response = await  createprojectapproval(approvalPayload);
    return response.data;
  }
)