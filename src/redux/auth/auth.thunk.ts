import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, HOST } from "../../helpers/fetcher";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { Platform } from "react-native";

type UserInfoLogin = {
  email: string;
  passWord: string;

};
type UserInfoSignUp = {
  userName: string;
  phone: string;
  address: string;
  email: string;
  passWord: string;
  confirmPassWord: string;
  avatar: string;
  role: string | null; // cần chắc chắn avatar là string hoặc null;
};
//dang nhap
export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (
    data: UserInfoLogin,
    { rejectWithValue }
  ) => {
    try {

      const response = await instance.post("/api/users/login", {
        email: data.email,
        password: data.passWord,
      });
      // Log toàn bộ phản hồi từ server
      // console.log("Phản hồi từ server:", response);
      const { token, user } = response.data;
      // Gắn URL đầy đủ vào avatar 
      const fixedUser = {
        ...user,
        avatar: user.avatar?.path
          ? `${HOST}/${user.avatar.path.replace(/\\/g, "/")}`
          : null,
      };
      await AsyncStorage.setItem("token", token);

      return { token, user: fixedUser };
      console.log("thunks da nhan", user)
    } catch (err) {
      const error = err as AxiosError; // Ép kiểu
      // Log chi tiết lỗi
      // console.error("🔥 Axios error:", {
      //   message: error.message,
      //   code: error.code,
      //   response: error.response,
      //   request: error.request,
      // });

      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue("Sai tài khoản hoặc mật khẩu");
        } else {
          return rejectWithValue("Lỗi từ máy chủ");
        }
      } else {
        return rejectWithValue("Không thể kết nối tới máy chủ");
      }
    }
  }
);
//kiem tra dang nhap chua hki vao lai app
export const checkLoginStatusThunk = createAsyncThunk(
  "auth/checkLoginStatusThunk",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return rejectWithValue("No token found");

      const response = await instance.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      return { token, user };
    } catch (err) {
      return rejectWithValue("Token không hợp lệ hoặc lỗi máy chủ");
    }
  }
);
// dang ky
export const signupThunk = createAsyncThunk(
  "auth/signupThunk",
  async (
    data: FormData,
    { rejectWithValue }
  ) => {
    try {
      const response = await instance.post("/api/users/register", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
