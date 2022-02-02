import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataUsers: (state, action) => {
            state.data = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDataUsers } = userSlice.actions

export default userSlice.reducer
