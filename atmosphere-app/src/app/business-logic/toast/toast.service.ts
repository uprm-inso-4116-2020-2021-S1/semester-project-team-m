import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(
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
}