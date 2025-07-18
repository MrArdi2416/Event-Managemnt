import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  } | null;
}

// ✅ Load from localStorage if available
const savedUser = localStorage.getItem("user");
const initialState: AuthState = {
  isAuthenticated: !!savedUser,
  user: savedUser ? JSON.parse(savedUser) : null,   
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState["user"]>) {
      state.isAuthenticated = true;
      state.user = action.payload;

      // ✅ Persist to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      // state.user = null;
      // // ✅ Remove from localStorage
      // localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
