import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.auth.register(f.value.email, f.value.password);
  }
}
