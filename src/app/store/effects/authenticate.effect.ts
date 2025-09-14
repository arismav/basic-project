import { Injectable, NgZone } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';

import { map, tap, switchMap, take, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/auth.service';
import { from, Observable, of } from 'rxjs';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut } from '../actions/authenticate.actions';
import { AppState } from '../app.states';
import * as fromAuth from '../reducers/authenticate.reducer'
import { User } from 'src/app/models/user.model';
import { LoadingService } from 'src/app/helpers/services/loader.service';
import { restoreEntries } from '../actions/entries.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthenticateEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private _router: Router,
        private _store: Store<AppState>,
        private _loadingService: LoadingService,
        private ngZone: NgZone,
        private _snackBar: MatSnackBar,

    ) { }

    // effects go here

    // @Effect()
    // LogIn: Observable<any> = this.actions.pipe(
    //     ofType<LogIn>(AuthActionTypes.LOGIN),
    //     take(1),
    //     map((action: LogIn) => action.payload),
    //     switchMap(payload => {
    //         console.log(payload);
    //         return this.authService.login(payload.identifier, payload.password)
    //             // .pipe(
    //             //     map((auth: any) => {
    //             //         const newAuth = {
    //             //             ...auth,
    //             //             user: {
    //             //                 ...auth.user,
    //             //                 roles: ['usvi']
    //             //             }
    //             //         }
    //             //         console.log(newAuth);
    //             //         // this._store.dispatch(new LogInSuccess({ token: user.user?.refreshToken, email: payload.email }));
    //             //         return new LogInSuccess(newAuth);
    //             //     }
    //             //     ),
    //             //     catchError((error: any) => {
    //             //         console.log(error);
    //             //         // this._store.dispatch(new LogInFailure(error.error));
    //             //         // return new LogInFailure(error);
    //             //         this.router.navigateByUrl('/dashboard');
    //             //         return of(error);
    //             //     })

    //             // )
    //             .then((auth: any) => {
    //                 console.log(auth);
    //                 const newAuth = {
    //                     ...auth,
    //                     user: {
    //                         ...auth.user,
    //                         roles: ['usvi']
    //                     }
    //                 }
    //                 this._loadingService.setLoading(false);
    //                 // this.ngZone.run(() => {
    //                 return new LogInSuccess(newAuth);
    //                 // this._store.dispatch(new LogInSuccess(newAuth));
    //                 // })

    //             })
    //             .catch((error) => {
    //                 console.error('Promise rejected with error: ' + error);
    //                 console.log(error);
    //                 let newError: string;
    //                 if (error.code === 'auth/user-not-found') {
    //                     console.error('User not found.');
    //                     newError = 'User not found.';
    //                     // You can show a toast/snackbar or form error here
    //                 } else if (error.code === 'auth/wrong-password') {
    //                     console.error('Incorrect password.');
    //                     newError = 'Incorrect password.'
    //                 } else {
    //                     console.error('Authentication error:', error.message || error);
    //                     newError = 'Authentication error:'
    //                 }

    //                 // Optional: dispatch error action or return failure object
    //                 this._loadingService.setLoading(false);
    //                 return new LogInFailure(newError);
    //             });
    //     })

    // );

    @Effect()
    LogIn: Observable<Action> = this.actions.pipe(
        ofType<LogIn>(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap(payload =>
            from(this.authService.login(payload.identifier, payload.password)).pipe(
                map((auth: any) => {
                    const customUser = {
                      uid: auth.user.uid,
                      email: auth.user.email,
                      username: auth.user.displayName || auth.user.email, // Ή ό,τι άλλο θες
                      accessToken: auth.user.accessToken || auth._tokenResponse.idToken,
                      // roles: ['usvi'] // αν θες custom ρόλους
                    };
                  
                    const newAuth = {
                      user: customUser
                    };
                  
                    this._loadingService.setLoading(false);
                    return new LogInSuccess(newAuth); // ✅ Στέλνεις μόνο safe object
                  }),
                catchError((error) => {
                    this._loadingService.setLoading(false);
                    let errorMsg = 'Authentication failed';
                    if (error.code === 'auth/user-not-found') {
                        errorMsg = 'User not found.';
                    } else if (error.code === 'auth/wrong-password') {
                        errorMsg = 'Incorrect password.';
                    }
                    this._snackBar.open(errorMsg, 'close');
                    return of(new LogInFailure({ error: error, errorMsg: errorMsg }))
                    // return of();
                    // return of(new LogInFailure(errorMsg));
                })
            )
        )
    );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((action: LogInSuccess) => {
            const authState = {
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

            localStorage.setItem('auth', JSON.stringify(authState));
            this._router.navigateByUrl('/dashboard');
        })
    );


    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        // take(1),
        tap((user) => {
            console.log(user);
            // localStorage.removeItem('auth');
            // this._store.dispatch(restoreEntries({ allEntries: [] }));
            // this._store.dispatch(new LogOut);
            // this._router.navigate(['/auth']);
            this._router.navigate(['/auth']);

        })
    );

}