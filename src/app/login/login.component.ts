import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Contact } from '../shared/contact-list.model';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SubmissionModalComponent } from '../contact-form/modal/submission-modal/submission-modal.component';

declare var bootstrap: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubmissionModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService, AuthGuard, JwtHelperService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usernameFC!: FormControl;
  passwordFC!: FormControl;
  authToken!: string;

  constructor(private service: LoginService, private router: Router) {}
  public jwtHelper: JwtHelperService = new JwtHelperService();
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.usernameFC = this.loginForm.get('username') as FormControl;
    this.passwordFC = this.loginForm.get('password') as FormControl;
  }

  validateFields() {
    this.login();
  }

  login() {
    this.service
      .login(new Login(this.usernameFC.value, this.passwordFC.value))
      .subscribe({
        next: (res: any) => {
          this.authToken = res.token;
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          const myModal = new bootstrap.Modal('#exampleModal', {
            keyboard: false,
          });
          myModal.show();
        },
      });
  }
}
