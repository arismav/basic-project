import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
// import * as fromApp from '../../../store/reducers/app.reducer';
//import * as AuthActions from './store/auth.actions';
import { map, tap, take, takeUntil } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, AfterViewInit, OnDestroy {

  showFiller = false;
  private _rightSideNav!: MatDrawer;
  @ViewChild(MatDrawerContainer) _drawerContainer!: MatDrawerContainer;

  _destroy$ = new Subject<void>();

  _rightSideComponent$ = this._dashboardService.getComponentPortal$().pipe(
    tap((_) => _ ? this._rightSideNav.open() : null),
    takeUntil(this._destroy$)
  );

  constructor(
    // private _store: Store<fromApp.AppState>
    public _dashboardService: DashboardService
  ) {

  }

  ngAfterViewInit() {
    this._rightSideNav = this._drawerContainer.end as MatSidenav;
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

}
