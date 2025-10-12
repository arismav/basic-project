import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SingInContainerComponent } from './components/auth/sing-in-container/sing-in-container.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { NoAuthGuard } from './guards/noauth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent, 
    // canActivate: [AuthGuard],
    canActivate: [NoAuthGuard],
    children: [
      {
        path: '',
        component: SingInContainerComponent,
        data: {
          title: 'Login/Register'
        }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
          title: 'Forgot Password'
        }
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent, data: {
    title: 'Not Found'
  } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
