import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/loading.service';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  model: any = {};
  image: any = {};

  sub!: Subscription;
  offer!: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private offerService: OfferService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  onSubmit(f: NgForm): void {
    const offer = f.value;
    if (this.image.length) {
      offer.image = [...this.image];
    }
    console.log(offer);
  }

  onFileSelect(e: any): void {
    this.image = e.target.files;
  }

  ngOnInit(): void {

    this.loadingService.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offer = this.offerService.getOffer(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
