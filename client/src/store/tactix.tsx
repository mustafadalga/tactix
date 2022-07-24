import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TactixState {
    room: {
        [key: string]: any;
    },
    username: string
}

const initialState: TactixState = {
    room: {},
    username: JSON.parse(localStorage.getItem('tactix') || '{}').username || ""
}

export const tactixSlice = createSlice({
    name: 'tactix',
    initialState,
    reducers: {
        setRoomInformation: (state, action: PayloadAction<object>) => {
            state.room = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
            localStorage.setItem('tactix', JSON.stringify({
                username: action.payload
            }))
        },
    },
})

export const { setRoomInformation, setUsername } = tactixSlice.actions

export default tactixSlice.reducer