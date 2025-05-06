import { createSlice } from "@reduxjs/toolkit";
import { getNewPoId, upsertPurchaseOrder } from "../../actions/Purchase/purcharseorderidaction";

const initialState = {
  poId: null,
  loading: false,
  error: null,
  submissionStatus: null, // 'pending', 'success', 'error'
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    resetPoId(state) {
      state.poId = null;
      state.error = null;
      state.submissionStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get New PO ID
      .addCase(getNewPoId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewPoId.fulfilled, (state, action) => {
        state.loading = false;
        state.poId = action.payload;
      })
      .addCase(getNewPoId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upsert Purchase Order
      .addCase(upsertPurchaseOrder.pending, (state) => {
        state.submissionStatus = "pending";
        state.error = null;
      })
      .addCase(upsertPurchaseOrder.fulfilled, (state) => {
        state.submissionStatus = "success";
      })
      .addCase(upsertPurchaseOrder.rejected, (state, action) => {
        state.submissionStatus = "error";
        state.error = action.payload;
      });
  },
});

export const { resetPoId } = purchaseSlice.actions;

export default purchaseSlice.reducer;
