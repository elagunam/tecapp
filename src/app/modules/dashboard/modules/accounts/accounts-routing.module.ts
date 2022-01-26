import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { AccountsComponent } from './pages/accounts/accounts.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':customer_id',
    component: AccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add/:customer_id',
    component: AccountComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
