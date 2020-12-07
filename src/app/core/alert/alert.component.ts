import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  get alert(): { message: string, style: string } {
    return this.alertService.alert;
  }
  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onClose() {
    this.alert.message = '';
    this.alert.style = '';
  }
}
