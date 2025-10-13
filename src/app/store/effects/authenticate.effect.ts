import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { LoadingService } from 'src/app/helpers/services/loader.service';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess } from '../actions/authenticate.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthenticateEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private _loadingService: LoadingService,
        private _snackBar: MatSnackBar,
        private _router: Router
    ) { }

    LogIn = createEffect(() =>
        this.actions.pipe(
            ofType<LogIn>(AuthActionTypes.LOGIN),
            map((action: LogIn) => action.payload),
            switchMap(payload =>
                from(this.authService.login(payload.identifier, payload.password)).pipe(
                    map((auth: any) => {
                        const customUser = {
                            uid: auth.user.uid,
                            email: auth.user.email,
                            username: auth.user.displayName || auth.user.email,
                            accessToken: auth.user.accessToken || auth._tokenResponse.idToken
                        };
                        const newAuth = { user: customUser };
                        this._loadingService.setLoading(false);
                        return new LogInSuccess(newAuth);
                    }),
                    catchError((error) => {
                        this._loadingService.setLoading(false);
                        let errorMsg = 'Authentication failed';
                        if (error.code === 'auth/user-not-found') errorMsg = 'User not found.';
                        else if (error.code === 'auth/wrong-password') errorMsg = 'Incorrect password.';
                        this._snackBar.open(errorMsg, 'close');
                        return of(new LogInFailure({ error, errorMsg }));
                    })
                )
            )
        )
    );

    LogInSuccess = createEffect(
        () =>
            this.actions.pipe(
                ofType(AuthActionTypes.LOGIN_SUCCESS),
                tap((action: LogInSuccess) => {
                    const authState = {
                        isAuthenticated: true,
                        user: {
                            id: action.payload.user.uid,
                            email: action.payload.user.email,
                            username: action.payload.user.username,
                            jwt: action.payload.user.accessToken,
                            roles: ['usvi']
                        },
                        error: { errorMessage: null, errorCode: null }
                    };
                    localStorage.setItem('auth', JSON.stringify(authState));
                    this._router.navigateByUrl('/dashboard');
                })
            ),
        { dispatch: false }
    );

    LogInFailure = createEffect(
        () =>
            this.actions.pipe(
                ofType(AuthActionTypes.LOGIN_FAILURE),
                tap(() => { })
            ),
        { dispatch: false }
    );

    LogOut = createEffect(
        () =>
            this.actions.pipe(
                ofType(AuthActionTypes.LOGOUT),
                tap(() => this._router.navigate(['/auth']))
            ),
        { dispatch: false }
    );
}
