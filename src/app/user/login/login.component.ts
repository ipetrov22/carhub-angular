import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.auth.login(f.value.email, f.value.password);
  }
}
