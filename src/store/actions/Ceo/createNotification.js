import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNotification } from "../../../services";

export const createnotificationAction = createAsyncThunk(
  "createTicket",
  async (notificationPayload) => {
    const response = await createNotification(notificationPayload);
    return response.data;
  }
);