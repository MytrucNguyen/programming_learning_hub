import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";

interface BasketState {
    baseket: Basket | null
}

const initialState: BasketState = {
    baseket: null
}

export const baseketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.baseket = action.payload
        },

        removeItem: (state, action) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.baseket?.items.findIndex(i => i.productId === productId);

            if (itemIndex === -1 || itemIndex === undefined) return;

            state.baseket!.items[itemIndex].quantity -= quantity;

            if (state.baseket?.items[itemIndex].quantity === 0)
                state.baseket.items.splice(itemIndex, 1);
        }
    }
})

export const { setBasket, removeItem } = baseketSlice.actions;