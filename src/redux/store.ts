import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './products/products.slice'
import authReducer from './auth/auth.slice';
import cartReducer from "./cart/cart.slice";

const store = configureStore ({

    reducer:{
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
    }

});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;