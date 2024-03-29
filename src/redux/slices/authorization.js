import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchForgotPassword = createAsyncThunk(
  "auth/fetchForgotPassword",
  async (email) => {
    const response = await axios.post("/auth/forgotPassword", email);
    console.log(response.data); // Убедитесь, что это содержит ваше сообщение
    return response.data; // Верните только данные, которые вам нужны
  }
);

export const fetchResetPassword = createAsyncThunk(
  "auth/fetchResetPassword",
  async (data) => {
    console.log(data);

    const { token } = data; // Извлекаем токен из объекта data

    const response = await axios.put(`/auth/resetPassword/${token}`, data);
    console.log(response.data);
    return response.data;
  }
);

export const fetchLogout = createAsyncThunk(
  "auth/fetchLogout",
  async (params) => {
    const { data } = await axios.get("/auth/logout", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "/auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);
const initialState = {
  data: null,
  response: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchForgotPassword.pending]: (state) => {
      state.status = "loading";
      state.response = null;
    },

    [fetchForgotPassword.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.response = action.payload;
    },

    [fetchForgotPassword.rejected]: (state, action) => {
      state.status = "error";
      state.response = action.payload;
    },
    [fetchResetPassword.pending]: (state) => {
      state.status = "loading";
      state.response = null;
    },

    [fetchResetPassword.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.response = action.payload;
    },

    [fetchResetPassword.rejected]: (state, action) => {
      state.status = "error";
      state.response = action.payload;
    },
    [fetchLogout.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchLogout.fulfilled]: (state) => {
      state.status = "loaded";
      state.data = null;
    },

    [fetchLogout.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },

    [fetchRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchRegister.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
