import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Proveedor} from "../interfaces/Interfaces";

export interface Providers {
  proveedores:any,
  valid:number
}
@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {
  url:string;
  constructor(public http:HttpClient) {
    this.url='http://3.17.28.49:3000/api';
  }

  getProviders(){
    return this.http.get<Providers>(this.url+'/proveedores');
  }

  insertProvider(provider:Proveedor){
    return this.http.post(this.url+'/proveedor',provider);
  }
}
