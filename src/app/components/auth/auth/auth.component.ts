import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = true;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  changeTab(e: any) {
    console.log(e.index);
    if (e.index === 1) {
      this.isLogin = false;
      this._authService.setSwitchLoginMode(false)

    }

    if (e.index === 0) {
      this.isLogin = true;
      this._authService.setSwitchLoginMode(true)

    }
  }

}
