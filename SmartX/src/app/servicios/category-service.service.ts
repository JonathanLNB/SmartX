import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
export interface Category {
  categorias:any,
  valid:number
}

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(public http:HttpClient) { }

  getCategorias(){
    return this.http.get<Category>('http://104.248.236.184:3000/api/categorias');
  }
}
