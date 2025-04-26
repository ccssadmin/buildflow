import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTicket } from "../../../services";

export const createticketAction = createAsyncThunk(
  "createTicket",
  async (ticketPayload) => {
    const response = await addTicket(ticketPayload);
    return response.data;
  }
);