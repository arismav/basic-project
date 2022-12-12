import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import * as fromApp from '../../../store/reducers/app.reducer';

@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
  styleUrls: ['./data-table-container.component.scss']
})
export class DataTableContainerComponent implements OnInit {
  public isLoading: boolean = true;
  public tableData: any = [];
  public filterSelectObj: any = [];
  public filterValues: any = {};
  public searchApplied: boolean = false;
  public tableIsLoaded: boolean = false;
  public displayedColumns: string[] = ['id', 'API', 'Category', 'HTTPS', 'Actions'];
  public dataSource = new MatTableDataSource();

  constructor(
    private _dashboardService: DashboardService,
    private _ch: ChangeDetectorRef,
    private _store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this._dashboardService.getTableDataStore().subscribe((data) => {
    //   console.log(data);
    //   if (data) {
    //     this.dataSource.data = data;
    //     this.tableData = data;
    //   } else {
    //     this.getTableData();
    //   }
    // })

    this._store.select('datatable').subscribe((data:any) => {
      console.log(data);
      if (data.entries) {
        this.dataSource.data = [...data.entries];
        this.tableData = [...data.entries];
        // this._ch.detectChanges();
      } else {
        console.log('here');
        this.getTableData();
      }
    })

  }

  getTableData = () => {
    this.isLoading = true;
    this._dashboardService.getTableData()
      .pipe(
        map((res: any, index: number) => {
          console.log(res);
          const newRes = { ...res };
          newRes["entries"].map((entry: any, index: number) => entry.id = index);
          return newRes;
        })
      )
      .subscribe((res: any) => {
        this.dataSource.data = res["entries"];
        this.tableData = res["entries"];
        this.isLoading = false;
        console.log(this.tableData);
        this._ch.detectChanges();
        this._dashboardService.setTableDataStore(this.tableData);
      });

  }

  deleteRow(event: number) {
    console.log(event);
    const newTableData = this.tableData.filter((data: any) => data.id !== event);
    this._dashboardService.setTableDataStore(newTableData);
  }

}
