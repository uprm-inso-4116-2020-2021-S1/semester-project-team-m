import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

export class Message {
  content: string;
  style: string;
  dismissed: boolean = false;

  constructor(content, style?) {
    this.content = content
    this.style = style || 'info'
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  baseUrl = 'https://terrain.gabrielrosa.dev/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) { }

  successToast(msg: string) {
    this.toast.success(msg);
  }

  errorToast(msg: string) {
    this.toast.error(msg);
  }

  infoToast(msg: string) {
    this.toast.info(msg)
  }

  // showSuccess(...messages) {
  //   this.toast.success(messages)
  // }

  // getMessages() {
  //   return this.http.
  // }
}