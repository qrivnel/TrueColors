import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DarkMode {
    darkMode: boolean
}

const initialState = {
    darkMode: true
}

export const DarkMode = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload
        }
    }
})

export const { toggleDarkMode, setDarkMode } = DarkMode.actions

export default DarkMode.reducer