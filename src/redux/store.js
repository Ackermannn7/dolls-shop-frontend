import { configureStore } from "@reduxjs/toolkit";
// import { postsReducer } from "./slices/posts";
// import { authReducer } from "./slices/auth";
import { dollsReducer } from "./slices/dolls";
const store = configureStore({
  reducer: {
    dolls: dollsReducer,
    // posts: postsReducer,
    // auth: authReducer,
  },
});

export default store;
