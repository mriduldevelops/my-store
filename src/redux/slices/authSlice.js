import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.loading = false;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuthUser, clearAuth, setAuthLoading } = authSlice.actions;

export const selectAuthUser = (state) => state.auth.user;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
