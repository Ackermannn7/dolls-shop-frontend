import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authorization";
import { dollsReducer } from "./slices/dolls";
import { galleryReducer } from "./slices/gallery";
import cart from "./slices/cart";

const store = configureStore({
  reducer: {
    cart,
    dolls: dollsReducer,
    gallery: galleryReducer,
    auth: authReducer,
  },
});

export default store;
