import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./user.slice";
import walletSlice from "./data.slice";
import transactionSlice from "./transaction.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        wallet: walletSlice,
        transaction: transactionSlice
    }
})
