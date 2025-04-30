import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTicket, createprojectapproval, getTicketById, updateprojectapproval } from "../../../services";

export const createticketAction = createAsyncThunk(
  "createTicket",
  async (ticketPayload) => {
    const response = await addTicket(ticketPayload);
    return response.data;
  }
);

export const getticketbyidAction = createAsyncThunk(
  "getticket/byid",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await getTicketById(ticketId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProjectApprovalAction = createAsyncThunk(
  'updateprojectapproval/submit',
  async (approvalPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MASTER_API_BASE_URL}/api/Ticket/update-ticket-by-id`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${approvalPayload.token}`,
          },
          body: JSON.stringify(approvalPayload),
        }
      );

      if (!response.ok) {
        // Attempt to parse error response
        let errorMessage = 'Failed to update project approval';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (err) {
          // Do nothing; fallback to default error message
        }
        return rejectWithValue(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred during the update');
    }
  }
);
