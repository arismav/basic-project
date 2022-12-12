import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-mav-oct-22';

  constructor(
    private _authService : AuthService
  ) {}

  ngOnInit() {
    this._authService.autoLogin();
  }
}
