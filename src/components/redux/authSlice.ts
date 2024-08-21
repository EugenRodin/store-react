import { createSlice } from '@reduxjs/toolkit'

export interface AuthStateInterface {
    isAuthenticated: boolean
    isLogged: boolean
}

const initialState: AuthStateInterface = {
    isAuthenticated: false,
    isLogged: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true
            state.isLogged = true
        },
        logout(state) {
            state.isAuthenticated = false
            state.isLogged = false
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer