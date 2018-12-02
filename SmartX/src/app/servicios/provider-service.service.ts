import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Providers {
  proveedores:any,
  valid:number
}
@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {
  constructor(public http:HttpClient) {}

  getProviders(){
    return this.http.get<Providers>('http://104.248.236.184:3000/api/proveedores');
  }
}
