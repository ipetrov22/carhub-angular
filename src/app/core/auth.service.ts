import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(public auth: AngularFireAuth, private router: Router) {
    this.auth.user.subscribe(user => {
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
      } else {
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn);
    })
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    })
      .catch(error => {
        console.error(error);
      });;
  }

  register(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    })
      .catch(error => {
        console.error(error);
      });;
  }

  logout() {
    this.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    })
      .catch(error => {
        console.error(error);
      });
  }
}