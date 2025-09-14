import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UsersComponent } from './users/users.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
import { SettingsComponent } from './settings/settings.component';
import { RolesDirective } from 'src/app/helpers/directives/roles.directive';
import { HoverTxtBtnComponent } from '../shared/hover-txt-btn/hover-txt-btn.component';
import { MatDrawerHoverDirective } from 'src/app/helpers/directives/mat-drawer-hover.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { FoodMenuItemComponent } from './food-menu/food-menu-item/food-menu-item.component';
import { FoodMenuCartComponent } from './food-menu/food-menu-cart/food-menu-cart.component';
import { ClickOutsideDirective } from 'src/app/helpers/directives/click-outside.directive';
import { LanguageService } from 'src/app/services/language.service';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CustomFormOneComponent } from './custom-form/custom-form-one/custom-form-one.component';
import { CustomFormTwoComponent } from './custom-form/custom-form-two/custom-form-two.component';
import { UserComponent } from './custom-form/user/user.component';


@NgModule({
  declarations: [
    DashboardMainComponent,
    HeaderComponent,
    UsersComponent,
    SidenavComponent,
    DataTableComponent,
    CustomFormComponent,
    DataTableViewComponent,
    ProfileComponent,
    DataTableContainerComponent,
    FilterdataPipe,
    SettingsComponent,
    RolesDirective,
    HoverTxtBtnComponent,
    MatDrawerHoverDirective,
    MenuItemComponent,
    FoodMenuComponent,
    FoodMenuItemComponent,
    FoodMenuCartComponent,
    ClickOutsideDirective,
    CustomFormOneComponent,
    CustomFormTwoComponent,
    UserComponent
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
  providers: [
    LanguageService,
    TranslateService
  ],
  bootstrap: []
})
export class DashboardModule { }
