import { Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder, NgForm, FormGroupDirective} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.logInForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }
    )

   }

  ngOnInit(): void {
  }

  //missing email validation to enforce that the email already be in the system
//   email = new FormControl('', [Validators.required, Validators.email]);
//   password = new FormControl('', [Validators.required]);
//
//   getEmailErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }
//     return this.email.hasError('email') ? 'Not a valid email' : '';
//   }
//
//   getPasswordErrorMessage() {
//     if (this.password.hasError('required')) {
//       return 'You must enter a value';
//     }
//     return '';
//     return this.password.hasError('minlength') ? 'Not 8 characters or more' : '';
//   }

}
