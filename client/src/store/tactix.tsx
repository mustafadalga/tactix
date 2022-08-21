import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IStoneInterface from "@/types/IStoneInterface";
import TactixState from "@/types/ITactixState";
import IModalVisibility from "@/types/IModalVisibility";


const localStorageName = "tactix";
const initialState: TactixState = {
    room: {},
    removedStones: [],
    selectedStones: [],
    localStorage: JSON.parse(localStorage.getItem(localStorageName) || '{}'),
    gameExit: false,
    modals: {
        gameExitConfirm: {
            status: false,
            data: {}
        },
        gameExitWarning: {
            status: false,
            data: {}
        },
    }
}


export const tactixSlice = createSlice({
    name: 'tactix',
    initialState,
    reducers: {
        setRoomInformation: (state, action: PayloadAction<object>) => {
            state.room = action.payload;
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.localStorage.username = action.payload;
            localStorage.setItem(localStorageName, JSON.stringify(state.localStorage));
        },
        setGameOwnerStatus: (state, action: PayloadAction<boolean>) => {
            state.localStorage.gameOwner = action.payload;
            localStorage.setItem(localStorageName, JSON.stringify(state.localStorage));
        },
        removeLocalStorageKey(state, action: PayloadAction<string>) {
            const {[action.payload]: _, ...variables} = state.localStorage;
            state.localStorage = variables;
            localStorage.setItem(localStorageName, JSON.stringify(state.localStorage));
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
        setGameExitStatus: (state, action: PayloadAction<boolean>) => {
            state.gameExit = action.payload
        },
        changeModalVisibility: (state, action: PayloadAction<IModalVisibility>) => {
            state.modals[action.payload.modal] = {
                status: action.payload.status,
                data: action.payload.data
            }
        },
        removeSelectedStones: (state) => {
            state.selectedStones = [];
        },
    },
})


export const {
    setRoomInformation,
    setUsername,
    setGameOwnerStatus,
    setRemovedStone,
    setRemovedStones,
    setSelectedStone,
    removeSelectedStones,
    removeLocalStorageKey,
    setGameExitStatus,
    changeModalVisibility
} = tactixSlice.actions

export default tactixSlice.reducer