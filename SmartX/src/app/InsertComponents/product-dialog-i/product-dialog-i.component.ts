import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
export interface Productos {
  idproducto:number,
  producto:string,
  imagen:string,
  descripcion:string,
  precioventa:number,
  preciocompra:number,
  marca:string,
  categoria:string,
  proveedor:string,
  codigo:string,
}
@Component({
  selector: 'app-product-dialog-i',
  templateUrl: './product-dialog-i.component.html',
  styleUrls: ['./product-dialog-i.component.css']
})

export class ProductDialogIComponent implements OnInit {
  product:Productos;
  constructor(public dialog:MatDialogRef<ProductDialogIComponent>) {
  }

  ngOnInit() {
    this.product={
      idproducto:0,
      producto:'',
      imagen:'',
      descripcion:'',
      precioventa:0,
      preciocompra:0,
      marca:'',
      categoria:'',
      proveedor:'',
      codigo:'',
    }
  }
  send(){
    let dialog=this.dialog;
    console.log(this.product);
    dialog.close();
  }
}
