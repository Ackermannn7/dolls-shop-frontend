import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async () => {
    const { data } = await axios.get("/gallery");
    return data;
  }
);

const initialState = {
  gallery: {
    items: [],
    status: "loading",
  },
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchGallery.pending]: (state) => {
      state.gallery.items = [];
      state.gallery.status = "loading";
    },

    [fetchGallery.fulfilled]: (state, action) => {
      state.gallery.items = action.payload;
      state.gallery.status = "loaded";
    },

    [fetchGallery.rejected]: (state) => {
      state.gallery.items = [];
      state.gallery.status = "error";
    },
  },
});

export const galleryReducer = gallerySlice.reducer;
