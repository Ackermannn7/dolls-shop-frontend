import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchProducts = createAsyncThunk(
  "dolls/fetchProducts",
  async () => {
    const { data } = await axios.get("/dolls");
    return data;
  }
);

const initialState = {
  dolls: {
    items: [],
    status: "loading",
  },
};

const dollsSlice = createSlice({
  name: "dolls",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.dolls.items = [];
      state.dolls.status = "loading";
    },

    [fetchProducts.fulfilled]: (state, action) => {
      state.dolls.items = action.payload;
      state.dolls.status = "loaded";
    },

    [fetchProducts.rejected]: (state) => {
      state.dolls.items = [];
      state.dolls.status = "error";
    },
  },
});

export const dollsReducer = dollsSlice.reducer;
