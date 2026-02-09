import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { settingsAPI } from "../../utils/api";

export const fetchPublicSettings = createAsyncThunk(
  "settings/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await settingsAPI.getPublic();
      // Support common API shapes: {data:{...}}, {data:{data:{...}}}
      return res?.data?.data ?? res?.data ?? {};
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err?.message || "Failed to load settings");
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedAt: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
        state.lastFetchedAt = Date.now();
      })
      .addCase(fetchPublicSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load settings";
      });
  },
});

export default settingsSlice.reducer;

