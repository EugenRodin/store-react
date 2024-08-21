import { PostInterface } from "../../types/PostInterface.ts"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "./store.ts"
import {createFetchThunk} from "./createFetchThunk.ts";

interface PostsStateInterface {
    posts: PostInterface[]
    error: string | null
    isLoading: boolean
}

const initialState: PostsStateInterface = {
    posts: [],
    error: null,
    isLoading: false,
}

export const fetchAllPosts = createFetchThunk<PostInterface[]>("posts/fetchAllPosts")

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<PostInterface[]>) => {
            state.isLoading = false
            state.posts = action.payload
        })
            .addCase(
                fetchAllPosts.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.error = action.payload || "An error occurred"
                }
            )
    }
})

export const selectPosts = (state: RootState) => state.posts.posts
export const selectPostsError = (state: RootState) => state.posts.error
export const selectPostsLoading = (state: RootState) => state.posts.isLoading
export default postsSlice.reducer