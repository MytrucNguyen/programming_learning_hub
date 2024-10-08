import { createReducer } from '@reduxjs/toolkit';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

interface IncrementAction {
    type: typeof INCREMENT;
    payload: number;
}

interface DecrementAction {
    type: typeof DECREMENT;
    payload: number;
}

export type CounterAction = IncrementAction | DecrementAction;

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC',
}

export const increments = (amount = 1) => ({
    type: INCREMENT,
    payload: amount,
});

export const decrement = (amount = 1) => ({
    type: DECREMENT,
    payload: amount,
});

export default createReducer(initialState, (builder) => {
    builder
        .addCase(INCREMENT, (state, action: IncrementAction) => {
            state.data += action.payload;
        })
        .addCase(DECREMENT, (state, action: DecrementAction) => {
            state.data -= action.payload;
        });
});
