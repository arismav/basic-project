import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-food-menu-cart',
  templateUrl: './food-menu-cart.component.html',
  styleUrls: ['./food-menu-cart.component.scss']
})
export class FoodMenuCartComponent implements OnInit {

  public cartItems: any[] = [];

  constructor(
    private _dashboardService: DashboardService
  ) { 
    this._dashboardService.getCartItems().subscribe(cartItems => {
      console.log(cartItems);
      this.cartItems = cartItems;
    })
  }

  ngOnInit(): void {
  }

  clearCart() {
    this._dashboardService.resetCartItems()
  }

}
