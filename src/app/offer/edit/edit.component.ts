import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/loading.service';
import { OfferService } from '../offer.service';
import { AuthService } from 'src/app/core/auth.service';
import { AlertService } from 'src/app/core/alert.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  @ViewChild('f') f!: FormControl;

  model: any = {};
  image: any;

  sub!: Subscription;
  offerSub!: Subscription;
  offer: any;

  constructor(
    private auth: AngularFireAuth,
    private offerService: OfferService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  onSubmit(f: NgForm): void {
    const offer = f.value;

    if (this.image && this.image.length) {
      offer.image = [...this.image];
    } else {
      offer.image = this.offer.image;
    }
    this.offerService.edit(offer, this.offer.id);
  }

  onFileSelect(e: any): void {
    this.image = e.target.files;
  }



  ngOnInit(): void {

    this.loadingService.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offerSub = this.offerService.getOffer(id).subscribe(val => {
          this.offer = val;
          if(this.offer.creatorId !== this.authService.uid){
            this.router.navigate([`/offer/details/${this.offer.id}`]);

            this.alertService.alert = {message: 'Access denied!', style: 'alert-danger'};
          }
          this.f.setValue({
            brandAndModel: this.offer.brandAndModel,
            image: '',
            year: this.offer.year,
            body: this.offer.body,
            price: this.offer.price,
            transmission: this.offer.transmission,
            fuel: this.offer.fuel,
            horsepower: this.offer.horsepower,
            distanceTraveled: this.offer.distanceTraveled,
            doors: this.offer.doors,
            location: this.offer.location,
            phone: this.offer.phone,
            description: this.offer.description
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.offerSub.unsubscribe();
  }

}
