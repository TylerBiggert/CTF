import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressBarModule, MatExpansionModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  loginForm: FormGroup;
  isAuthProcessRunning: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]], 
      password: ["", [Validators.required]]
    });
  }

  onLoginFormSubmitted() {
    if(this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if (email && password) {
        this.isAuthProcessRunning = true;
        this.errorMessage = '';
      
        this.authService.simpleLoginNotFullBlownJwtImplementation(email, password).pipe(take(1)).subscribe({
          next: (isLoginSuccessful: boolean) => {
            if (isLoginSuccessful) {
              this.router.navigate(['secured/business-center']);
            } else {
              this.errorMessage = 'Invalid email or password';
            }
          },
          error: (err) => {
            this.errorMessage = 'Error';
          },
          complete: () => {
            this.isAuthProcessRunning = false;
          },
        });
      }
    }
  }
}
