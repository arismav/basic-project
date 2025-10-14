import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, Subject, delay } from 'rxjs';
import * as fromAppConfigs from '../../../store/reducers/app-configs.reducer';
import * as fromAppConfigsActions from '../../../store/actions/app-configs.actions';
import { map, tap, take, takeUntil } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { selectAppConfigsState, selectAppState } from 'src/app/store/selectors/app.selector';
import { BreakpointState } from '@angular/cdk/layout';
import { MatDialogComponent } from '../../shared/mat-dialog/mat-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMainComponent implements OnInit, AfterViewInit, OnDestroy {

  breakpointObserver: Observable<BreakpointState>;
  showFiller = false;
  resized: boolean = false;
  private _rightSideNav!: MatDrawer;
  @ViewChild(MatDrawerContainer) _drawerContainer!: MatDrawerContainer;
  @ViewChild('drawer') drawer!: MatDrawer;
  dialogIsOpened: boolean = false;
  isAuthenticated$: any;

  public storeSidenavOpened = this._store.select(selectAppConfigsState);

  _destroy$ = new Subject<void>();


  _rightSideComponent$ = this._dashboardService.getComponentPortal$().pipe(
    delay(500),
    tap((side) => {
      if (side) {
        return this._rightSideNav.open();
      } else {
        return null;
      }
    }),
    takeUntil(this._destroy$)
  );

  constructor(
    // private _store: Store<fromApp.AppState>
    public _dashboardService: DashboardService,
    private _store: Store<fromAppConfigs.State>,
    public dialog: MatDialog,
    private _ch: ChangeDetectorRef
  ) {

    this.isAuthenticated$ = this._store.select(selectAppState).pipe(
      map(state => {state.isAuthenticated
        this._ch.detectChanges();
      console.log(state.isAuthenticated)
      })
    );

    this.breakpointObserver = this._dashboardService.getScreenObserver();

    this.storeSidenavOpened
      .pipe(
        take(1)
      )
      .subscribe((sidenav) => {
        this.resized = !sidenav.sidenavOpened;
      })
  }

  resizeDrawer() {
    // setTimeout(() => {
      this.resized = !this.resized;
      this._store.dispatch(new fromAppConfigsActions.Sidenav(!this.resized));
  
    // }, 500);
    setTimeout(() => {
      this._ch.detectChanges();
      this._ch.markForCheck();
    }, 310);
 
  }

  ngAfterViewInit() {
    this._rightSideNav = this._drawerContainer.end as MatSidenav;
  }

  ngOnInit(): void {

  }

  clickOutsideDrawer() {
    // console.log(this._rightSideNav);
    if (this._rightSideNav?.opened) {
      console.log('here');
      if(!this.dialogIsOpened)
      this.openDialog();
      // this._rightSideNav.close();
      // this.isOpened = false;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(MatDialogComponent,
      {
        data: {
          sidenav: this._rightSideNav,
        },
      }
    );
    this.dialogIsOpened = true;

    const dialogSubmitSubscription = dialogRef.componentInstance.submitClicked
    .subscribe(result => {
      console.log('Got the data!', result);
      // do something here with the data
      this._rightSideNav.close();
      dialogSubmitSubscription.unsubscribe();
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log(`Dialog result: ${result}`);
      this.dialogIsOpened = false;
    });
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

}
