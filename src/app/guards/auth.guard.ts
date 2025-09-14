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

import { AuthService } from '../components/auth/auth.service';
// import * as fromApp from '../../store/reducers/app.reducer';
import { State, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { selectAppState } from 'src/app/store/selectors/app.selector';
import * as fromAuth from '../store/reducers/authenticate.reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private url: string = '';

    constructor(private _authService: AuthService, private _router: Router,
        private _store: Store<AppState>
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        this.url = state.url;
        console.log(this.url);
        // const token = 
        // const isAuth = (localStorage.getItem('token') !== null);
        this._store.select(selectAppState).pipe(
            take(1),
            map(authState => {
                console.log(authState);
                return authState;
            })
        ).subscribe((state) => {
            console.log(state);
            const isAuth = state.isAuthenticated;
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
    }

    onLoginPageLogged(): boolean {
        console.log('redirect to dashboard');
        this._router.navigate(['/dashboard']);
        return true;
    }

    onOtherPageLogged(): boolean {
        return true;
    }

    onOtherPageLoggedOut(): boolean {
        console.log('here1')
        this._router.navigate(['/auth']);
        return false;
    }
}
