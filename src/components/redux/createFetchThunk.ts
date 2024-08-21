import {createAsyncThunk} from "@reduxjs/toolkit"
import axios, {AxiosError} from "axios"

export function createFetchThunk<T>(typePrefix: string) {
    return createAsyncThunk<T[], string, { rejectValue: string }>(
        typePrefix,
        async (url: string, { rejectWithValue }) => {
            try {
                const response = await axios.get<T[]>(url);
                if (response.status !== 200) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.data;
            } catch (error) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.message);
            }
        }
    )
}