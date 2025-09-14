import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './components/auth/auth.service';
import { LanguageService } from './services/language.service';
import { AppState } from './store/app.states';
import { selectAppConfigsState } from './store/selectors/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }), //apply default styles before animation starts
        animate(
          "750ms ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
        animate(
          "600ms ease-in-out",
          style({ opacity: 0, transform: "translateX(-100%)" })
        )
      ])
    ])
  ]
})


export class AppComponent implements OnInit {

  appTitle = `Mav's app`;

  langs: any = { 'el': 'Greek', 'en': 'English' };

  constructor(
    private _authService: AuthService,
    private _contexts: ChildrenOutletContexts,
    private _router: Router,
    private _titleService: Title,
    private _translateService: TranslateService,
    private _store: Store<AppState>,
    private _languageService: LanguageService
  ) {

    this._translateService.addLangs(Object.keys(this.langs));

    this._store.select(selectAppConfigsState)
      .subscribe((appConfigs) => {
        console.log(appConfigs);
        const currentLang = appConfigs.language ? appConfigs.language : 'en';
        console.log(currentLang);
        // this._translateService.use(currentLang);
        this._languageService.changeLanguage(currentLang);
      })

  }

  getRouteAnimationData() {
    return this._contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnInit() {
    this._authService.autoLogin();
    this.setPageTitle();
  }



  setPageTitle = () => {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this._router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          console.log(title);
          this._titleService.setTitle(`${this.appTitle} - ${title}`);
        } else {
          this._titleService.setTitle(`${this.appTitle}`);
        }
      });
  }
}
