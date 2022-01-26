import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/modules/dashboard/services/customer.service';

@Component({
  selector: 'customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  providers: [CustomerService]
})
export class CustomerCardComponent implements OnInit {
  @Input() customer_id: number = 0;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  public customer: any;



  constructor(
    private customerService: CustomerService
  ) {
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.customer = null;
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(){
    this.petitionInProgress = true;
    this.customerService.getCustomerById(this.customer_id).subscribe({
      next: response => {
        this.petitionInProgress = false;
        if(response.status){
          this.error = false;
          this.message = '';
          this.customer = response.customer;
        }else{
          this.error = true;
          this.message = response.message;
        }
      },
      error: error => {
        this.petitionInProgress = false;
        this.error = true;
      }
    });

  }

}
