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
    error : {
        errorMessage: null,
        errorCode: ''
    }
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            console.log('Auth Reducer Here')
            console.log(action);
            const newState = {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.payload.user.id,
                    email: action.payload.user.email,
                    username: action.payload.user.username,
                    jwt: action.payload.jwt
                },
                error: {
                    errorMessage: null,
                    errorCode: null
                }
            }
            console.log(newState);
            localStorage.setItem('auth', JSON.stringify(newState));
            return newState;
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            console.log(action.payload);
            return {
                ...state,
                error : {
                    errorMessage: action.payload.error.message,
                    errorCode: action.payload.error.status
                }
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