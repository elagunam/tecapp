import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/dashboard/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  public form: FormGroup;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.form = this.fb.group({
      full_name: ['', [Validators.required, Validators.pattern(/^[a-z|A-Z|á|é|í|ó|ú|Á|É|Í|Ó|Ú|ñ|Ñ]{1,}[.]{0,1}([\s]{1,1}[a-z|A-Z|á|é|í|ó|ú|Á|É|Í|Ó|Ú|ñ|Ñ]{1,}[.]{0,1})*$/)]],
      address: ['',[Validators.required]],
      birth: [null, [Validators.required]],
      gender: ['', [Validators.required]]
    });
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  saveCustomer(){
    this.form.disable();
    this.petitionInProgress = true;
    this.customerService.saveCustomer(this.form.value).subscribe({
      next: response => {
        this.form.enable();
        this.petitionInProgress = false;
        if(response.status){
          this.router.navigate(['/panel/accounts/'+response.customer_id]);
        }else{
          this.error = true;
          this.message = response.message;
        }
      },
      error: error => {
        this.form.enable();
        this.petitionInProgress = false;
        this.error = true;
        this.message = 'Hubo un error al procesar su petición';
      }
    });

  }

}
