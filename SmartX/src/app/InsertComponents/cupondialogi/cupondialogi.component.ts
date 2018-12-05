import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {CuponesService} from "../../servicios/cupones.service";
import {Cupon,cuponUpdated,CuponUp} from "../../interfaces/Interfaces";

@Component({
  selector: 'app-cupondialogi',
  templateUrl: './cupondialogi.component.html',
  styleUrls: ['./cupondialogi.component.css'],
  providers:[CuponesService]
})
export class CupondialogiComponent implements OnInit {
  cupon:CuponUp;
  constructor(private dialog:MatDialogRef<CupondialogiComponent>,
              private cuponService:CuponesService) { }

  ngOnInit() {
    this.cupon={
      id:0,
      cantidad:0,
      descripcion:'',
    }
  }

  send(){
    let dialogo=this.dialog;
    this.cuponService.insertCupon(this.cupon).subscribe((data:cuponUpdated)=>{
      console.log(data);
      if(data.valid==1)
        dialogo.close(1);
      else{
        alert('Algo salio mal intentelo de nuevo mas tarde');
        dialogo.close();
      }
    },error1 => {
      console.log(error1);
      alert('Algo salio mal intentelo de nuevo mas tarde');
      dialogo.close();
    });
  }

}
