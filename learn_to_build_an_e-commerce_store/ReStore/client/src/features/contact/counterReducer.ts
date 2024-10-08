export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

interface IncrementAction {
    type: typeof INCREMENT;
}

interface DecrementAction {
    type: typeof DECREMENT;
}

type CounterAction = IncrementAction | DecrementAction;

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC',
}

export default function counterReducer(
    state = initialState,
    action: CounterAction
): CounterState {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                data: state.data + 1,
            };
        case DECREMENT:
            return {
                ...state,
                data: state.data - 1,
            };
        default:
            return state;
    }
}
