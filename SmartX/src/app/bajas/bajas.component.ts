import { Component, OnInit,ViewChild} from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router";
import {MatPaginator, MatTableDataSource,MatSort} from "@angular/material";
import {MatDialog,MatDialogConfig} from "@angular/material";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {UpdateProductComponent} from "../update-product/update-product.component";
import {ProductDialogIComponent} from "../InsertComponents/product-dialog-i/product-dialog-i.component";

//interfaces(Forma del json para cada cosa)
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
export interface Catergoria {
  idcategoria:number,
  categoria:string,
}
export interface Proveedor {
  idproveedor:number,
  proveedor:string,
  rfc:string
}
export interface DataDialog {
  type:number,
  data:any
}
//constantes de datos  esto se cambia cuando esten los WS
const Producto:Productos[]=[
  {idproducto:1,producto:'MI8',imagen:'',descripcion:'Telefono bonito y barato'
    ,precioventa:7064,preciocompra:4156,marca:"MI",categoria:"Gama Alta",proveedor:"Xiaomi",codigo:'MI8'},
  {idproducto:1,producto:'MI9',imagen:'',descripcion:'Telefono bonito y barato'
    ,precioventa:7064,preciocompra:4156,marca:"MI",categoria:"Gama Alta",proveedor:"Xiaomi",codigo:'MI8'},
  {idproducto:1,producto:'MI10',imagen:'',descripcion:'Telefono bonito y barato'
    ,precioventa:7064,preciocompra:4156,marca:"MI",categoria:"Gama Alta",proveedor:"Xiaomi",codigo:'MI8'},{idproducto:1,producto:'MI10',imagen:'',descripcion:'Telefono bonito y barato'
    ,precioventa:7064,preciocompra:4156,marca:"MI",categoria:"Gama Alta",proveedor:"Xiaomi",codigo:'MI8'},

];
const Categorias:Catergoria[]=[
  {idcategoria:1,categoria:'gama baja'},
  {idcategoria:2,categoria:'gama media'},
  {idcategoria:3,categoria:'gama alta'},
];
const Proveedores:Proveedor[]=[
  {idproveedor:1,proveedor:'samsung',rfc:'gmbj'},
  {idproveedor:2,proveedor:'samsung',rfc:'gmbj'},
  {idproveedor:3,proveedor:'samsung',rfc:'gmbj'},
  {idproveedor:4,proveedor:'samsung',rfc:'gmbj'},
];


@Component({
  selector: 'bajas',
  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.css']
})
export class BajasComponent implements OnInit {
  //variables para mostrar las columnas
  displayedColumns: string[] ;
  columnsToDisplay: string[] ;
  columnsButton:string[];
  //variables de control
  public tipo:number;
  public title:string;
  //variable que se convertira en DataTableSource
  public dataDisplayed;
  //Sirve para hacer el paginado
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private _route:ActivatedRoute,private router:Router,
              private dialog:MatDialog) {
    //recibimos el parametro que viene por la url
    this._route.params.subscribe((params:Params)=>{
      this.tipo=params.tipo;
      if(this.tipo==1){
        this.title="Productos";
        this.dataDisplayed=new MatTableDataSource<Productos>(Producto);
        this.displayedColumns= ['idproducto', 'producto', 'descripcion', 'precioventa','preciocompra','marca','categoria','proveedor','codigo'];
      }
      if(this.tipo==2){
        this.title="Categoria";
        this.dataDisplayed=new MatTableDataSource<Catergoria>(Categorias);
        this.displayedColumns= ['idcategoria', 'categoria'];
      }
      if(this.tipo==3){
        this.title="Proveedores";
        this.dataDisplayed=new MatTableDataSource<Proveedor>(Proveedores);
        this.displayedColumns= ['idproveedor', 'proveedor','rfc'];
      }
      this.columnsToDisplay=this.displayedColumns.slice();
    });
  }

  ngOnInit() {
    //agrega la paginacion
    this.dataDisplayed.paginator=this.paginator;
  }
  back(){
    //regresa de manera mas natural al dashboard
    this.router.navigate(['dashboard']);
  }
  nuevoRegistro(){
     let type=this.tipo;
     let dialog=this.dialog;
     let dialogRef;
     if(type==1){
       dialogRef=dialog.open(ProductDialogIComponent,{
         width:'800px'
       })
     }
  }

  onCreate(row){
    let dataDialog:DataDialog={
      type:this.tipo,
      data:row,
    };
    if(dataDialog.type==1){
      let dialogRef=this.dialog.open(UpdateProductComponent,{
        width:'800px',
        data:dataDialog
      })
    }
    else {
      let dialogRef=this.dialog.open(UpdateDialogComponent,{
        width:'100%',
        height:'100%',
      });
    }
  }

}
