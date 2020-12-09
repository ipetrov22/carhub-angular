import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/core/loading.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  offer!: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadingService.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.auth.user.subscribe((user) => {
      if (user) {
        this.offer = this.db.collection('offers').doc(`${id}`).snapshotChanges().pipe(
          map(x => {
            const data = x.payload.data() as object;

            this.loadingService.isLoading = false;
            
            return { ...data, id };
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
