import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/authenticate.reducer';
import * as entries from './reducers/entries.reducer'
import * as appconfigs from './reducers/app-configs.reducer'


export interface AppState {
  auth: auth.State,
  myentries: entries.State,
  appconfigs: appconfigs.State
}

export const reducers = {
  auth: auth.reducer,
  myentries: entries.entriesReducer,
  appconfigs: appconfigs.reducer
};

// export const selectAuthState = createFeatureSelector<AppState>('auth');