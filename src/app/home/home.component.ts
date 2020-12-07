import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
