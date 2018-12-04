import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import{Category,Catergoria} from "../interfaces/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  url:string;
  constructor(public http:HttpClient) {
    this.url='http://3.17.28.49:3000/api';
  }

  getCategorias(){
    return this.http.get<Category>(this.url+'/categorias');
  }

  insertCategory(categoria:Catergoria){
    return this.http.post(this.url+'/categoria',categoria);
  }
}
