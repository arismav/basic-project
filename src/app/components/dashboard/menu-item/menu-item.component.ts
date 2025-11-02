import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IMenu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: any;
  menuItemTranslation: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.menuItemTranslation = `dashboard.sidenav.${this.menuItem.label}`;
    console.log(this.menuItemTranslation);
  }

  // routeHandler = (routerLink: string): void => {
  //   console.log('router');
  //   this._router.navigate([`${routerLink}`], { relativeTo: this._activatedRoute });
  // }

}
