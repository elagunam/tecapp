import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotfoundComponent } from '../main/pages/notfound/notfound.component';
import { AccountsModule } from './modules/accounts/accounts.module';
import { CustomerModule } from './modules/customer/customer.module';
import { HomeModule } from './modules/home/home.module';
import { PanelComponent } from './pages/panel/panel.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => HomeModule,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'customer',
        loadChildren: () => CustomerModule,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      },
      {
        path: 'accounts',
        loadChildren: () => AccountsModule,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard]
      }

    ]
  },
  {
    path: '**',
    component: NotfoundComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
