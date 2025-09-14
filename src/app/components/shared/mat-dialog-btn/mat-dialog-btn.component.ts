import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mat-dialog-btn',
  templateUrl: './mat-dialog-btn.component.html',
  styleUrls: ['./mat-dialog-btn.component.scss']
})
export class MatDialogBtnComponent implements OnInit {

  @Input() buttonText: string = '';
  @Input() buttonType: string = '';
  @Input() buttonColor:string = '';

  @Output() onCloseDialog = new EventEmitter();
  @Output() onCloseDialogAndSidebar = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton = () => {
    this.onCloseDialog.emit();
  }

}
