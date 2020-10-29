import { Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder, NgForm, FormGroupDirective} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['']
      }, {validator: this.checkPasswords }
    )

   }

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

//   email = new FormControl('', [Validators.required, Validators.email]);
//   password = new FormControl('', [Validators.required, Validators.minLength(8)]);
//   confirmPassword = new FormControl('', [Validators.required]);
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
//     return this.password.hasError('minlength') ? 'Not 8 characters or more' : '';
//   }
//
//   getConfirmPasswordErrorMessage(){
//     if (this.confirmPassword.hasError('required')) {
//       return 'You must enter a value';
//     }
//     return '';
//     //return this.confirmPassword.hasError('minlength') ? 'Not 8 characters or more' : '';
//   }

}


