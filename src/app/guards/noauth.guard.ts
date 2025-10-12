import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AppState } from 'src/app/store/app.states';
import { selectAppState } from 'src/app/store/selectors/app.selector';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectAppState).pipe(
      take(1),
      map(authState => {
        const isAuthenticated = authState.isAuthenticated;

        if (isAuthenticated) {
          // Αν είναι ήδη logged in, redirect στο dashboard
          return this.router.createUrlTree(['/dashboard']);
        }

        // Αν ΔΕΝ είναι logged in, επιτρέπεται να δει το login page
        return true;
      })
    );
  }
}
