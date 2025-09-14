import { AuthUser } from "src/app/models/auth-user.model";
import { All, AuthActionTypes } from "../actions/authenticate.actions";

export interface State {
    isAuthenticated: boolean;
    user: AuthUser | null;
    error: {
        errorMessage: string | null;
        errorCode: string | null;
    }
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    error: {
        errorMessage: null,
        errorCode: ''
    }
}

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.payload.user.uid,
                    email: action.payload.user.email,
                    username: action.payload.user.username,
                    jwt: action.payload.user.accessToken
                },
                error: {
                    errorMessage: null,
                    errorCode: null
                }
            };
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            console.log(action.payload);
            const newState = {
                ...state,
                error: {
                    errorMessage: action.payload.errorMsg,
                    errorCode: action.payload.error
                }
            };
            return newState;
        }
        case AuthActionTypes.LOGOUT: {
            const newState = { ...initialState };
            return newState;
        }
        default: {
            return state;
        }
    }
}