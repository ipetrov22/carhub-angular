import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy {
  offers!: any;
  sub!: Subscription;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading = true;
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offers = this.db.collection('offers').snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as object;
            const id = a.payload.doc.id;
            this.loadingService.isLoading = false;
            return { id, ...data };
          }))
        );
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
