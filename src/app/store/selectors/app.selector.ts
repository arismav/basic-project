import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { Appstate } from '../appstate';
 
export const selectAppState = createFeatureSelector<AppState>('appState');