import { AuthUser } from "src/app/models/auth-user.model";
import { All, AuthActionTypes } from "../actions/authenticate.actions";

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: AuthUser | null;
    // error message
    errorMessage: any | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            console.log('Auth Reducer Here')
            const newState = {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            }
            console.log(newState);
            return newState;
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: action.payload.error
            };
        }
        case AuthActionTypes.LOGOUT: {
            return initialState;
          }
        default: {
            return state;
        }
    }
}