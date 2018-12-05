import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import{CuponesService} from "../../servicios/cupones.service";
import {CuponUp,cuponUpdated} from "../../interfaces/Interfaces";

@Component({
  selector: 'app-cupondialog-u',
  templateUrl: './cupondialog-u.component.html',
  styleUrls: ['./cupondialog-u.component.css'],
  providers:[CuponesService]
})
export class CupondialogUComponent implements OnInit {
  cupon:CuponUp;
  constructor(private dialog:MatDialogRef<CupondialogUComponent>,
              @Inject(MAT_DIALOG_DATA)private data,
              private cuponService:CuponesService) { }

  ngOnInit() {
    this.cupon=this.data;
  }

  actualizar(){
    let dialogo=this.dialog;
    console.log(this.cupon);
    this.cuponService.insertCupon(this.cupon).subscribe((data:cuponUpdated)=>{
      console.log(data);
      if(data.valid==1)
        dialogo.close(1);
      else{
        alert("Algo salio mal intentalo mas tarde");
        dialogo.close();
      }
    },error1 => {
      console.log(error1);
      alert('Algo salio mal intentalo mas tarde');
      dialogo.close();
    });
  }

  borrar() {
    let id = this.cupon.id;
    this.cuponService.deleteCupon(id).subscribe(() => {
      this.dialog.close(1);
    },error1 => {
      this.dialog.close();
    });

  }

}
