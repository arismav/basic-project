import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IMenu } from '../../../models/menu.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public menu: IMenu[] = [
    {
      label : this._translateService.instant('dashboard.sidenav.data-table'),
      routerLink: 'data-table'
    },
    {
      label : this._translateService.instant('dashboard.sidenav.users'),
      routerLink: 'users'
    },
    {
      label : this._translateService.instant('dashboard.sidenav.profiles'),
      routerLink: '/profiles'
    }
  ]

  showFiller = false;

  constructor(
    private _translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
