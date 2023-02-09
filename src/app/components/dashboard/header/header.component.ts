import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { IThemeOption, IThemeOptions } from '../../../models/theme-option.model';
import { DashboardService } from '../dashboard.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
  
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  public authUser: any;

  langs: any = { 'el': 'Greek', 'en': 'English' };
  currentLang: string = 'en';


  constructor(
    private _authService: AuthService,
    // private _store: Store<fromApp.AppState>,
    private _translateService: TranslateService,
    private _dashboardService: DashboardService,
    private _overlay: OverlayContainer
  ) {



    // this._store.select('auth')
    //   .pipe(
    //     take(1),
    //     map((authState) => {
    //       return authState.user;
    //     })
    //   )
    //   .subscribe((user) => {
    //     console.log(user);
    //     this.authUser = user;
    //   });

    this._translateService.addLangs(Object.keys(this.langs));
    this._translateService.setDefaultLang('en');
  }

  ngOnInit(): void {

  }

  logout = () => {
    this._authService.logout();
  }

  switchLang(e: any) {
    this._translateService.use(e.target.value);
    this.currentLang = e.target.value;
  }

  toggleDarkMode(e: any) {

    console.log(e);
    const darkClassName = 'darkMode';
    this.className = e.checked ? darkClassName : '';
    if (e.checked) {
      this._overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this._overlay.getContainerElement().classList.remove(darkClassName);
    }

  }


}
