import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

export const TransactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setDataTransaction: (state, action) => {
            state.data = action.payload;
        },
        addTransaction:(state, action) => {
            state.data.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDataTransaction, addTransaction } = TransactionSlice.actions

export default TransactionSlice.reducer
