import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { LoadingService } from 'src/app/core/loading.service';
import { OfferService } from 'src/app/offer/offer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  createdOffers: any;

  constructor(
    public authService: AuthService,
    private offerService: OfferService
  ) { }

  ngOnInit(): void {
    this.createdOffers = this.offerService.getUserOffers(this.authService.uid);
  }

  ngOnDestroy(): void {
  }
}
