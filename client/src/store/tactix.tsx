import { createSlice } from '@reduxjs/toolkit'

export interface TactixState {

}

const initialState: TactixState = {

}

export const tactixSlice = createSlice({
    name: 'tactix',
    initialState,
    reducers: {
    },
})

export const {   } = tactixSlice.actions

export default tactixSlice.reducer