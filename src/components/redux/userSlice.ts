import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store.ts"
import { UserInterface } from "../../types/User.Interface.ts"
import {createFetchThunk} from "./createFetchThunk.ts";

interface UserStateInterface {
    users: UserInterface[]
    error: string | null
    isLoading: boolean
}

const initialState: UserStateInterface = {
    users: [],
    error: null,
    isLoading: false,
}

export const fetchAllUsers = createFetchThunk<UserInterface>("users/fetchAllUsers");

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.isLoading = false;
            state.error = action.payload || "An error occurred";
        });
    },
})

export const selectUsers = (state: RootState) => state.users.users
export const selectUsersError = (state: RootState) => state.users.error
export const selectUsersLoading = (state: RootState) => state.users.isLoading

export default userSlice.reducer