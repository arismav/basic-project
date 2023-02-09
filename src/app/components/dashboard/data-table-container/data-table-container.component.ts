import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
// import * as fromApp from '../../../store/reducers/app.reducer';
import { IEntry } from 'src/app/models/entry.model';
import { selectEntries } from 'src/app/store/selectors/entries.selector';
import { deleteEntryAPISuccess, invokeDeleteEntryAPI, invokeEntriesAPI } from 'src/app/store/actions/entries.actions';

@Component({
  selector: 'app-data-table-container',
  templateUrl: './data-table-container.component.html',
  styleUrls: ['./data-table-container.component.scss']
})
export class DataTableContainerComponent implements OnInit {
  public isLoading: boolean = false;
  public tableData: any = [];
  public filterSelectObj: any = [];
  public filterValues: any = {};
  public searchApplied: boolean = false;
  public tableIsLoaded: boolean = false;
  public displayedColumns: string[] = ['id', 'API', 'Category', 'HTTPS', 'Actions'];
  public dataSource: any = new MatTableDataSource();
  public entries$ = this._store.pipe(select(selectEntries));

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
    // this.isLoading = true;
    console.log('here');
    console.log(this.dataSource);
    this._store.dispatch(invokeEntriesAPI());

    this.entries$.subscribe((entries) => {
      // this.isLoading = false;
      this.dataSource = new MatTableDataSource(entries);
      // this.dataSource = {...this.dataSource, data:[...entries]};
      // this.dataSource._updateChangeSubscription();
      // this.dataSource = {...this.dataSource}
      // this.tableData = [...entries];
      console.log(this.dataSource);
    })
  }

  deleteRow(event: number) {
    // console.log(event);
    this._store.dispatch(invokeDeleteEntryAPI({ deleteEntryId: event }));
  }

}
