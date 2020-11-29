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

  signinForm: FormGroup;
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

    this.signinForm = this.formBuilder.group({
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
    let email = this.signinForm.get('email').value;
    let password = this.signinForm.get('password').value;

    if (!email.includes('@'))
      this.toast.infoToast('Please provide a valid email address');
    else if (!password)
      this.toast.infoToast('Please provide a password');
    else {
      this.authService.signin(this.signinForm.value).subscribe(
        (res: TokenObj) => {
          console.log('Token', res)
          this.cookieService.set('courses-token', res['token']);
          this.toast.successToast("User successfully logged in")
          this.router.navigate(['/home']);
        },
        error => {
          this.toast.errorToast('User Not Found');
          this.signinForm.setValue({
            email: email,
            password: ''
          })
        },
      );
    }
  }

  register() {
    let email = this.registerForm.get('email').value;
    let password = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;

    if (!email.includes('@'))
      this.toast.infoToast('Please provide a valid email address');
    else if (!password)
      this.toast.infoToast('Please provide a password');
    else if (password.length > 8)
      this.toast.errorToast('Password length - up to 8 characters');
    else if (password !== confirmPassword)
      this.toast.infoToast('Password and confirmPassword do not match');
    else {
      this.authService.register(this.registerForm.value).subscribe(
        result => {
          this.toast.successToast("Welcome to Rum's Atmosphere!")
          this.signin()
        }
      )
    }
  }
}
