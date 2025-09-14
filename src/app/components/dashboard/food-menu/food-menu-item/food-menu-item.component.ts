import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-food-menu-item',
  templateUrl: './food-menu-item.component.html',
  styleUrls: ['./food-menu-item.component.scss']
})
export class FoodMenuItemComponent implements OnInit {

  @Input() foodItem: any;

  constructor(
    private _dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  addToCart = () => {
    this._dashboardService.setCartItems(this.foodItem);
  }
}
