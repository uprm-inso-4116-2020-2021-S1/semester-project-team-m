import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://127.0.0.1:8000/api/auth'

  constructor(
    private httpClient: HttpClient
  ) { }
}
