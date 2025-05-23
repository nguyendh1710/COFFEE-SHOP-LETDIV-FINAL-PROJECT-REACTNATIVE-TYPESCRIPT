import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HOST=process.env.EXPO_PUBLIC_API_HOST ??'http://192.168.1.4:5000';

export const instance = axios.create({
    baseURL:HOST,
     headers: {
    "Content-Type": "application/json",
  },
});
// thêm interceptors để tự động thêm token vào request khi người dùng gửi yêu cầu
instance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});