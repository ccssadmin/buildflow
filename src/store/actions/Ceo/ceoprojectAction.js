import { createAsyncThunk } from "@reduxjs/toolkit";
import { createceoproject } from "../../../services";

/** CREATE NEW BOARD - KANBAN */
export const createCeoProjectAction = createAsyncThunk(
  "createproject",
  async (params) => {
    const response = await createceoproject(params);
    return response.data;
  }
);