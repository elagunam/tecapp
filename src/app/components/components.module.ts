import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    LoadingComponent,
    CustomerCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    LoadingComponent,
    CustomerCardComponent
  ]
})
export class ComponentsModule { }
