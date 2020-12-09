import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  model: any = {};
  image: any = {};
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    const offer = f.value;
    offer.image = [...this.image];
    this.offerService.create(offer);
  }

  onFileSelect(e: any): void {
    this.image = e.target.files;
  }
}
