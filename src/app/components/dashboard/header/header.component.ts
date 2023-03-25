import { Component, HostBinding, OnInit } from '@angular/core';
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
import { DarkMode } from 'src/app/store/actions/app-configs.actions';

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

  langs: any = { 'el': 'Greek', 'en': 'English' };
  currentLang: string = 'en';


  constructor(
    private _authService: AuthService,
    // private _store: Store<fromApp.AppState>,
    private _translateService: TranslateService,
    private _dashboardService: DashboardService,
    private _overlay: OverlayContainer,
    private _store: Store<AppState>
  ) {



    this._translateService.addLangs(Object.keys(this.langs));
    this._translateService.setDefaultLang('en');
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
    this._authService.logout();
  }

  switchLang(e: any) {
    this._translateService.use(e.target.value);
    this.currentLang = e.target.value;
  }

  toggleDarkMode(e?: any, check?: boolean) {
    console.log('here1');
    this.darkMode =! this.darkMode;
    const darkClassName = 'darkMode';
    this.className = (e?.checked || check) ? darkClassName : '';
    if ((e?.checked) || check) {
      console.log('here');
      this._store.dispatch(new DarkMode(true));
      document.getElementsByTagName('app-header')[0].parentElement?.classList.add(darkClassName);
    } else {
      this._store.dispatch(new DarkMode(false));
      document.getElementsByTagName('app-header')[0].parentElement?.classList.remove(darkClassName);
    }
  }
}
