import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accesstoken: string | null;
  refreshtoken?: string | null;
  user: {
    id: string;
    restaurantName: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  accesstoken: null,
  refreshtoken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.accesstoken = action.payload.accesstoken;
      state.refreshtoken = action.payload.refreshtoken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accesstoken = null;
      state.refreshtoken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;