import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProviderServiceService {
  url:string;
  constructor(http:HttpClient,headers:HttpHeaders) {
    this.url="104.248.236.184:3000";
  }
}
