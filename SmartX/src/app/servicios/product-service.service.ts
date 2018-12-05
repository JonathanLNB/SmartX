import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Pupdated,Productos,Product,SProduct,RequestMarca,Marca} from "../interfaces/Interfaces";
/*const httpOptions={
  headers:new HttpHeaders({
    'user':'af5ff2a549c2090a382151614def2a3e',
    'pwd':'b77a38ec4b8caea8569894d2e56577df'
  })
};*/
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url:string;
  constructor(public http:HttpClient) {
    this.url='http://3.17.28.49:3000/api';
  }

  getProductos(){
    let productos:any;
      return this.http.get<Product>(this.url+"/reportes/total/productos")

  }
  insertProduct(producto:SProduct){
      return this.http.post<Pupdated>(this.url+'/producto',producto);
  }
  deleteProduct(id:number){
       return this.http.delete(this.url+'/producto/delete/'+id);
  }

  getMarcas(){
    return this.http.get<RequestMarca>(this.url+'/marcas');
  }

}
