import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading.service';
import { OfferService } from 'src/app/offer/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy {
  offers: any;
  sub!: Subscription;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private loadingService: LoadingService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.loadingService.isLoading = true;
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offers = this.offerService.getOffers();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
