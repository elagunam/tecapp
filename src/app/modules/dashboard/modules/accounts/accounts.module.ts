import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './pages/account/account.component';
import { MovementComponent } from './components/movement/movement.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MovementsComponent } from './components/movements/movements.component';


@NgModule({
  declarations: [
    AccountsComponent,
    AccountComponent,
    MovementComponent,
    MovementsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ComponentsModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  entryComponents: [
    MovementComponent,
    MovementsComponent
  ]
})
export class AccountsModule { }
