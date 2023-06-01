import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchProducts = createAsyncThunk(
  "dolls/fetchProducts",
  async ({ sort, searchValue, page }) => {
    const { data } = await axios.get(
      `/dolls?page=${page}&sort=${sort.sort},${sort.order}&searchValue=${searchValue}`
    );
    return data;
  }
);

export const fetchProductsForCarousel = createAsyncThunk(
  "dolls/fetchProductsForCarousel",
  async () => {
    const { data } = await axios.get(`/dollsCarousel`);
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
    [fetchProductsForCarousel.pending]: (state) => {
      state.dolls.status = "loading";
    },

    [fetchProductsForCarousel.fulfilled]: (state, action) => {
      state.dolls.items = action.payload;
      state.dolls.status = "loaded";
    },

    [fetchProductsForCarousel.rejected]: (state) => {
      state.dolls.items = [];
      state.dolls.status = "error";
    },
  },
});

export const dollsReducer = dollsSlice.reducer;
