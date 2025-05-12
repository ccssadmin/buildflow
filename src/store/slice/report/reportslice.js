import { createSlice } from '@reduxjs/toolkit';
import { getReportAttachmentsById, getReportById, getReports, uploadReportAttachments, upsertReport } from '../../actions/report/reportcreateaction';

const reportSlice = createSlice({
    name: 'report',
    initialState: {
      loading: false,
      success: false,
      error: null,
      reportDetails: null,
      attachments: [],
      uploadMessage: '',
    },
    reducers: {
      resetReportState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.reportDetails = null;
        state.attachments = [];
        state.uploadMessage = ''; // Reset uploadMessage as well
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(upsertReport.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(upsertReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(upsertReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // ✅ getReports actions
      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // adjust if needed
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReportById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reportDetails = action.payload.data;
      })
      .addCase(getReportById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Report Attachments
      .addCase(getReportAttachmentsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportAttachmentsById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.attachments = action.payload.data || [];
      })
      .addCase(getReportAttachmentsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch report attachments';
      })
      
      builder
  .addCase(uploadReportAttachments.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(uploadReportAttachments.fulfilled, (state, action) => {
    state.loading = false;
    state.success = true;
    state.uploadMessage = action.payload.message;
  })
  .addCase(uploadReportAttachments.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || 'File upload failed';
  });
      
      
      
      ;



      
  },
});

export const { resetReportState } = reportSlice.actions;
export default reportSlice.reducer;
