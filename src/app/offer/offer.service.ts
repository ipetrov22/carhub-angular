import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService implements OnDestroy {
  sub!: Subscription;
  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private router: Router) { }

  create(offer: any): void {
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
            this.router.navigate(['/']);
          })
          .catch(error => {
            console.log(error);
          });
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
