import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../business-logic/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../business-logic/toast/toast.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

interface TokenObj {
  token: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  message: any = "";

  logInForm: FormGroup;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    const coursesToken = this.cookieService.get('courses-token');
    if (coursesToken)
      this.router.navigate(['/home'])

    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: [''],
        student_id: ['']
      },
      {
        validator: this.checkPassword
      })
  }


  // get password() { return this.registerForm.get('password') }
  // get confirmPassword() { return this.registerForm.get('confirmPassword') }

  checkPassword(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  signin() {
    this.authService.signin(this.logInForm.value).subscribe(
      (res: TokenObj) => {
        console.log('Token', res)
        this.cookieService.set('courses-token', res['token']);
        this.toast.successToast("User successfully logged in")
        this.router.navigate(['/home']);
      },
      error => {
        console.log('error', error)
        this.logInForm.setValue({
          email: this.logInForm.get('email').value,
          password: ''
        })
        this.toast.errorToast('User Not Found');
      },
    );
  }

  register() {
    let password = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;

    if (!this.registerForm.value['email'].includes('@')) {
      this.toast.infoToast('Please provide a valid email address');
    }
    else if (password.value.length > 8) {
      this.toast.errorToast('Password length - up to 8 characters');
    }
    else if (password !== confirmPassword) {
      this.toast.infoToast('Password and confirmPassword do not match');
    }
    else {
      this.authService.register(this.registerForm.value).subscribe(
        result => {
          console.log(result);
          this.signin()
        }
      )
    }
  }
}
