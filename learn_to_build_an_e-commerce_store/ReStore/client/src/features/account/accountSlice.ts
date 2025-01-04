import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { basket, ...user } = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch account.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
)

export const getCurrentUser = createAsyncThunk<User>(
    'account/getCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));

        try {
            const userDto = await agent.Account.currentUser();
            const { basket, ...user } = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            const errorMessage = getErrorMessage(error) || "Failed to fetch account.";
            return thunkAPI.rejectWithValue(errorMessage);
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, getCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected), (_, action) => {
            throw (action.payload);
        })
    })
})

export const { signOut, setUser } = accountSlice.actions;