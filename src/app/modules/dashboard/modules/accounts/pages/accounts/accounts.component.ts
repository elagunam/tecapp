import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from 'src/app/modules/dashboard/services/accounts.service';
import { MovementComponent } from '../../components/movement/movement.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [AccountsService]
})
export class AccountsComponent implements OnInit {
  public customer_id: number;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  public accounts: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountsService,
    public dialog: MatDialog,
  ) {
    this.customer_id = 0;
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.accounts = false;
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(){
    this.route.params.subscribe({next: (params)=> {
      if (!params['customer_id']){
        this.router.navigate(['/panel']);
        return;
      }
      this.customer_id = params['customer_id'];
      this.getCustomerAccounts();
    }, error: (error)=>{
      this.router.navigate(['/panel']);
    }});
  }

  getCustomerAccounts(){
    this.accountService.getCustomerAccounts().subscribe({
      next: response => {
        const accounts = Object.values(response);
        this.accounts = accounts.filter((account: any) => account.idCliente == this.customer_id);
      },
      error: error => {
        this.error = true;
        this.petitionInProgress = false;
        this.message = error.statusText;
      }
    });
    
  }

  processMovement(account_number: any, movement_kind: any){
    const dialogRef = this.dialog.open(MovementComponent, {
      width: '80%',
      data: {
        account_number,
        movement_kind
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getCustomerAccounts();
      }
    });

  }

  makeMovement(number_account: any, movement_type: any){
    this.processMovement(number_account, movement_type);
  }

  

}
