import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../core/alert.service';
import { LoadingService } from '../core/loading.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService implements OnDestroy {
  sub!: Subscription;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) { }

  create(offer: any): void {
    this.loadingService.isLoading = true;

    const file = offer.image[0];

    const filePath = `${Math.pow(Math.random(), 10)}`
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.sub = task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await fileRef.getDownloadURL().toPromise();
        offer.image = url;

        this.db.collection('offers').add(offer)
          .then(() => {
            this.loadingService.isLoading = false;
            this.router.navigate(['/']);

            this.alertService.alert.message = 'Offer created!';
            this.alertService.alert.style = 'alert-success';
          })
          .catch(error => {
            this.loadingService.isLoading = false;
            this.alertService.alert.message = error.message;
            this.alertService.alert.style = 'alert-danger';
          });
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('unsub');
  }
}
