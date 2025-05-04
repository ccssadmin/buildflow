import { createSlice } from "@reduxjs/toolkit";
import { upsertBoq } from "../../actions/Engineer/upsertboqaction";


// Define the initial state of the BOQ slice
const initialState = {
  loading: false,
  success: false,
  error: null,
  boqData: null,
  boqId: null, // Track the BOQ ID
  boqItems: [], // Track the BOQ items
};

const boqSlice = createSlice({
  name: "boq",
  initialState,
  reducers: {
    resetBoqState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.boqData = null;
      state.boqId = null; // Reset the BOQ ID
      state.boqItems = []; // Reset the BOQ items
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertBoq.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertBoq.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.boqData = action.payload;

        // Update state with new BOQ IDs if needed
        if (action.payload.boqId) {
          state.boqId = action.payload.boqId; // Store the new BOQ ID
        }

        if (action.payload.boqItems) {
          // Update BOQ items with their respective IDs
          state.boqItems = action.payload.boqItems.map((item) => ({
            ...item,
            boqItemsId: item.boqItemsId || 0, // Ensure item ID is set correctly
          }));
        }
      })
      .addCase(upsertBoq.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export the reset action to be used elsewhere in the app
export const { resetBoqState } = boqSlice.actions;

// Export the reducer
export default boqSlice.reducer;
