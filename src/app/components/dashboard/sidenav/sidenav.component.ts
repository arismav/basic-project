import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RolesService } from 'src/app/helpers/services/roles.service';
import { IMenu } from '../../../models/menu.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
  
  public menu: IMenu[] = this._dashboardService.menu;

  showFiller = false;

  constructor(
    private _translateService: TranslateService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _rolesService : RolesService,
    private _ch: ChangeDetectorRef,
    private _dashboardService: DashboardService
  ) {
   }

  ngOnInit(): void {
  }


  // routeHandler = (routerLink: string): void => {
  //   console.log('router');
  //   this._router.navigate([`${routerLink}`], {relativeTo: this._activatedRoute});
  // }

}
