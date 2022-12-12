import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEntries } from 'src/app/models/entry.model';
import { StyleManagerService } from 'src/app/style-manager.service';
import { IThemeOption, IThemeOptions } from '../../models/theme-option.model';
import * as fromApp from '../../store/reducers/app.reducer';
import * as DataTableActions from './../../store/actions/data-table.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private tableDataUrl = 'https://api.publicapis.org/entries'

  private tableDataStore = new BehaviorSubject(null);

  constructor(
    private _http: HttpClient,
    private _styleManager: StyleManagerService,
    private store: Store<fromApp.AppState>
  ) { }

  getThemeOptions(): Observable<IThemeOptions> {
    return this._http.get<IThemeOptions>("/assets/themes/theme-options.json");
  }

  setTheme(themeToSet: any) {
    console.log('set style')
    //this._styleManager.removeStyle(themeToSet);
    this._styleManager.setStyle(
      "theme",
      `node_modules/@angular/material/prebuilt-themes/${themeToSet}.css`
    );
  }


  getTableData(): Observable<any> {
    return this._http.get(this.tableDataUrl);
  }


  setTableDataStore(newData: any) {
    // this.tableDataStore.next(newData)
    this.store.dispatch(new DataTableActions.Storedata(
      { entries: newData }
    ))
  }

  getTableDataStore() {
    return this.tableDataStore;
  }


}
