import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
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

  public selected = -1;
  allSelected=true;
  public isLoading: boolean = false;
  // public ELEMENT_DATA: any = [];
  public filterSelectObj: any = [];
  public filterValues: any = {};
  public searchApplied: boolean = false;
  public tableIsLoaded: boolean = false;
  displayColumn = new FormControl();
  // searchUserForm: FormGroup= new FormGroup();
  displayedColumnsSelection: string[] = [];


  public searchText: string = '';

  // public displayedColumns: string[] = ['id', 'API', 'Category', 'HTTPS', 'Actions'];
  // public dataSource = new MatTableDataSource();
  // @ViewChild('allSelected') private allSelected: MatOption = new MatOption();
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource();
  @Input() tableData: any;
  @Output() deleteEvent = new EventEmitter<number>();

  @ViewChild('select') select!: MatSelect ;

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
        name: 'Auth',
        columnProp: 'Auth',
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

  ngOnChanges(): void {
    this.displayedColumnsSelection = [...this.displayedColumns]
  }

  ngAfterViewInit(): void {
    console.log(this.displayColumn);
    console.log(this.dataSource);
    console.log(this.tableData);
    this.displayColumn = new FormControl(this.displayedColumnsSelection);
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
    // this._ch.detectChanges();
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

  deleteRow(id: number) {
    // console.log(id);
    // console.log(this.tableData);
    // const newTableData = this.tableData.filter((data:any) => data.id !== id);
    // this._dashboardService.setTableDataStore(newTableData);
    this.deleteEvent.emit(id);
  }

  /*checkbox change event*/
  onChange(event: any) {
    // console.log(event);
    // console.log(event)
    // this.displayedColumns = this.displayedColumns.filter((col) => {
    //   console.log(col);
    //   if (col === event) console.log('here');
    //   return col !== event;
    // });
    // console.log(this.displayedColumns);
  }
  handleSelected(option: string, selected: boolean, index: number) {
    console.log(option)
    console.log(selected);
    console.log(index);
    if (selected) {
      // this.displayedColumns.push(option);
      this.displayedColumns.splice(index, 0, option);
    } else {
      this.displayedColumns = this.displayedColumns.filter((col) => col !== option);
    }
    console.log(this.displayedColumns);
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => {
        this.displayedColumns = this.displayedColumnsSelection;
        item.select()});
    } else {
      this.displayedColumns = [];
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

}
