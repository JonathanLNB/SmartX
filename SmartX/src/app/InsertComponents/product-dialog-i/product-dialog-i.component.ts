import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {ProductServiceService} from "../../servicios/product-service.service";
import {SProduct,RequestMarca,Marca} from "../../interfaces/Interfaces";

@Component({
  selector: 'app-product-dialog-i',
  templateUrl: './product-dialog-i.component.html',
  styleUrls: ['./product-dialog-i.component.css'],
  providers:[ProductServiceService]
})

export class ProductDialogIComponent implements OnInit {
  product:SProduct;
  marcas:Marca[]=[];
  constructor(public dialog:MatDialogRef<ProductDialogIComponent>,
              public producto:ProductServiceService) {
    this.getMarcas();
  }

  ngOnInit() {
    this.product={
      id:0,
      producto:'',
      imagen:'',
      descripcion:'',
      preciov:0,
      precioc:0,
      marca:1,
      codigo:''
    }
  }
  send(){
    let dialog=this.dialog;
    this.producto.insertProduct(this.product).subscribe(data=>{
      console.log(data);
      dialog.close(1);
    },
      error1 => {
      console.log(error1);
      });

  }
  getMarcas(){
    this.producto.getMarcas().subscribe((data:RequestMarca)=>{
      this.marcas=data.marcas;

    })
  }
}
