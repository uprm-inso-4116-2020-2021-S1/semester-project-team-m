import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private movies = ['Terminator', 'Predator'];

  constructor() { }

  getMovies() {
    return this.movies
  }
}
