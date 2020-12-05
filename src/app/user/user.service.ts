import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean;
  constructor() {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }
}
