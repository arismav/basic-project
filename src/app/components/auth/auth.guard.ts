import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromApp from '../../store/reducers/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private url: string = '';

    constructor(private _authService: AuthService, private _router: Router, private _store: Store<fromApp.AppState>) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        this.url = state.url;
        console.log(this.url);
        return this._store.select('auth').pipe(
            take(1),
            map(authState => {
                console.log(authState);
                return authState.user;
            }),
            map(user => {
                console.log(user);
                const isAuth = !!user;
                if (isAuth) {
                    if (this.url === '/auth') {
                        console.log('here');
                        return this.onLoginPageLogged();
                    }
                    return this.onOtherPageLogged();
                } else {
                    if (this.url === '/auth') {
                        return true;
                    }
                    return this.onOtherPageLoggedOut();
                }

            })
        );
    }

    onLoginPageLogged(): boolean {
        this._router.navigate(['/dashboard']);
        return true;
    }

    onOtherPageLogged(): boolean {
        return true;
    }

    onOtherPageLoggedOut(): boolean {
        this._router.navigate(['/auth']);
        return false;
    }
}
