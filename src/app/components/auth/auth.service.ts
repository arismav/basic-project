import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { LogOut } from 'src/app/store/actions/authenticate.actions';
import { AppState } from 'src/app/store/app.states';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

// import * as fromApp from '../../store/reducers/app.reducer';
import * as AuthActions from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public mainUrl = environment.api.mainUrl;
  public auth = environment.api.auth;
  public register = environment.api.register;

  public userData: any;
  //public user = new BehaviorSubject<User | null>(null);
  public switchLoginMode$ = new Subject<boolean>();

  constructor(
    private _http: HttpClient,
    private _firebaseAuth: AngularFireAuth,
    private _router: Router,
    private _store: Store<AppState>
  ) {

  }

  login(identifier: string, password: string) {
    // return this._firebaseAuth.signInWithEmailAndPassword(email, password);
    return this._http.post(`${this.mainUrl + this.auth}`, {identifier, password});
  }


  signup = (payload :{username: string, email: string, password: string}) => {
    // return this._firebaseAuth.createUserWithEmailAndPassword(email, password);
    return this._http.post(`${this.mainUrl + this.register}`, payload)
  }

  logout() {
    return this._firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      //this.user.next(null);
      // this.store.dispatch(new AuthActions.Logout())
      this._store.dispatch(new LogOut);
      this._router.navigate(['/auth']);
    });
  }

  setSwitchLoginMode(flag: boolean) {
    this.switchLoginMode$.next(flag);
  }

  getSwitchLoginMode(): Observable<boolean> {
    return this.switchLoginMode$.asObservable();
  }

  autoLogin() {
    const localUser = localStorage.getItem('user');
    const userData: {
      email: string;
      id: string;
      _token: string;
    } = localUser ? JSON.parse(localUser) : null;


    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      // new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      //this.user.next(loadedUser);


      // this.store.dispatch(new AuthActions.Login({
      //   email: loadedUser.email,
      //   userId: loadedUser.id,
      //   token: loadedUser.token
      // }
      // ))

      // const expirationDuration =
      //   new Date(userData._tokenExpirationDate).getTime() -
      //   new Date().getTime();
      //this.autoLogout(expirationDuration);
    }
  }


  public handleAuthentication(
    email: string,
    userId: string,
    token: string,
    //expiresIn: number
  ) {
    //const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token);
    //this.user.next(user);
    // this.store.dispatch(new AuthActions.Login(
    //   {
    //     email: user.email,
    //     userId: user.id,
    //     token: user.token
    //   }
    // ))
    //this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public handleError(errorCode: any) {
    console.log(errorCode);
    let errorMessage = 'An unknown error occurred!';
    if (!errorCode) {
      return errorMessage;
    }
    switch (errorCode) {
      case 'auth/user-disabled': {
        return 'Sorry your user is disabled.';
      }
      case 'auth/user-not-found': {
        return 'Sorry user not found.';
      }

      case 'auth/wrong-password': {
        return 'Sorry, incorrect password entered. Please try again.';
      }

      case 'auth/email-already-in-use': {
        return 'E-mail is already in use by another account. Please try again.';
      }

      case 'auth/too-many-requests': {
        return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
      }

      default: {
        return 'Login error try again later.';
      }
    }
  }
}
