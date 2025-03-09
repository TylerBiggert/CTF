import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressBarModule, MatExpansionModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  registerForm: FormGroup;
  isFormSubmissionCallRunning: boolean = false;
  isFormSubmitted: boolean = false;
  isFormSubmissionError: boolean = false;
  messageToDisplayAfterSubmission: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fname: [""],
      lname: [""],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isFormSubmissionError = false;
    if (this.registerForm.valid) {
      this.isFormSubmitted = true;
      const newUserProfileObj = { fname: this.registerForm.value.fname, lname: this.registerForm.value.lname, email: this.registerForm.value.email, phone: this.registerForm.value.phone };

      this.isFormSubmissionCallRunning = true;
      this.authService.saveUserToDataseIfTheyDontExist(newUserProfileObj).pipe(take(1)).subscribe({
        next: (res: { isExistingEmail: boolean, isError: boolean, errorMessage: string }) => {
          if (!res.isError && !res.isExistingEmail) {
            this.messageToDisplayAfterSubmission = 'We have received your registration request. Your new account will be created within three days.';
            return;
          }
          
          this.handleFormSubmissionError('Please call customer support to discuss your account.');
        },
        error: (error) => {
          this.handleFormSubmissionError('Please call customer support to discuss your account.')
        },
        complete: () => {
          this.isFormSubmissionCallRunning = false;
        },
      });
    }
  }

  handleFormSubmissionError(errorMessage: string) {
    this.isFormSubmissionError = true;
    this.messageToDisplayAfterSubmission = errorMessage;
  }
}


