import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

function getErrorMessage(error: unknown): string | null {
    if (typeof error === 'object' && error !== null && 'data' in error) {
        const errorData = (error as { data: { message?: string } }).data;
        return errorData?.message || null;
    }
    return null;
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch products.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentUser = createAsyncThunk<User>(
    'account/getCurrentUser',
    async (_, thunkAPI) => {
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;

        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch products.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected, getCurrentUser.rejected), (_, action) => {
            console.log(action.payload);
        })
    })
})