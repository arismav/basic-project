import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';

import { map, tap, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Observable } from 'rxjs';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut} from '../actions/authenticate.actions';
import { AppState } from '../app.states';
import * as fromAuth from '../reducers/authenticate.reducer'

// import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthenticateEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private _store: Store<AppState>
    ) { }

    // effects go here

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        // take(1),
        map((action: LogIn) => action.payload),

        switchMap((payload: any) => {
            console.log(payload);
            return this.authService.login(payload.email, payload.password)
                .then((user) => {
                    console.log(user);
                    // this._store.dispatch(new LogInSuccess({ token: user.user?.refreshToken, email: payload.email }));
                    return new LogInSuccess({ token: user.user?.refreshToken, email: payload.email });
                })
                .catch((error) => {
                    console.log(error);
                    return new LogInFailure({ error: error });
                });
        })
    );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user: any) => {
            console.log(user);
            if (user.payload.token) {
                localStorage.setItem('token', user.payload.token);
            }
            this.router.navigateByUrl('/dashboard');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            localStorage.removeItem('token');
        })
    );

}