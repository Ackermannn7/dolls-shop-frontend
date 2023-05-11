import { createSlice } from "@reduxjs/toolkit";

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
});

export const dollsReducer = dollsSlice.reducer;
