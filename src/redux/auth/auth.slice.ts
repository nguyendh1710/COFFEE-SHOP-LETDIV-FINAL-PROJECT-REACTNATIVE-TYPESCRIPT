import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, checkLoginStatusThunk } from "./auth.thunk";
import { RootStackParamList } from "../../navigation/NavigationService";

type RedirectScreen = keyof RootStackParamList | null;

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any;
  error: string | null;
  redirectAfterLogin: RedirectScreen;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  error: null,
  redirectAfterLogin: null as keyof RootStackParamList | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
    //loginSuccess NẰM BÊN TRONG reducers
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    setRedirectAfterLogin: (state, action) => {
      state.redirectAfterLogin = action.payload;
    },
    clearRedirect: (state) => {
      state.redirectAfterLogin = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user; // Update user data from API response
        console.log("slice da nhan du lieu ve tu thunk api", state.user)
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      .addCase(checkLoginStatusThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkLoginStatusThunk.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
      });
  }
});

export const { logout, loginSuccess, setRedirectAfterLogin, clearRedirect } = authSlice.actions;
export default authSlice.reducer;
