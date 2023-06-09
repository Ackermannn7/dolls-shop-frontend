import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchOrderHistory = createAsyncThunk(
  "order/orderHistory",
  async (_id) => {
    const { data } = await axios.get(`/orderHistory/${_id}`);
    return data;
  }
);
export const fetchOneOrder = createAsyncThunk("order/oneOrder", async (id) => {
  const { data } = await axios.get(`/order/${id}`);
  return data;
});

export const saveOrder = createAsyncThunk(
  "order/saveOrder",
  async ({ userData, items, totalPrice, formData }) => {
    const { data } = await axios.post(`/saveOrder`, {
      userData,
      items,
      totalPrice,
      formData,
    });
    return data;
  }
);

const initialState = {
  data: {
    items: [],
    total: 0,
  },
  status: "loading",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrderHistory.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchOrderHistory.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchOrderHistory.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchOneOrder.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchOneOrder.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchOneOrder.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const orderReducer = orderSlice.reducer;
