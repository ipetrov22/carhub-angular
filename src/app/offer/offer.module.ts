import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { AngularFireStorageModule } from '@angular/fire/storage';



@NgModule({
  declarations: [
    OfferListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireStorageModule
  ]
})
export class OfferModule { }
