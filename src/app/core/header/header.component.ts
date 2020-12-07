import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isLoading(): boolean {
    return this.loadingService.isLoading;
  }

  get alert(): boolean {
    return !!this.alertService.alert.message;
  }
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }
}
