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

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        this.url = state.url;
        console.log('Checking AuthGuard for route: ', this.url);
      
        return this._store.select(selectAppState).pipe(
          take(1),
          map(authState => {
            const isAuth = authState.isAuthenticated;
      
            if (isAuth) {
              return (this.url === '/auth') ? this.onLoginPageLogged() : this.onOtherPageLogged();
            } else {
              return (this.url === '/auth') ? true : this.onOtherPageLoggedOut();
            }
          })
        );
      }
      

    onLoginPageLogged(): boolean {
        console.log('redirect to dashboard');
        this._router.navigate(['/dashboard']);
        return true;
    }

    onOtherPageLogged(): boolean {
        console.log('here here')
        return true;
    }

    onOtherPageLoggedOut(): boolean {
        console.log('here1')
        this._router.navigate(['/auth']);
        return false;
    }
}
