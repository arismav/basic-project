import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/authenticate.reducer';


export interface AppState {
  auth: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

// export const selectAuthState = createFeatureSelector<AppState>('auth');