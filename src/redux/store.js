import { configureStore } from "@reduxjs/toolkit";
// import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/authorization";
import { dollsReducer } from "./slices/dolls";
import { galleryReducer } from "./slices/gallery";

const store = configureStore({
  reducer: {
    dolls: dollsReducer,
    gallery: galleryReducer,
    // posts: postsReducer,
    auth: authReducer,
  },
});

export default store;
