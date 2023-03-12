// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { select, Store } from '@ngrx/store';
// import { EMPTY, map, mergeMap, withLatestFrom, switchMap, of, Observable } from 'rxjs';
// import { DashboardService } from 'src/app/components/dashboard/dashboard.service';
// import { deleteEntryAPISuccess, entriesFetchAPISuccess, invokeDeleteEntryAPI, invokeSaveNewEntryAPI, saveNewEntryAPISuccess, updateEntryAPI, updateEntryAPISuccess } from '../actions/entries.actions';
// import { selectEntries } from '../selectors/entries.selector';
// import { invokeEntriesAPI } from '../actions/entries.actions';
// import { Appstate } from '../appstate';
// import { setAPIStatus } from '../actions/app.actions';
// import { authFetchAPISuccess, invokeAuthAPI } from '../actions/authentication.actions';
// import { selectAuthUser } from '../selectors/authentication.selector';
// import { AuthService } from 'src/app/components/auth/auth.service';

// @Injectable()
// export class AuthenticationEffect {
//     constructor(
//         private actions$: Actions,
//         private dashboardService: DashboardService,
//         private store: Store,
//         private _authService: AuthService,
//         private appStore: Store<Appstate>
//     ) { }

//     loadAuthUser$ = createEffect((): any => {
//         return this.actions$.pipe(
//             ofType(invokeAuthAPI),
//             // withLatestFrom(this.store.pipe(select(selectAuthUser))),
//             switchMap((action) => {
//                 console.log(action);
//                 // if (entryformStore) {
//                 //     return EMPTY;
//                 // }
//                 return this._authService
//                     .login(action.username, action.password)
//                     .then((data) => {
//                         console.log(data);
//                         return authFetchAPISuccess({
//                             authUser: {
//                                 email: data.user?.email,
//                                 id: data.user?.uid,
//                                 token: data.user?.refreshToken
//                             }
//                         })
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                         return error;
//                         // this.isLoading = false;
//                         // var errorMessage = this._authService.handleError(error.code);
//                         // this._toastr.error(errorMessage);
//                     });;
//             })
//         )
//     });
// }