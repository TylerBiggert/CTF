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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  registerForm: FormGroup;
  isFormSubmitted: boolean = false;
  isFormSubmissionError: boolean = false;
  messageToDisplayAfterSubmission: string = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fname: [""],
      lname: [""],
      email: ["", [Validators.required, Validators.email]], 
      phone: [""]
    });
  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.isFormSubmissionError = false;
    if(this.registerForm.valid) {
      this.isFormSubmitted = true;
      const newUserProfileObj = {fname: this.registerForm.value.fname, lname: this.registerForm.value.lname, email: this.registerForm.value.email, phone: this.registerForm.value.phone};
      this.authService.saveUserToDataseIfTheyDontExist(newUserProfileObj).subscribe((res: {isExistingEmail: boolean, isError: boolean, errorMessage: string}) => {
        if(res.isError) {
          this.isFormSubmissionError = true;
          this.messageToDisplayAfterSubmission = res.errorMessage;
          return;
        }

        if(res.isExistingEmail) {
          this.messageToDisplayAfterSubmission = 'Error. Please call customer support to discuss your account.';
        } else {
          this.messageToDisplayAfterSubmission = 'Success! If this was a real app, the user would have been inserted into the database.';
        }
      }, (error) => {
        this.isFormSubmissionError = true;
        this.messageToDisplayAfterSubmission = error.errorMessage;
        return;
      }, () => {

      });
    }
  }
}


