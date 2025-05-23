import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCartByUser, syncCartToServer } from "./cart.thunk";

export type CartItem = {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  discount: string;
  image: string;
  userId: string;
};

type CartState = {
  cart: CartItem[];
  loading: boolean;
  selectedProduct: CartItem | null;
  error?: string | null;
  status?: string | null;
  voucher?: string | null;
};

const initialState: CartState = {
  cart: [],
  loading: false,
  selectedProduct: null,
  error: null,
  status: null,
  voucher: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      const item = {
        ...action.payload,
        userId: action.payload.userId ?? "unknown",
      };
      if (index !== -1) {
        state.cart[index].quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(i => i.id !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    addVoucher(state, action: PayloadAction<string>) {
      state.voucher = action.payload;
    },
    clearVoucher: (state) => {
      state.voucher = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartByUser.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedItems = action.payload;

        // Gộp cart hiện tại với cart backend, ưu tiên quantity lớn hơn
        const mergedCart = [...state.cart];

        fetchedItems.forEach(item => {
          const existing = mergedCart.find(i => i.id === item.id);
          if (existing) {
            existing.quantity = Math.max(existing.quantity, item.quantity);
          } else {
            mergedCart.push(item);
          }
        });

        state.cart = mergedCart;
      })
      .addCase(fetchCartByUser.rejected, (state, action) => {
        state.loading = false;
        state.cart = [];
        state.error = action.payload as string;
      })
      // syncCartToServer
      .addCase(syncCartToServer.pending, (state) => {
        state.status = "syncing";
        state.error = null;
      })
      .addCase(syncCartToServer.fulfilled, (state) => {
        state.status = "synced";
      })
      .addCase(syncCartToServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addToCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  addVoucher, clearVoucher
} = cartSlice.actions;
export default cartSlice.reducer;
