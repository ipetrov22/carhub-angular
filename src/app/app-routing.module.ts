import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo, customClaims } from '@angular/fire/auth-guard';
import { CreateComponent } from './offer/create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './user/register/register.component';
import { DetailsComponent } from './offer/details/details.component';
import { EditComponent } from './offer/edit/edit.component';
import { ProfileComponent } from './user/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'login',
        component: LoginComponent,
        ...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'register',
        component: RegisterComponent,
        ...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'create',
        component: CreateComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'offer/details/:id',
        component: DetailsComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'offer/edit/:id',
        component: EditComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'profile',
        component: ProfileComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
