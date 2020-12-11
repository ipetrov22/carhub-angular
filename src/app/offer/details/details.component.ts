import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { LoadingService } from 'src/app/core/loading.service';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  offerSub!: Subscription;
  offer: any = {};
  isCreator: boolean = false;
  isFavorited: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private authService: AuthService
  ) { }

  onDelete(): void {
    const id = this.offer.id;
    this.offerService.delete(id);
  }

  onFavorite(): void {
    const id = this.offer.id;
    this.loadingService.isLoading = true;
    if (this.isFavorited) {
      this.offerService.unFavorite(id, this.offer.favoritedBy);
    } else {
      this.offerService.favorite(id, this.offer.favoritedBy);
    }
  }

  ngOnInit(): void {
    this.loadingService.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offerSub = this.offerService.getOffer(id).subscribe((val) => {
          this.offer = val;
          this.isFavorited = this.offer.favoritedBy.includes(this.authService.uid);
          this.isCreator = this.offer.creatorId === this.authService.uid;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.offerSub.unsubscribe();
  }
}
