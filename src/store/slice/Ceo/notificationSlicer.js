import { createSlice } from "@reduxjs/toolkit";
import { createnotificationAction } from "../../actions/Ceo/createNotification";

const initialState = {
    createnotify: [],
    loading: false,
    error: null,
    success: false,
};

const createnotifySlice = createSlice({
    name: 'createnotify',
    initialState,
    reducers:{ },
    extraReducers: (builder)=>{
        builder 
        .addCase(createnotificationAction.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createnotificationAction.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.createnotify.push(action.payload);
        })
        .addCase(createnotificationAction.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
            state.success = false;
        });
    },
});

export default createnotifySlice.reducer;