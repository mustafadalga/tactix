import { configureStore } from '@reduxjs/toolkit'
import tactix from './tactix'

export const store = configureStore({
    reducer: {
        tactix,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch