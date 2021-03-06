import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './home/browse/browse.component';
import { DropdownDirective } from './core/header/dropdown.directive';
import { CreateComponent } from './offer/create/create.component';
import { LoadingComponent } from './core/loading/loading.component';
import { AlertComponent } from './core/alert/alert.component';
import { OfferListComponent } from './home/browse/offer-list/offer-list.component';
import { DetailsComponent } from './offer/details/details.component';
import { EditComponent } from './offer/edit/edit.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    BrowseComponent,
    DropdownDirective,
    CreateComponent,
    LoadingComponent,
    AlertComponent,
    OfferListComponent,
    DetailsComponent,
    EditComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
