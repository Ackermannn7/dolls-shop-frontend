import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (dollId) => {
    const { data } = await axios.get(`/dolls/comments/${dollId}`);
    return data;
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ dollId, comment, userData }) => {
    const { data } = await axios.post(`/comments/${dollId}`, {
      dollId,
      comment,
      userData,
    });
    return data;
  }
);
const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducer: {},
  extraReducers: {
    [createComment.pending]: (state) => {
      state.comments.status = "loading";
    },

    [createComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
      state.comments.status = "loaded";
    },

    [createComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },

    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loading";
    },

    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },

    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
