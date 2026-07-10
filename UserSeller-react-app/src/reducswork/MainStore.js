import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./UserSlice";
import cartReducer from "./CartSlice"


const MainStore = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export default MainStore