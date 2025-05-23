import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem } from "./cart.slice";
import { instance } from "../../helpers/fetcher";

// Lấy cart từ server theo userId
export const fetchCartByUser = createAsyncThunk(
  "cart/fetchCartByUser",
  async (userId: string, thunkAPI) => {
    try {
      const response = await instance.get(`/api/users/${userId}/cart`);
      return response.data.items as CartItem[];
    } catch (error) {
      return thunkAPI.rejectWithValue("Không thể lấy giỏ hàng");
    }
  }
);

// Đồng bộ cart lên server
export const syncCartToServer = createAsyncThunk<
  boolean, // return true khi thành công
  { userId: string; cartItems: CartItem[] }, // params
  { rejectValue: string }
>(
  "cart/syncCartToServer",
  async ({ userId, cartItems }, thunkAPI) => {
    try {
      await instance.post(`/api/users/${userId}/cart`, { items: cartItems });
      return true;
    } catch (error) {
      console.error("Lỗi khi đồng bộ giỏ hàng:", error);
      return thunkAPI.rejectWithValue("Không thể đồng bộ giỏ hàng");
    }
  }
);
