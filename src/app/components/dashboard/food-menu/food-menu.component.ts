import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.scss']
})
export class FoodMenuComponent implements OnInit {

  public foodMenu : Array<any> = [];

  constructor(
    private _dashboardService: DashboardService
  ) { 
   this.foodMenu = this._dashboardService.foodMenu;
  }

  ngOnInit(): void {
  }

}
