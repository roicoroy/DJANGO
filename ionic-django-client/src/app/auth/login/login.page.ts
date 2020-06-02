import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  access_code_field = false;
  errorMessage;
  non_field_errors;
  email_errors;
  constructor(
    private storageService: StorageService,
    private router: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
  }
  handleError(error: HttpErrorResponse) {
    this.non_field_errors = '';
    this.email_errors = '';
    if (error.status === 400 && error.error.non_field_errors) {
      this.non_field_errors = error.error.non_field_errors;
    }
    if (error.status === 400 && error.error.email) {
      this.email_errors = error.error.email;
    }
  }
  onSubmit() {
    const loggedUser = this.loginForm.value.username;
    if (this.loginForm.valid) {
      return this.auth.login(this.loginForm).subscribe(
        (token: any) => {
          if (token) {
            this.storageService.setData('token', token.token)
              .then(() => {
                this.storageService.setData('loggedUser', loggedUser);
                this.router.navigateByUrl('home');
              });
          } else {
            this.router.navigateByUrl('login');
          }
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
  register() {
    this.router.navigateByUrl('register');
  }
}
