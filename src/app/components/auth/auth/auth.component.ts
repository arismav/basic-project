import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isLogin: boolean = true;

  constructor(
    private _authService: AuthService,
    private _changeDetection: ChangeDetectorRef
  ) {
    console.log('IS LOGIN', this.isLogin)
   }

  ngOnInit(): void {
  }

  changeTab(e: any) {
    console.log(e.index);
    if (e.index === 1) {
      console.log('register');
      
      this.isLogin = false;
      // this._changeDetection.detectChanges();
      // this._authService.setSwitchLoginMode(false)
      

    }

    if (e.index === 0) {
      console.log('login');
      
      this.isLogin = true;
      // this._changeDetection.detectChanges();
      // this._authService.setSwitchLoginMode(true)

    }
  }

}
