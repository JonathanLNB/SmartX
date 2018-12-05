import { Injectable } from '@angular/core';
import {RequestCupon,CuponUp,cuponUpdated} from "../interfaces/Interfaces";
import {HttpClient,HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CuponesService {
  private url:string;
  constructor(public http:HttpClient) {
    this.url='http://3.17.28.49:3000/api';
  }

  getCupones(){
    return this.http.get<RequestCupon>(this.url+'/cupones');
  }

  insertCupon(cupon:CuponUp){
    return this.http.post<cuponUpdated>(this.url+'/cupon',cupon);
  }

  deleteCupon(id:number){
      return this.http.delete(this.url+'/cupon/delete/'+id);
  }
}
