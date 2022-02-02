import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setDataWallet: (state, action) => {
            state.data = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDataWallet } = walletSlice.actions

export default walletSlice.reducer
