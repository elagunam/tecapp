import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CustomerService, DashboardService]
})
export class HomeComponent implements OnInit {
  public userName: string;
  public form: FormGroup;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  public cutomers: any;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.userName = 'Usuario';
    this.form = this.fb.group({
      search: ['', [Validators.required]]
    });
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.cutomers = false;
  }


  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.userName = this.dashBoardService.getUserName();
  }

  search(){
    this.petitionInProgress = true;
    this.error = false;
    this.message = '';
    this.cutomers = false;
    this.customerService.searchCustomer(this.form.value).subscribe({
      next: (response)=>{
        this.petitionInProgress = false;
        if(response.status){
          this.message = '';
          this.cutomers = response.customers;
        }else{
          this.error = true;
          this.message = response.message;
          this.cutomers = false;
        }
      },
      error: (error) => {
        this.petitionInProgress = false;
        this.error = true;
        this.message = 'No se pudo realizar la búsqueda, intente de nuevo más tarde';
      }
    });
    

  }

}
