import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert: {message: string, style: string} = { message: '', style: '' };
  constructor() { }
}
