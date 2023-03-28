import { All, AuthActionTypes } from "../actions/app-configs.actions";

export interface State {
    darkMode: boolean;
    language: string | null;
}

export const initialState: State = {
    darkMode: false,
    language: null
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
        case AuthActionTypes.LANGUAGE: {
            const newState = {
                ...state,
                language: action.payload
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}