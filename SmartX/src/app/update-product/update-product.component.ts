import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import {ProductServiceService} from "../servicios/product-service.service";
import {Pupdated,Productos,SProduct} from "../interfaces/Interfaces";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  providers:[ProductServiceService]
})
export class UpdateProductComponent implements OnInit {
  product:Productos;
  constructor(public dialog:MatDialogRef<UpdateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private prod:ProductServiceService) { }

  ngOnInit() {
    this.product=this.data.data;
    console.log(this.product);
  }

  actualizar(){
    let sendP:SProduct={
      id:0,
      preciov:0,
      precioc:0,
      marca:0,
      imagen:'',
      codigo:'',
     descripcion:'',
      producto:'',
    };
    console.log("entre al metodo");
    sendP.id=this.product.idproducto;
    sendP.descripcion=this.product.descripcion;
    sendP.codigo=this.product.codigo;
    sendP.imagen=this.product.imagen;
    sendP.marca=this.product.idmarca;
    sendP.precioc=this.product.preciocompra;
    sendP.preciov=this.product.precioventa;
    sendP.producto=this.product.producto;
    let dialogo=this.dialog;
    this.prod.insertProduct(sendP).subscribe((result:Pupdated)=>{
      if(result.valid==1){
        dialogo.close(1)
      }
    },
      error1 => {
          console.log("este es el error");
          console.log(error1);
      })

  }
  borrar(){
    let id=this.product.idproducto;
    this.prod.deleteProduct(id).subscribe(value => {},error1 => {
      console.log(error1);
    });
    this.dialog.close(1);
  }

}
