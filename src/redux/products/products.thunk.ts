import { instance, HOST } from "../../helpers/fetcher";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./products.slice"; // Giả sử bạn export Product interface ở đó
import { Platform } from "react-native";
import { ProductInput } from "../../screens/Admin/ProductForm/ProductForm";
// Thunk để lấy tất cả sản phẩm
export const fetchProductsThunk = createAsyncThunk<Product[]>(
  "products/fetchProductsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/products");
      const products = response.data.map((item: any) => ({
        ...item,
        id: item._id,
        image: item.image?.path
          ? `${HOST}/${item.image.path.replace(/\\/g, "/")}`
          : null,
      }));
      return products as Product[];

    } catch (error: any) {
      console.error("Fetch products error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk để tìm kiếm sản phẩm theo tên
export const fetchSearchProductsThunk = createAsyncThunk<Product[], string>(
  "products/fetchSearchProductsThunk",
  async (search = "", { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/products", {
        params: { search },
      });
      console.log("Searched products:", response.data);
      return response.data as Product[];
    } catch (error: any) {
      console.error("Search products error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk lấy chi tiết sản phẩm theo ID
export const fetchProductDetailThunk = createAsyncThunk<Product, number>(
  "products/fetchProductDetail",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error("Get product detail error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk tạo mới sản phẩm
export const createProductThunk = createAsyncThunk(
  "auth/createProductThunk",
  async (data: ProductInput, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("price", data.price.toString());
      formData.append("discount", data.discount);
      formData.append("profit", data.profit);
      formData.append("source", data.source);
      formData.append("way", data.way);

      if (typeof data.image === "string" && data.image.startsWith("file")) {
        formData.append("image", {
          uri: Platform.OS === "android" ? data.image : data.image.replace("file://", ""),
          type: "image/jpeg",
          name: "avatar.jpg",
        } as any);
      }

      const response = await instance.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        ...response.data.product,
        id: response.data.product._id,
        image: response.data.product.image?.path
          ? `${HOST}/${response.data.product.image.path.replace(/\\/g, "/")}`
          : null,
      } as Product;

    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Thunk cập nhật sản phẩm theo ID
export const fetchPatchProductThunk = createAsyncThunk(
  "products/fetchPatchProductThunk",
  async (
    { productId, updatedData }: { productId: string; updatedData: Partial<ProductInput> },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.type) formData.append("type", updatedData.type);
      if (updatedData.price !== undefined) formData.append("price", updatedData.price.toString());
      if (updatedData.discount) formData.append("discount", updatedData.discount);
      if (updatedData.profit) formData.append("profit", updatedData.profit);
      if (updatedData.source) formData.append("source", updatedData.source);
      if (updatedData.way) formData.append("way", updatedData.way);

      if (
        updatedData.image &&
        typeof updatedData.image === "string" &&
        updatedData.image.startsWith("file")
      ) {
        formData.append("image", {
          uri: Platform.OS === "android"
            ? updatedData.image
            : updatedData.image.replace("file://", ""),
          type: "image/jpeg",
          name: "updated-image.jpg",
        } as any);
      }

      const response = await instance.patch(
        `/api/products/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return {
        ...response.data.product,
        id: response.data.product._id,
        image: response.data.product.image?.path
          ? `${HOST}/${response.data.product.image.path.replace(/\\/g, "/")}`
          : null,
      } as Product;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Thunk xóa sản phẩm theo ID
export const deleteProductThunk = createAsyncThunk<
  string, // kiểu giá trị trả về khi thành công: ID của sản phẩm bị xóa
  string, // kiểu giá trị đầu vào: ID sản phẩm
  { rejectValue: string } // kiểu reject nếu lỗi
>(
  "products/deleteProductThunk",
  async (productId, { rejectWithValue }) => {
    try {
      await instance.delete(`/api/products/${productId}`);
      console.log(`Deleted product with ID: ${productId}`);
      return productId; // trả lại ID để reducer biết xóa cái nào
    } catch (error: any) {
      console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);