import { Component, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/reducers/app.reducer';
//import * as AuthActions from './store/auth.actions';
import { map, tap, take } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  showFiller = false;

  constructor(
    private _store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit(): void {

  }

}
