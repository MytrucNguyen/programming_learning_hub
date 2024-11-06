import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState {
    basket: Basket | null;
    status: string;
    error: string | null;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
    error: null,
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: number, quantity?: number }, { rejectValue: string }>(
    'basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch {
            return thunkAPI.rejectWithValue("Failed to add item to basket.");
        }
    }
);

export const removeBasketItemAsync = createAsyncThunk<void, { productId: number, quantity: number, name?: string }, { rejectValue: string }>(
    'basket/removeBasketItemAsync',
    async ({ productId, quantity }, thunkAPI) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch {
            return thunkAPI.rejectWithValue("Failed to remove item from basket.");
        }
    }
);

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = `pendingAddItem${action.meta.arg.productId}`;
            state.error = null;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload ?? "An error occurred while adding item.";
        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            const productName = action.meta.arg.name ?? "";
            state.status = `pendingRemoveItem${action.meta.arg.productId}${productName}`;
            state.error = null;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);

            if (itemIndex === -1 || itemIndex === undefined || state.basket === null) return;

            state.basket.items[itemIndex].quantity -= quantity;
            if (state.basket.items[itemIndex].quantity <= 0) {
                state.basket.items.splice(itemIndex, 1);
            }

            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload ?? "An error occurred while removing item.";
        });
    },
});

export const { setBasket } = basketSlice.actions;