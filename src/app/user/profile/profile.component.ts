import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { OfferService } from 'src/app/offer/offer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  createdOffers!: Observable<any>;
  favoriteOffers!: Observable<any>;
  offers!: Observable<any>;
  showsCreated: boolean = true;

  constructor(
    public authService: AuthService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.createdOffers = this.offerService.getCreatedOffers(this.authService.uid);
    this.favoriteOffers = this.offerService.getFavoriteOffers(this.authService.uid);
    this.offers = this.createdOffers;
  }

  showFavorite(): void {
    this.offers = this.favoriteOffers;
    this.showsCreated = false;
  }

  showCreated(): void {
    this.offers = this.createdOffers;
    this.showsCreated = true;
  }

  ngOnDestroy(): void {
  }
}
