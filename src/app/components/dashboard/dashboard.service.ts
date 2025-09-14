import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { RolesService } from 'src/app/helpers/services/roles.service';
import { IEntries, IEntry } from 'src/app/models/entry.model';
import { IMenu } from 'src/app/models/menu.model';
import { StyleManagerService } from 'src/app/style-manager.service';
import { IThemeOption, IThemeOptions } from '../../models/theme-option.model';
// import * as fromApp from '../../store/reducers/app.reducer';
import * as DataTableActions from './../../store/actions/data-table.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public menu: IMenu[] = [
    {
      label: 'data-table',
      icon: 'grid_on',
      routerLink: 'data-table',
      role: this._rolesService.userRoles.User_View
    },
    {
      label: 'users',
      icon: 'timeline',
      routerLink: 'users',
      role : this._rolesService.userRoles.User_View
    },
    {
      label: 'profiles',
      icon: 'person',
      routerLink: 'profiles',
      role: this._rolesService.userRoles.User_View
    },
    {
      label: 'food-menu',
      icon: 'fastfood',
      routerLink: 'foodmenu',
      role: this._rolesService.userRoles.User_View
    },    
    {
      label: 'custom-form',
      icon: 'message',
      routerLink: 'custom-form',
      role: this._rolesService.userRoles.User_View
    }
  ]

  public foodMenu = [
    {
      id: 1,
      name: "Sushi",
      description: "Delicious sushi",
      price: 15,
    }
  ]

  private tableDataUrl = 'https://api.publicapis.org/entries';
  

  private foodMenuItems = new BehaviorSubject<any>(this.foodMenu);
  private cartItems = new BehaviorSubject<any[]>([]);
  private customFormOne = new BehaviorSubject<any>(null);
  private customFormTwo = new BehaviorSubject<any>(null);

  private tableDataStore = new BehaviorSubject(null);

  private _componentPortal$ = new BehaviorSubject<ComponentPortal<any> | null>(
    null
  );

  constructor(
    private _http: HttpClient,
    private _styleManager: StyleManagerService,
    private breakpointObserver: BreakpointObserver,
    private _rolesService: RolesService

    // private store: Store<fromApp.AppState>
  ) { }

  setCustomFormOne = (form: any) => {
    this.customFormOne.next(form);
  }

  getCustomFormOne = () => {
    return this.customFormOne.asObservable();
  }

  setCustomFormTwo = (form: any) => {
    this.customFormTwo.next(form);
  }

  getCustomFormTwo = () => {
    return this.customFormTwo.asObservable();
  }

  setCartItems = (item:any) => {
    this.getCartItems().pipe(
      take(1)
    ).subscribe((cartItems)=> {
      console.log(cartItems);
      this.cartItems.next([...cartItems,item])
    })
    // const cartItems = this.cartItems.value;
    // console.log(cartItems);
    // const newCartItems = [...cartItems,item];
    // this.cartItems.next(newCartItems);
  }

  resetCartItems = () => {
    this.cartItems.next([]);
  }

  getCartItems = () => {
    return this.cartItems.asObservable();
  }

  getFoodMenu = () => {
    return this.foodMenuItems.asObservable();
  }

  setFoodMenu = (item: any) => {
    const newFoodItems = [...this.foodMenu, item]
    this.foodMenuItems.next(newFoodItems);
  }

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


  // getTableData(): Observable<IEntry[]> {
  //   return this._http.get<IEntry[]>('assets/data.json')
  //   // .pipe(
  //   //   map((res: any, index: number) => {
  //   //     console.log(res);
  //   //     const newRes = { ...res };
  //   //     newRes.entries.map((entry: any, index: number) => entry.id = index + 1);
  //   //     return newRes.entries;
  //   //   }),
  //   // )
  //   .subscribe((res)=> {
  //     console.log(res);
  //     // return of(JSON.stringify(res));
  //   })
  // }

  getTableData(): Observable<IEntry[]> {
    return this._http.get<any>('assets/data.json').pipe(
      map(res => {
        console.log(res);
        const entries = res || [];
        return entries.map((entry: any, index: number) => ({
          ...entry,
          id: index + 1
        }));
      })
    );
  }


  create(newData: IEntry): Observable<IEntry> {
    return of(newData);
  }

  delete(deleteData: number): Observable<number> {
    return of(deleteData);
  }

  update(updateIndex: number, updateEntry:IEntry): Observable<{updateIndex: number, updateEntry:IEntry}> {
    return of({updateIndex: updateIndex, updateEntry:updateEntry});
  }



  setTableDataStore(newData: any) {
    // this.tableDataStore.next(newData)
    // this.store.dispatch(new DataTableActions.Storedata(
    //   { entries: newData }
    // ))
  }

  getTableDataStore() {
    return this.tableDataStore;
  }

  getComponentPortal$(): Observable<ComponentPortal<any> | null> {
    return this._componentPortal$.asObservable();
  }
  setComponentPortal(component: ComponentType<any> ) {
    this._componentPortal$.next(new ComponentPortal<any>(component));
  }


  getScreenObserver() {
       // detect screen size changes
      return this.breakpointObserver.observe([
        "(max-width: 768px)"
      ]);
  }

}
