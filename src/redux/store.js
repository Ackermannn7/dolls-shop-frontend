import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authorization";
import { dollsReducer } from "./slices/dolls";
import { galleryReducer } from "./slices/gallery";
import { commentsReducer } from "./slices/comments";
import { orderReducer } from "./slices/order";
import cart from "./slices/cart";

const store = configureStore({
  reducer: {
    cart,
    order: orderReducer,
    comments: commentsReducer,
    dolls: dollsReducer,
    gallery: galleryReducer,
    auth: authReducer,
  },
});

export default store;
