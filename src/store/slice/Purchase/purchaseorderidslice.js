// src/redux/slices/purchaseSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { getNewPoId } from "../../actions/Purchase/purcharseorderidaction";

const initialState = {
  poId: null,
  loading: false,
  error: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    resetPoId(state) {
      state.poId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { resetPoId } = purchaseSlice.actions;

export default purchaseSlice.reducer;
