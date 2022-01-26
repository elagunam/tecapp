import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public petitionInProgress: boolean;
  public error: boolean | null;
  public message: string;
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthService
  ) {
    this.petitionInProgress = false;
    this.error = null;
    this.message = '';
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      returnSecureToken: [true, [Validators.required]]
    });
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  login(){
    this.form.disable();
    this.petitionInProgress = true;
    this.authenticationService.loginWhithEmail(this.form.value).subscribe({
      next: (response =>{
        this.petitionInProgress = false;
        this.form.enable();
        const {idToken, email} = response;
        localStorage.setItem('token', idToken);
        localStorage.setItem('identity', email);
        this.router.navigate(['/panel']);
      }),
      error: (error => {
        this.petitionInProgress = false;
        this.form.enable();
        this.message = 'Credenciales de acceso incorrectas';
        this.error = true;
      })
    });
  }

}
