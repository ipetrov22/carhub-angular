import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;

  constructor(
    private auth: AngularFireAuth,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
      } else {
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = false;
      }
    })
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
  }
  login(email: string, password: string) {
    this.loadingService.isLoading = true;

    this.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.isLoggedIn = true;
      this.loadingService.isLoading = false;
      this.router.navigate(['/']);

      this.alertService.alert.message = 'Login successful!';
      this.alertService.alert.style = 'alert-success';
    })
      .catch(error => {
        this.loadingService.isLoading = false;

        this.alertService.alert.message = 'Invalid credentials!';
        this.alertService.alert.style = 'alert-danger';
      });;
  }

  register(email: string, password: string) {
    this.loadingService.isLoading = true;

    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.isLoggedIn = true;
      this.loadingService.isLoading = false;
      this.router.navigate(['/']);

      this.alertService.alert.message = 'Register successful!';
      this.alertService.alert.style = 'alert-success';
    })
      .catch(error => {
        this.loadingService.isLoading = false;
        
        this.alertService.alert.message = error.message;
        this.alertService.alert.style = 'alert-danger';
      });;
  }

  logout() {
    this.loadingService.isLoading = true;

    this.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.loadingService.isLoading = false;
      this.router.navigate(['/']);

      this.alertService.alert.message = 'Logout successful!';
      this.alertService.alert.style = 'alert-success';
    })
      .catch(error => {
        this.loadingService.isLoading = false;
        
        this.alertService.alert.message = error.message;
        this.alertService.alert.style = 'alert-danger';
      });
  }
}