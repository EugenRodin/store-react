import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import usersReducer from './userSlice'
import postsReducer from './postsSlice'
import productsReducer from './productsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        posts: postsReducer,
        products: productsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

