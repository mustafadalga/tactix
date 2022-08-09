import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IStoneInterface from "../types/IStoneInterface";

export interface TactixState {
    room: {
        [key: string]: any;
    },
    username: string,
    removedStones: IStoneInterface[],
    selectedStones: IStoneInterface[],
}

const initialState: TactixState = {
    room: {},
    removedStones: [],
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
        setRemovedStones: (state, action: PayloadAction<IStoneInterface[]>) => {
            state.removedStones = action.payload;
        },
        setRemovedStone: (state, action: PayloadAction<IStoneInterface>) => {
            if (state.removedStones.some(removedStone => removedStone.row == action.payload.row && removedStone.col == action.payload.col)) return;

            state.removedStones.push(action.payload);
        },
        setSelectedStone: (state, action: PayloadAction<IStoneInterface>) => {
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
    setRemovedStone,
    setRemovedStones,
    setSelectedStone,
    removeSelectedStones
} = tactixSlice.actions

export default tactixSlice.reducer