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
  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    const coursesToken = this.cookieService.get('courses-token');
    console.log(coursesToken)
    if (coursesToken)
      this.router.navigate(['/courses'])

    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['']
      },
      {
        validator: this.checkPassword
      })
  }

  checkPassword(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  saveForm() {
    this.authService.login(this.logInForm.value).subscribe(
      (result: TokenObj) => {
        console.log("result", result)
        this.cookieService.set("courses-token", result['token']);
        // alert("User successfully logged in")
        this.router.navigate(['/courses']);
      },
      error => {
        console.log("error", error)
        this.logInForm.setValue({
          email: this.logInForm.get('email'),
          password: ''
        })
        alert("User Not Found")
      },
    );
    // this.cookie.set("token", )
  }




  // login() {
  //   // originally
  //   // const body = {
  //   //   email: this.logInForm.get('email'),
  //   //   password: this.logInForm.get('password')
  //   // }
  //   // this.router.navigate(['/admin/purchases']);

  //   // At the moment
  //   const body = {
  //     email: this.logInForm.get('email'),
  //     password: this.logInForm.get('password')
  //   }

  //   // fetching api
  //   // this.authService.login().subscribe(
  //   //   data => {
  //   //     this.message = data['message'];
  //   //   },
  //   //   error => console.log(error)
  //   // )

  //   // this.router.navigate(['/courses']);
  // }
}
