import { All, AuthActionTypes } from "../actions/app-configs.actions";

export interface State {
    darkMode: boolean;
}

export const initialState: State = {
    darkMode: false
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.DARKMODE: {
            const newState = {
                ...state,
                darkMode: action.payload
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}