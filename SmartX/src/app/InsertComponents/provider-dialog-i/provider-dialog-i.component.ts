import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {ProviderServiceService} from "../../servicios/provider-service.service";

export interface proveedores {
  idproveedor:number,
  proveedor:string,
  rfc:string
}
@Component({
  selector: 'app-provider-dialog-i',
  templateUrl: './provider-dialog-i.component.html',
  styleUrls: ['./provider-dialog-i.component.css'],
  providers:[ProviderServiceService]
})
export class ProviderDialogIComponent implements OnInit {
  protected provider:proveedores;
  constructor(public dialog:MatDialogRef<ProviderDialogIComponent>,
              private providerService:ProviderServiceService) { }

  ngOnInit() {
    this.provider={
      idproveedor:0,
      proveedor:"",
      rfc:""
    }
  }
  send(){
      let dialog=this.dialog;
      this.providerService.insertProvider(this.provider).subscribe(data=>{
        dialog.close(1);
      },error1 => {
        console.log(error1);
        alert("Algo salio mal intentelo mas tarde");
        dialog.close();
      });
  }
}
