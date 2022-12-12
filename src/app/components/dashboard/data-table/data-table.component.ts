import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { IEntry } from 'src/app/models/entry.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  public isLoading: boolean = false;
  // public ELEMENT_DATA: any = [];
  public filterSelectObj: any = [];
  public filterValues: any = {};
  public searchApplied: boolean = false;
  public tableIsLoaded: boolean = false;
  

  public searchText: string = '';

  // public displayedColumns: string[] = ['id', 'API', 'Category', 'HTTPS', 'Actions'];
  // public dataSource = new MatTableDataSource();

  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource();
  @Input() tableData: any;
  @Output() deleteEvent = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild('sortEl', { static: false }) sortEl = new MatSort();

  constructor(
    private _dashboardService: DashboardService,
    private _ch: ChangeDetectorRef
  ) {
    // Object to create Filter for
    this.filterSelectObj = [
      {
        name: 'Category',
        columnProp: 'Category',
        options: []
      },
      {
        name: 'HTTPS',
        columnProp: 'HTTPS',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    // this.getTableData();
  }

  ngAfterViewInit(): void {
    console.log(this.dataSource);
    console.log(this.tableData);
    // this.ELEMENT_DATA = this.dataSource.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortEl;
    // console.log(this.ELEMENT_DATA);
    this.filterSelectObj.filter((o: any) => {
      console.log(o);
      o.options = this.getFilterObject(this.tableData, o.columnProp);
    });
    this.dataSource.filterPredicate = this.createFilter();
    this.isLoading = false;
    this._ch.detectChanges();
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // getTableData = () => {
  //   this.isLoading = true;
  //   this._dashboardService.getTableData()
  //     .pipe(
  //       map((res: any, index: number) => {
  //         console.log(res);
  //         const newRes = { ...res };
  //         newRes["entries"].map((entry: any, index: number) => entry.id = index);
  //         return newRes;
  //       })
  //     )
  //     .subscribe((res: any) => {
  //       this.dataSource.data = res["entries"];
  //       this.ELEMENT_DATA = res["entries"];
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sortEl;
  //       this.filterSelectObj.filter((o: any) => {
  //         console.log(o);
  //         o.options = this.getFilterObject(this.ELEMENT_DATA, o.columnProp);
  //       });
  //       this.dataSource.filterPredicate = this.createFilter();
  //       this.isLoading = false;
  //     });

  // }

  applyFilter = (event: Event) => {
    this.searchApplied = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //Reset filters on columns
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: string) => {
      value.modelValue = undefined;
    })
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    let filterFunction = function (data: any, filter: string): any {
      let searchTerms: any;
      function isJsonString(str: string) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
      if (isJsonString(filter)) {
        searchTerms = JSON.parse(filter);
      } else {

        const newFilter = {
          id: filter,
          Category: filter,
          API: filter,
          HTTPS: filter
        }
        searchTerms = JSON.parse(JSON.stringify(newFilter))
      }
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction

  }



  // Called on Filter change
  filterChange(filter: any, event: any) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: string) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  deleteRow(id:number) {
    // console.log(id);
    // console.log(this.tableData);
    // const newTableData = this.tableData.filter((data:any) => data.id !== id);
    // this._dashboardService.setTableDataStore(newTableData);
    this.deleteEvent.emit(id);
  }

}
