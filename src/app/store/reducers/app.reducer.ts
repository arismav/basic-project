// // import { ActionReducerMap } from '@ngrx/store';
// // import * as AuthActions from '../actions/auth.actions';
// // import * as DataTableActions from '../actions/data-table.actions';
// // // import { DataTableActions } from '../actions/data-table.actions';
// // import * as fromAuth from './auth.reducer';
// // import * as fromDataTable from './data-table.reducer';

// // export interface AppState {
// //   auth: fromAuth.State,
// //   datatable: fromDataTable.State
// // }

// // export const appReducer: ActionReducerMap<AppState, any> = {
// //   auth: fromAuth.authReducer,
// //   datatable: fromDataTable.dataTableReducer
// // };


// import { createReducer, on } from '@ngrx/store';
// import { Appstate } from '../appstate';
// import { setAPIStatus } from '../actions/app.actions';

// // export const initialState: Readonly<Appstate> = {
// //   apiResponseMessage: '',
// //   apiStatus: '',
// // };

// // export const appReducer = createReducer(
// //   initialState,
// //   on(setAPIStatus, (state, { apiStatus }) => {
// //     return {
// //       ...state,
// //       ...apiStatus
// //     };
// //   })
// // );