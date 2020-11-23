import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../business-logic/authentication/authentication.service';
import { CookieService } from 'ngx-cookie-service';

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

  saveForm() {
    this.authService.login(this.logInForm.value).subscribe(
      (res: TokenObj) => {
        console.log('Token', res)
        this.cookieService.set('courses-token', res['token']);
        // this.isSignedIn.emit(true)
        // alert("User successfully logged in")
        this.router.navigate(['/home']);
      },
      error => {
        console.log('error', error)
        this.logInForm.setValue({
          email: this.logInForm.get('email').value,
          password: ''
        })
        alert('User Not Found')
      },
    );
    // this.cookie.set("token", )
  }

  register() {
    let password = this.registerForm.get('password');
    let confirmPassword = this.registerForm.get('confirmPassword');

    if (!this.registerForm.value['email'].includes('@')) {
      alert('Please provide a valid email address');
    }
    else if (password !== confirmPassword) {
      alert('password and confirmPassword do not match');
    }
    else {
      this.authService.register(this.registerForm.value).subscribe(
        result => {
          console.log(result);
          this.saveForm()
        }
      )
    }
  }
}
