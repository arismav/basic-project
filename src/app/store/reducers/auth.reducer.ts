
import { User } from '../../models/user.model';
import * as AuthActions from '../../components/auth/store/auth.actions';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        //action.payload.expirationDate
      );
      return {
        ...state,
        user: user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}