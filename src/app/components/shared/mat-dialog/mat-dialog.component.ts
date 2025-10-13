import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<any>, 
  public _dashboardService: DashboardService,) { }

  ngOnInit(): void {
  }

  closeModalAndSidenav() {
    this.dialogRef.close();
    this.submitClicked.emit();
  }

  closeModal(e:any) {
    this.dialogRef.close();
  }

}
