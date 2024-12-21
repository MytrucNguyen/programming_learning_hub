import React, { PropsWithChildren, useState } from "react";
import { StoreContext, StoreContextValue } from "./storeContext";
import { Basket } from "../models/basket";

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        if (!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;

            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return { ...prevState!, items };
            });
        }
    }

    const value: StoreContextValue = { basket, setBasket, removeItem };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}
