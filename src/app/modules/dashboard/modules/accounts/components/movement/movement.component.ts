import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AccountsService } from 'src/app/modules/dashboard/services/accounts.service';
import { DashboardService } from 'src/app/modules/dashboard/services/dashboard.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  account_number: number,
  movement_kind: number
}

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
  providers: [AccountsService, DashboardService]
})
export class MovementComponent implements OnInit {
  form: FormGroup;
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<MovementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private accountsService: AccountsService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      fechaUltimaAct: [this.getCurrentDay(), [Validators.required]],
      monto: ['', [Validators.required]],
      numeroCuenta: [this.data.account_number, [Validators.required]],
      terminal: ['TERM235', [Validators.required]],
      tipo: [this.data.movement_kind, [Validators.required]],
      usuario: [this.dashboardService.getUserName(), [Validators.required]]
    });

    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
  }

  ngOnInit(): void {
    this.formControl['numeroCuenta'].setValue(this.data.account_number);
    this.formControl['tipo'].setValue(this.data.movement_kind);
    
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

  get formControl() {
    return this.form.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveMovement(){
    this.form.disable();
    this.petitionInProgress = true;
    this.error = false;
    this.accountsService.makeMovement(this.form.value).subscribe({
      next: response => {
        this.snackBar.open('Movimiento realizado correctamente', 'Cerrar', {duration: 2000});
        this.dialogRef.close(true);
      },
      error: error => {
        this.petitionInProgress = false;
        this.error = true;
        this.message = 'No se pudo aplicar el movimiento...';
      }
    });
  }

}
