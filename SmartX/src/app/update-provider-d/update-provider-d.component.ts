import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import {ProviderServiceService} from "../servicios/provider-service.service";
import {Proveedor} from "../interfaces/Interfaces";

@Component({
  selector: 'app-update-provider-d',
  templateUrl: './update-provider-d.component.html',
  styleUrls: ['./update-provider-d.component.css'],
  providers:[ProviderServiceService]
})
export class UpdateProviderDComponent implements OnInit {
  proveedor:Proveedor;
  constructor(public dialog:MatDialogRef<UpdateProviderDComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private providerService:ProviderServiceService) { }

  ngOnInit() {
    this.proveedor=this.data;
  }
  actualizar(){
    let dialogo=this.dialog;
    this.providerService.insertProvider(this.proveedor).subscribe(data=>{
      dialogo.close(1);
    },error1 => {
      console.log(error1);
      alert("Algo salio mal intentelo mas tarde");
      dialogo.close();
    });
  }


}
