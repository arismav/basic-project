import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sing-in-container',
  templateUrl: './sing-in-container.component.html',
  styleUrls: ['./sing-in-container.component.scss']
})
export class SingInContainerComponent implements OnInit {

  isLogin: boolean = true;

  constructor() { }

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
