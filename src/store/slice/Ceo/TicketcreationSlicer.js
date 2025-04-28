import { createSlice } from "@reduxjs/toolkit";
import { createticketAction } from "../../actions/Ceo/TicketCreate";

const initialState = {
    createticket: [],
    loading: false,
    error: null,
    success: false,
};

const createticketSlice = createSlice({
    name: 'createticket',
    initialState,
    reducers:{ },
    extraReducers: (builder)=>{
        builder 
        .addCase(createticketAction.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createticketAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.createticket.push(action.payload);
        })
        .addCase(createticketAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
    },
});

export default createticketSlice.reducer;