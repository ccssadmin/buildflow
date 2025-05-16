// src/redux/actions/getReports.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
const BASE_URL = process.env.REACT_APP_MASTER_API_BASE_URL;

export const upsertReport = createAsyncThunk(
  'report/upsertReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await api.POST(
        `https://buildflowgraphql.crestclimbers.com/api/Report/upsert-report`,
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
      const response = await api.GET(`https://buildflowgraphql.crestclimbers.com/api/Report/getreport`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
    }
  );
  

// Get report by ID
export const getReportById = createAsyncThunk(
  'report/getById',
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await api.GET(`https://buildflowgraphql.crestclimbers.com/api/Report/getreportbyid?reportid=${reportId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report');
    }
  }
);

// Get attachments by report ID
export const getReportAttachmentsById = createAsyncThunk(
  'report/getReportAttachmentsById',
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await api.GET(`https://buildflowgraphql.crestclimbers.com/api/Report/getreportattachmentbyid?reportid=${reportId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
  


export const uploadReportAttachments = createAsyncThunk(
  'report/uploadReportAttachments',
  async ({ reportId, files, stringItem }, { rejectWithValue, getState }) => {
    try {
      console.log("REPORT UPLOAD INPUT:", {
        reportId,
        filesCount: files?.length || 0,
        stringItemPresent: !!stringItem
      });

      // Get auth token
      const token = getState().auth.activeUser?.data?.accessToken;
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      // Validations
      if (!reportId) {
        return rejectWithValue("Report ID is required.");
      }

      if (!files || !Array.isArray(files) || files.length === 0) {
        return rejectWithValue("At least one file must be provided.");
      }

      // Prepare FormData
      const formData = new FormData();
      if (stringItem) {
        formData.append('stringItem', stringItem);
      }

      for (const file of files) {
        if (!(file instanceof File)) {
          return rejectWithValue("Invalid file detected in the upload list.");
        }
        formData.append('files', file);
      }

      const response = await api.POST(
        `https://buildflowgraphql.crestclimbers.com/api/Report/upload-attachments?reportId=${reportId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      console.log("REPORT UPLOAD SUCCESS:", response.data);
      return { ...response.data, reportId };

    } catch (error) {
      console.error("UPLOAD ERROR:", {
        message: error.message,
        responseData: error.response?.data,
        responseStatus: error.response?.status
      });

      return rejectWithValue(error.response?.data || 'Failed to upload report attachments');
    }
  }
);

  

  // Get new report code
export const getNewReportCode = createAsyncThunk(
  'report/getNewReportCode',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.GET(`https://buildflowgraphql.crestclimbers.com/api/Report/Get-NewReportCode`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch new report code');
    }
  }
);