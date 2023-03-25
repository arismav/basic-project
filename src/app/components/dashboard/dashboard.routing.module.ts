import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DataTableContainerComponent } from './data-table-container/data-table-container.component';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';
import { DataTableComponent } from './data-table/data-table.component';
import { UsersComponent } from './users/users.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'data-table',
        component: DataTableContainerComponent
      },
      {
        path: 'data-table/view',
        component: DataTableViewComponent
      },
      {
        path: 'data-table/view/:id',
        component: DataTableViewComponent
      }
   
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }