import { createSlice } from "@reduxjs/toolkit";
import { createticketAction, getticketbyidAction, updateProjectApprovalAction } from "../../actions/Ceo/TicketCreateAction";

const initialState = {
    ticketDetails: null,
    createticket: [],
    approvals: [],
    loading: false,
    error: null,
    success: false,
};

const createticketSlice = createSlice({
    name: 'createticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(createticketAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createticketAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.createticket.push(action.payload);
        })
        .addCase(createticketAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        })
        .addCase(getticketbyidAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getticketbyidAction.fulfilled, (state, action) => {
            state.loading = false;
            state.ticketDetails = action.payload;
        })
        .addCase(getticketbyidAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProjectApprovalAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateProjectApprovalAction.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            if (state.ticketDetails) {
              state.ticketDetails.isapproved = action.payload.isapproved;
              state.ticketDetails.approved_by = action.payload.approved_by || "Unknown";
            }
        })
        .addCase(updateProjectApprovalAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to update project approval';
            state.success = false;
        });
    },
});

export default createticketSlice.reducer;
