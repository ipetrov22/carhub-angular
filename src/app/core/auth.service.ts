import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  uid: string = '';
  user: any;
  userSub!: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.auth.user.subscribe(user => {
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedIn = true;
        this.uid = user.uid;

        this.userSub = this.db.collection('users').doc(this.uid).valueChanges()
          .subscribe(val => {
            this.user = val;
          });

      } else {
        if(this.userSub){
          this.userSub.unsubscribe();
        }

        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = false;
        this.uid = 'false';
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
      const u: any = user;;
      this.isLoggedIn = true;
      this.db.collection('users').doc(u.user.uid).set({
        email,
        favouriteOffers: [],
        createdOffers: [],
        registeredOn: new Date().toDateString()
      });

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