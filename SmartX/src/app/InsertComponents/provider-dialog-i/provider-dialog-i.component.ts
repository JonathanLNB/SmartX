import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

export interface proveedores {
  idproveedor:number,
  proveedor:string,
  rfc:string
}
@Component({
  selector: 'app-provider-dialog-i',
  templateUrl: './provider-dialog-i.component.html',
  styleUrls: ['./provider-dialog-i.component.css']
})
export class ProviderDialogIComponent implements OnInit {
  protected provider:proveedores;
  constructor(public dialog:MatDialogRef<ProviderDialogIComponent>) { }

  ngOnInit() {
    this.provider={
      idproveedor:0,
      proveedor:"",
      rfc:""
    }
  }
  send(){

  }
}
