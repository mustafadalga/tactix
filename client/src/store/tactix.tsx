import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import StoneInterface from "../types/StoneInterface";

export interface TactixState {
    room: {
        [key: string]: any;
    },
    username: string,
    moves: StoneInterface[],
    selectedStones: StoneInterface[],
}

const initialState: TactixState = {
    room: {},
    moves: [],
    selectedStones: [],
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
        setMoves: (state, action: PayloadAction<StoneInterface[]>) => {
            state.moves = action.payload;
        },
        setMove: (state, action: PayloadAction<StoneInterface>) => {
            if (state.moves.some(move => move.row == action.payload.row && move.col == action.payload.col)) return;

            state.moves.push(action.payload);
        },
        setSelectedStone: (state, action: PayloadAction<StoneInterface>) => {
            state.selectedStones.push(action.payload);
        },
        removeSelectedStones: (state) => {
            state.selectedStones = [];
        },
    },
})

export const {
    setRoomInformation,
    setUsername,
    setMove,
    setMoves,
    setSelectedStone,
    removeSelectedStones
} = tactixSlice.actions

export default tactixSlice.reducer