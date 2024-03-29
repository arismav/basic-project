import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UsersComponent } from './users/users.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';
import { FilterdataPipe } from 'src/app/helpers/pipes/filterdata.pipe';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';
import { DataTableContainerComponent } from './data-table-container/data-table-container.component';
import { StoreModule } from '@ngrx/store';
import { entriesReducer } from 'src/app/store/reducers/entries.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EntriesEffect } from 'src/app/store/effects/entries.effect';
import { reducers } from 'src/app/store/app.states';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    HeaderComponent,
    UsersComponent,
    SidenavComponent,
    DataTableComponent,
    DataTableViewComponent,
    ProfileComponent,
    DataTableContainerComponent,
    FilterdataPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('myentries', reducers.myentries),
    EffectsModule.forFeature([EntriesEffect])
  ],
  providers: [],
  bootstrap: []
})
export class DashboardModule { }
