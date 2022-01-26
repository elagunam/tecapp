import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AccountsService } from 'src/app/modules/dashboard/services/accounts.service';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';


export interface DialogData {
  account_number: number
}

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
  providers: [AccountsService, DashboardService]
})
export class MovementsComponent implements OnInit {
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  public movements: any;

  constructor(
    public dialogRef: MatDialogRef<MovementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private accountsService: AccountsService,
  ) {
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.movements = false;
  }

  ngOnInit(): void {
    this.getMovements();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getMovements(){
    this.accountsService.getMovements().subscribe({
      next: response => {
        const movements = Object.values(response);
        this.movements = movements.filter((account: any) => account.numeroCuenta == this.data.account_number);
      },
      error: error => {
        this.error = true;
        this.petitionInProgress = false;
        this.message = error.statusText;
      }
    });
  }

}
