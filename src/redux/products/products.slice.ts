import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductsThunk,
  fetchSearchProductsThunk,
  fetchProductDetailThunk,
  fetchPatchProductThunk,
} from "./products.thunk";

// Kiểu sản phẩm phải đúng trên backend trả về
export type Product= {
  id: string;
  name: string;
  type: string;
  price: number;
  discount: string;
  profit: string;
  source: string;
  way: string;
  image: string;
}

type ProductState= {
  products: Product[];
  loading: boolean;
  selectedProduct: Product | null;
  error?: string | null;
  status?: string | null;
}
const initialState: ProductState = {
  products: [],
  loading: false,
  selectedProduct: null,
  error: null,
  status: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState:initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload); // Không gán lại id
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Tất cả sản phẩm
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
    
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })

      // Tìm kiếm sản phẩm
      .addCase(fetchSearchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload; // phải ghi đè
        state.loading = false;
      })
      .addCase(fetchSearchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })

      // Chi tiết sản phẩm
      .addCase(fetchProductDetailThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })

      // Cập nhật sản phẩm
      .addCase(fetchPatchProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      });
  },
});

export const { addProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
