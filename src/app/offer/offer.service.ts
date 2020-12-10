import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AlertService } from '../core/alert.service';
import { AuthService } from '../core/auth.service';
import { LoadingService } from '../core/loading.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private authService: AuthService
  ) { }

  create(offer: any): void {
    this.loadingService.isLoading = true;

    const file = offer.image[0];

    const filePath = `${Math.pow(Math.random(), 10)}`
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await fileRef.getDownloadURL().toPromise();
        offer.image = url;

        this.db.collection('offers').add({ ...offer, creatorId: this.authService.uid, createdAt: new Date().toDateString() })
          .then((offer) => {
            const createdOffers = this.authService.user.createdOffers.concat([offer.id]);
            this.db.collection('users').doc(this.authService.uid).update({ createdOffers });

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

  edit(offer: any, id: string): void {
    this.loadingService.isLoading = true;
    if (typeof offer.image !== 'string') {
      const file = offer.image[0];

      const filePath = `${Math.pow(Math.random(), 10)}`
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(async () => {
          const url = await fileRef.getDownloadURL().toPromise();
          offer.image = url;

          const offerDoc = this.db.collection('offers').doc(id);
          offerDoc.update(offer)
            .then(res => {
              this.loadingService.isLoading = false;
              this.router.navigate([`offer/details/${id}`]);

              this.alertService.alert.message = 'Offer updated!';
              this.alertService.alert.style = 'alert-success';
            })
            .catch(error => {
              this.loadingService.isLoading = false;
              this.alertService.alert.message = error.message;
              this.alertService.alert.style = 'alert-danger';
            });
        })
      ).subscribe();
    } else {
      const offerDoc = this.db.collection('offers').doc(id);
      offerDoc.update(offer)
        .then(res => {
          this.loadingService.isLoading = false;
          this.router.navigate([`offer/details/${id}`]);

          this.alertService.alert.message = 'Offer updated!';
          this.alertService.alert.style = 'alert-success';
        })
        .catch(error => {
          this.loadingService.isLoading = false;
          this.alertService.alert.message = error.message;
          this.alertService.alert.style = 'alert-danger';
        });
    }

  }

  delete(id: string): void {
    this.loadingService.isLoading = true;

    const offerDoc = this.db.collection('offers').doc(id);
    offerDoc.delete()
      .then(res => {
        const createdOffers = this.authService.user.createdOffers;
        createdOffers.splice(createdOffers.indexOf(id), 1);
        this.db.collection('users').doc(this.authService.uid).update({ createdOffers });

        this.loadingService.isLoading = false;
        this.router.navigate(['/']);

        this.alertService.alert.message = 'Offer deleted!';
        this.alertService.alert.style = 'alert-success';
      })
      .catch(error => {
        this.loadingService.isLoading = false;

        this.alertService.alert.message = error.message;
        this.alertService.alert.style = 'alert-danger';
      });
  }

  getOffer(id: string | null) {
    return this.db.collection('offers').doc(`${id}`).snapshotChanges().pipe(
      map(x => {
        const data = x.payload.data() as object;

        this.loadingService.isLoading = false;

        return { ...data, id };
      })
    );
  }

  getOffers() {
    return this.db.collection('offers').snapshotChanges().pipe(
      map(x => x.map(a => {
        const data = a.payload.doc.data() as object;
        const id = a.payload.doc.id;
        this.loadingService.isLoading = false;
        return { id, ...data };
      }))
    );
  }
}