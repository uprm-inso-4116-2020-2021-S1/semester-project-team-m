import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
//FormControl, FormGroupDirective, NgForm, Validators, FormGroup
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

//   this.signInForm = new FormGroup({
//     email: new FormControl(this.email, [Validators.required, Validators.email]),
//     password: new FormControl(this.password, Validators.compose([
//         Validators.minLength(8),
//         Validators.required])
//     )
//   });
  }

  //missing email validation to enforce that the email already be in the system
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
//     return this.password.hasError('minlength') ? 'Not 8 characters or more' : '';
  }

}
