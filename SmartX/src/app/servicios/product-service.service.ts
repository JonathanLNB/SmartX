import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Pupdated,Productos,Product,SProduct} from "../interfaces/Interfaces";
/*onst httpOptions={
  headers:new HttpHeaders({
    'user':'af5ff2a549c2090a382151614def2a3e',
    'pwd':'b77a38ec4b8caea8569894d2e56577df'
  })
};*/
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url:string;
  constructor(public http:HttpClient) {
    this.url='http://104.248.236.184:3000/api';
  }

  getProductos(){
    let productos:any;
      return this.http.get<Product>(this.url+"/reportes/total/productos")

  }
  insertProduct(producto:SProduct){
      return this.http.post<Pupdated>(this.url+'/producto',producto,);
  }

}
