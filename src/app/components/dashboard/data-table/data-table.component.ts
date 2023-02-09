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
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {

  public selected = -1;
  public allSelected = true;
  public isLoading = false;
  // public isLoading: boolean = false;
  public filterSelectObj: any = [];
  public filterValues: any = {};
  public searchApplied: boolean = false;
  public tableIsLoaded: boolean = false;
  displayColumn = new FormControl();
  displayedColumnsSelection: string[] = [];


  public searchText: string = '';

  @Input() displayedColumns: string[] = [];
  @Input() tableData: IEntry[] = [];
  @Input() dataSource = new MatTableDataSource();
  @Output() deleteEvent = new EventEmitter<number>();

  @ViewChild('select') select!: MatSelect;

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
    console.log('here 1')
  }

  ngOnChanges(): void {
    // this.isLoading = true;
    console.log('ONCHANGES')
    this.displayedColumnsSelection = [...this.displayedColumns];
    console.log(this.dataSource.data)
    // if(this.dataSource.data.length > 0){
    //   this.isLoading = false;
    // }
    this.setTableFilters();


    this.displayColumn = new FormControl(this.displayedColumnsSelection);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortEl;

    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit(): void {
    this.displayColumn = new FormControl(this.displayedColumnsSelection);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortEl;

    this.dataSource.filterPredicate = this.createFilter();

    // this.isLoading = false;
  }

  setTableFilters() {
    this.filterSelectObj.filter((o: any) => {
      // console.log(o);
      o.options = this.getFilterObject(this.dataSource.data, o.columnProp);
    });
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    // console.log(fullObj);
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    // console.log(uniqChk);
    return uniqChk;
  }

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
    this.deleteEvent.emit(id);
  }

  handleSelected(option: string, selected: boolean, index: number) {
    if (selected) {
      this.displayedColumns.splice(index, 0, option);
    } else {
      this.displayedColumns = this.displayedColumns.filter((col) => col !== option);
    }
    this.displayedColumns.length !== this.displayedColumnsSelection.length ? this.allSelected = false : this.allSelected = true;
    // console.log(this.displayedColumns);
  }

  toggleAllSelection() {
    if (this.allSelected) {
      this.allSelected = true;
      this.select.options.forEach((item: MatOption) => {
        this.displayedColumns = this.displayedColumnsSelection;
        item.select()
      });
    } else {
      this.allSelected = false;
      this.displayedColumns = [];
      this.select.options.forEach((item: MatOption) => item.deselect());
    }

  }

}
