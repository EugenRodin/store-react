import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.ts'
import usersReducer from './userSlice.ts'
import postsReducer from './postsSlice.ts'

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        posts: postsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

