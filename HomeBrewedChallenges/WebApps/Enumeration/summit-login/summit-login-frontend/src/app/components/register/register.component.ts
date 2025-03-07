import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formSubmissionResult: string = '';
  isFormSubmitted: boolean = false;

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
    // TODO - submit form to back end
    // check if user exists
    // if user exists, return error
    // if user does not exist, return success message
  }
}


