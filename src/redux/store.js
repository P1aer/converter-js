import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./user.slice";
import walletSlice from "./data.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        wallet: walletSlice
    }
})
