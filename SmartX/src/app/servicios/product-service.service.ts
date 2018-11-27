import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
/*onst httpOptions={
  headers:new HttpHeaders({
    'user':'af5ff2a549c2090a382151614def2a3e',
    'pwd':'b77a38ec4b8caea8569894d2e56577df'
  })
};*/
export interface Product{
  productos:any,
  valid:number
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url:string;
  constructor(public http:HttpClient) {
  }

  getProductos(){
    let productos:any;
      return this.http.get<Product>("http://104.248.236.184:3000/api/reportes/total/productos")

  }

}
