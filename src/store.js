import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import CartReducer from "./features/cart/cartSlice.js";


const store = configureStore({
    reducer: {
        user: userReducer,
        cart: CartReducer
    }
})
export default store;