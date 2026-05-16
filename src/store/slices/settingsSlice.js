import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { settingsAPI } from "../../utils/api";

export const parsePublicSettings = (res) => {
  const body = res?.data;
  if (!body) return {};
  if (body.data && typeof body.data === "object" && !Array.isArray(body.data)) {
    return body.data;
  }
  if (body.public && typeof body.public === "object") {
    return body.public;
  }
  if (body.storeName != null || body.address != null || body.contactEmail != null) {
    return body;
  }
  return {};
};

export const fetchPublicSettings = createAsyncThunk(
  "settings/fetchPublic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await settingsAPI.getPublic();
      return parsePublicSettings(res);
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load settings"
      );
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

