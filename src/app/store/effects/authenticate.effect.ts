import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
// import { Observable } from 'rxjs/Observable';

import { map, tap, switchMap, take, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/components/auth/auth.service';
import { Observable, of } from 'rxjs';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut } from '../actions/authenticate.actions';
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
        ofType<LogIn>(AuthActionTypes.LOGIN),
        // take(1),
        map((action: LogIn) => action.payload),

        switchMap(payload => {
            console.log(payload);
            return this.authService.login(payload.identifier, payload.password)
                .pipe(
                    map((auth: any) => {
                        console.log(auth);
                        // this._store.dispatch(new LogInSuccess({ token: user.user?.refreshToken, email: payload.email }));
                        return new LogInSuccess(auth);
                    }
                    ),
                    catchError((error:any) => {
                        console.log(error)
                       // return new LogInFailure(error);
                        this._store.dispatch(new LogInFailure(error.error));
                        return of(error);
                    })

                )
        })

    );

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user: any) => {
            console.log(user);
            if (user.payload.jwt) {
                localStorage.setItem('token', user.payload.jwt);
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
            localStorage.removeItem('auth');
        })
    );

}