import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../axios";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const { data } = await axios.get(
//       "/products"
//       // , {
//       //   params: { shop: `${shopName}` },
//       // }
//     );
//     return data;
//   }
// );

const initialState = {
  items: [],
  totalPrice: 0,
  status: "loading",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addProduct(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((sum, obj) => {
    //     return obj.price + sum;
    //   }, 0);
    // },
    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeProduct(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  //   extraReducers: {
  //     // [fetchProducts.pending]: (state) => {
  //     //   state.products.items = [];
  //     //   state.products.status = "loading";
  //     // },
  //     // [fetchProducts.fulfilled]: (state, action) => {
  //     //   state.products.items = action.payload;
  //     //   state.products.status = "loaded";
  //     // },
  //     // [fetchProducts.rejected]: (state) => {
  //     //   state.products.items = [];
  //     //   state.products.status = "error";
  //     // },
  //   },
});
export const { addProduct, removeProduct, minusProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
