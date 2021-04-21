import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  incharge:string;

  name : string;
  logged = false;
  constructor() { }
}
