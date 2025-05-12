// src/redux/actions/getReports.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';


export const upsertReport = createAsyncThunk(
  'report/upsertReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await api.POST(
        'https://buildflowgraphql.crestclimbers.com/api/Report/upsert-report',
        reportData
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data || err.message || 'Unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);


  export const getReports = createAsyncThunk(
    "report/getReports",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.GET("/api/Report/getreport");
        return response.data; // Adjust based on your API structure
      } catch (error) {
        console.error("Get Reports API Error:", error);
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );
  

  export const getReportById = createAsyncThunk(
    "report/getById",
    async (reportId, { rejectWithValue }) => {
      try {
        const response = await api.GET(`/api/Report/getreportbyid?reportid=${reportId}`);
        return response.data; // response shape: { message, data: { ... } }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch report");
      }
    }
  );


  export const getReportAttachmentsById = createAsyncThunk(
    'report/getReportAttachmentsById',
    async (reportId, { rejectWithValue }) => {
      try {
        const response = await api.GET(`/api/Report/getreportattachmentbyid?reportid=${reportId}`);
        return response.data; // this includes `message` and `data` (array of attachments)
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

  export const uploadReportAttachments = createAsyncThunk(
    'report/uploadReportAttachments',
    async ({ reportId, files, stringItem }, { rejectWithValue }) => {
      try {
        const formData = new FormData();
        formData.append('stringItem', 'Your string value');
        
        // Append all files
        for (const file of files) {
          formData.append('files', file); // "files" matches backend key
        }
        
        // Append the string item
        if (stringItem) {
          formData.append('stringItem', stringItem); // Make sure this matches backend expectations
        }
        
        const response = await api.POST(
          `/api/Report/upload-attachments?reportId=${reportId}`,
          formData
        );
        
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Upload failed');
      }
    }
  );
  

  