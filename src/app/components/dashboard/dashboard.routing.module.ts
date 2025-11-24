import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from 'src/app/features/chat.component';
import { AuthGuard } from '../../guards/auth.guard';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { DataTableContainerComponent } from './data-table-container/data-table-container.component';
import { DataTableViewComponent } from './data-table-view/data-table-view.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FoodMenuComponent } from './food-menu/food-menu.component';
import { GridWsComponent } from './grid-ws/grid-ws.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UsersComponent } from './users/users.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardMainComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'webSocket',
        component: ChatComponent,
        data: {
          title: 'WebSocket'
        }
      },
      {
        path: 'grid-ws',
        component: GridWsComponent,
        data: {
          title: 'WebSocket'
        }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: {
          title: 'Notifications'
        }
      },
      {
        path: 'foodmenu',
        component: FoodMenuComponent,
        data: {
          title: 'Food-Menu'
        }
      },
      {
        path: 'custom-form',
        component: CustomFormComponent,
        data: {
          title: 'Custom-Form'
        }
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