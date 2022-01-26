import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/modules/dashboard/services/accounts.service'; 

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [AccountsService]
})
export class AccountComponent implements OnInit {
  public form: FormGroup;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  public customer_id: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountsService
  ) {
    
    this.form = this.fb.group({
      estado: ['Activa', [Validators.required]],
      fechaUltimaAct: [this.getCurrentDay(),[Validators.required]],
      idCliente: [null, [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
      saldo: ['', [Validators.required]]
    });
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.customer_id = 0;
  }

  ngOnInit(): void {
    this.getParams();
  }

  get formControl() {
    return this.form.controls;
  }

  getCurrentDay(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if(month < 10){
      return `${year}-0${month}-${day}`;
    }else{
      return `${year}-${month}-${day}`;
    }
  }

  getParams(){
    this.route.params.subscribe({next: (params)=> {
      if (!params['customer_id']){
        this.router.navigate(['/panel']);
        return;
      }
      this.formControl['idCliente'].setValue(params['customer_id']);
      this.customer_id = params['customer_id'];
    }, error: (error)=>{
      this.router.navigate(['/panel']);
    }});
  }

  saveAccount(){
    this.petitionInProgress = true;
    this.error = false;
    this.form.disable();
    this.accountService.saveAccount(this.form.value).subscribe({
      next: response => {
        this.router.navigate(['/panel/accounts/'+this.customer_id]);
      },
      error: error => {
        this.petitionInProgress = false;
        this.error = true;
        this.message = 'No se pudo registrar la cuenta, verifique la información';
      }
    });
  }

}
