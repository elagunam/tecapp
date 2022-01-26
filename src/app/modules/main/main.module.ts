import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainComponent,
    NotfoundComponent
  ]
})
export class MainModule { }
