import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
