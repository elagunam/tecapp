import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { OpenGuard } from './guards/open.guard';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MainComponent } from './modules/main/main/main.component';
import { NotfoundComponent } from './modules/main/pages/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    canLoad: [OpenGuard],
    canActivate: [OpenGuard],
    loadChildren: () => AuthenticationModule
  },
  {
    path: 'panel',
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => DashboardModule
  },
  {
    path: '**',
    component: NotfoundComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
