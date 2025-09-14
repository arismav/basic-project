import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-hover-txt-btn],app-hover-txt-btn',
  templateUrl: './hover-txt-btn.component.html',
  styleUrls: ['./hover-txt-btn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HoverTxtBtnComponent implements OnInit {
  public isClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  outsideClick(){
    // console.log('here');
    this.isClicked = false;
  }


  toggleClick():void {
    this.isClicked = !this.isClicked;
  }

}
