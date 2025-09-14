import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
// import * as fromApp from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IThemeOption, IThemeOptions } from '../../../models/theme-option.model';
import { DashboardService } from '../dashboard.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { selectAppConfigsState, selectAppState } from 'src/app/store/selectors/app.selector';
import { AppState } from 'src/app/store/app.states';
import { DarkMode, Language } from 'src/app/store/actions/app-configs.actions';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { LanguageService } from 'src/app/services/language.service';
import { restoreEntries } from 'src/app/store/actions/entries.actions';
import { LogOut } from 'src/app/store/actions/authenticate.actions';
import { Router } from '@angular/router';
import * as AuthActions from '../../../store/actions/authenticate.actions'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  public authUser: any;
  public darkMode: boolean = false;
  public cartItemsAmount: number = 0;
  public langs: any;

  currentLang: string | null = null;


  constructor(
    private _authService: AuthService,
    // private _store: Store<fromApp.AppState>,
    private _dashboardService: DashboardService,
    private _overlay: OverlayContainer,
    private _store: Store<AppState>,
    private _languageService: LanguageService,
    private _router: Router,
    private _firebaseAuth: AngularFireAuth,
    private auth: Auth,
    private _ngZone: NgZone,
    private _ch: ChangeDetectorRef
  ) {

    // this._firebaseAuth.onAuthStateChanged((user) => {
    //   console.log(user);
    //   if(user){
    //     if(user.emailVerified === false) {
    //       // this.logout();
    //       console.log(user);
    //     }
    //   }
    // })

    this.langs = this._languageService.langs;
    console.log(this.langs);

    this._dashboardService.getCartItems().subscribe((cartItems) => {
      this.cartItemsAmount = cartItems.length
    })

    // this.currentLang = this._languageService.getCurrentLanguage();
    // console.log(currentLang);
    // console.log(this.currentLang);

  }

  ngOnInit(): void {
    this._store.select(selectAppConfigsState)
      .pipe(
        take(1)
      )
      .subscribe((appConfigs) => {
        console.log(appConfigs);
        if (appConfigs.darkMode) {
          this.toggleDarkMode(null, true);
        }
        if (appConfigs.language) {
          this.currentLang = appConfigs.language;
          console.log(this.currentLang);
          // this._translateService.setDefaultLang(this.currentLang);
        }
      })

    this._store.select(selectAppState).pipe(
      take(1),
      map((authState) => {
        this.authUser = authState.user;
        return authState;
      })
    ).subscribe((state) => {
      console.log(state);
    })
  }

  logout = () => {
    console.log('Trying to logout...');
  
    this._authService.logout().then(() => {
      console.log('SignOut initiated.');
  
      const interval = setInterval(() => {
        if (!this.auth.currentUser) {
          clearInterval(interval);
          console.log('Fully signed out.');
  
          // Καθάρισε localStorage και state
          // localStorage.removeItem('auth');
          this._store.dispatch(new AuthActions.LogOut());
        } else {
          console.log('Still signed in:', this.auth.currentUser);
        }
      }, 100);
    }).catch((err) => {
      console.error('Logout error:', err);
    });
  };

  // logout = () => {

  //   console.log(this.auth.currentUser);

  //   this._authService.logout().then((res) => {
  //     console.log(res);
  //   localStorage.removeItem('auth');
  //   this._store.dispatch(new AuthActions.LogOut());

  //   })


  //   // this._firebaseAuth.user.subscribe((user) => {
  //   //   console.log(user);
  //   //   if (user) {
  //   //     // this._firebaseAuth.signOut();

  //   // return signOut(this.auth).then((res) => {
  //   //   console.log(res);
  //   // })
  //   // return this._firebaseAuth.signOut()

  //   //   }
  //   // })
  //   // this._ch.detectChanges();
  //   // localStorage.removeItem('auth');
  //   // this._router.navigate(['/auth']);
  //   // this._ngZone.run(()=> {
  //   //   // this._authService.logout();

  //   // })

  //   // .then((res) => {
  //   //   console.log(res);
  //   //   this._ngZone.run(() => {
  //   //     this._store.dispatch(new AuthActions.LogOut());
  //   //   })
  //   // })
  //   // .catch((error)=> {
  //   //   console.log(error);
  //   // })
  // }

  switchLang(e: any) {
    // this._translateService.use(e.target.value);
    this.currentLang = e.target.value;
    this._store.dispatch(new Language(e.target.value));
  }

  toggleDarkMode(e?: any, check?: boolean) {
    console.log('here1');
    this.darkMode = !this.darkMode;
    const darkClassName = 'darkMode';
    this.className = (e?.checked || check) ? darkClassName : '';
    if ((e?.checked) || check) {
      console.log('here');
      this._store.dispatch(new DarkMode(true));
      document.getElementsByTagName('app-header')[0]?.parentElement?.classList.add(darkClassName);
    } else {
      this._store.dispatch(new DarkMode(false));
      document.getElementsByTagName('app-header')[0]?.parentElement?.classList.remove(darkClassName);
    }
  }


  profileSidenav() {
    this._dashboardService.setComponentPortal(ProfileComponent);
  }

  settingsSidenav() {
    this._dashboardService.setComponentPortal(SettingsComponent);
  }
}
