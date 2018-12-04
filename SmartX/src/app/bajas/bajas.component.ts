import { Component, OnInit,ViewChild} from '@angular/core';
import {Router,ActivatedRoute,Params} from "@angular/router";
import {MatPaginator, MatTableDataSource,MatSort} from "@angular/material";
import {MatDialog,MatDialogConfig} from "@angular/material";
import {UpdateProductComponent} from "../update-product/update-product.component";
import {ProductDialogIComponent} from "../InsertComponents/product-dialog-i/product-dialog-i.component";
import {ProviderDialogIComponent} from "../InsertComponents/provider-dialog-i/provider-dialog-i.component";
import {CategoryDialogIComponent} from "../InsertComponents/category-dialog-i/category-dialog-i.component";
import {UpdateCategoryComponent} from "../update-category/update-category.component";
import {UpdateProviderDComponent} from "../update-provider-d/update-provider-d.component";
import {ProductServiceService} from "../servicios/product-service.service";
import { CategoryServiceService} from "../servicios/category-service.service";
import {ProviderServiceService,Providers} from "../servicios/provider-service.service";
import {Productos,Catergoria,Proveedor,DataDialog,Product,Category} from "../interfaces/Interfaces";
@Component({
  selector: 'bajas',
  templateUrl: './bajas.component.html',
  styleUrls: ['./bajas.component.css'],
  providers:[ProductServiceService,
    CategoryServiceService,
    ProviderServiceService
  ]
})
export class BajasComponent implements OnInit {
  //variables para mostrar las columnas
  displayedColumns: string[] ;
  columnsToDisplay: string[] ;
  //variables de control
  public tipo:number;
  public title:string;
  //variable que se convertira en DataTableSource
  public dataDisplayed;
  //Sirve para hacer el paginado
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private _route:ActivatedRoute,private router:Router,
              private dialog:MatDialog,private Prodserver:ProductServiceService,
              private catServer:CategoryServiceService,private provServer:ProviderServiceService) {
    //recibimos el parametro que viene por la url
    this._route.params.subscribe((params:Params)=>{
      this.tipo=params.tipo;
      if(this.tipo==1){
        this.title="Productos";
        this.obtenerProductos();
        this.displayedColumns= ['idproducto', 'producto', 'descripcion', 'precioventa','preciocompra','marca','categoria','proveedor','codigo'];
      }
      if(this.tipo==2){
        this.title="Categoria";
       this.obtenerCategorias();
        this.displayedColumns= ['idcategoria', 'categoria'];
      }
      if(this.tipo==3){
        this.title="Proveedores";
        this.obtenerProveedores();
        this.displayedColumns= ['idproveedor', 'proveedor','rfc'];
      }
      this.columnsToDisplay=this.displayedColumns.slice();
    });
  }

  ngOnInit() {
    //agrega la paginacion

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
       });
       dialogRef.afterClosed().subscribe(result=>{
         if(result==1)
           this.obtenerProductos();
       })
     }
     if(type==2){
       dialogRef=dialog.open(CategoryDialogIComponent,{
         width:'600px'
       });
       dialogRef.afterClosed().subscribe(result=>{
         if(result==1)
           this.obtenerCategorias();
       });
     }
     if(type==3){
       dialogRef=dialog.open(ProviderDialogIComponent,{
         width:'800px'
       });
       dialogRef.afterClosed().subscribe(result=>{
         if(result==1)
           this.obtenerProveedores();
       })
     }
  }

  actualiza(row){
    let dataDialog:DataDialog={
      type:this.tipo,
      data:row,
    };
    if(dataDialog.type==1){
      let dialogRef=this.dialog.open(UpdateProductComponent,{
        width:'800px',
        data:dataDialog
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result==1)
          this.obtenerProductos();
      })
    }
    if(dataDialog.type==2){
      let dialogRef=this.dialog.open(UpdateCategoryComponent,{
        width:'800px',
        data:dataDialog.data
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result==1)
          this.obtenerCategorias();
      })
    }
    if(dataDialog.type==3){
      let dialogRef=this.dialog.open(UpdateProviderDComponent,{
        width:'800px',
        data:dataDialog.data
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result==1)
          this.obtenerProveedores();
      })
    }
  }

  obtenerProductos(){
    let Prodctos:Productos[];
  this.Prodserver.getProductos().subscribe((data:Product)=>{
        Prodctos=data.productos;
      this.dataDisplayed=new MatTableDataSource<Productos>(Prodctos);
      this.dataDisplayed.paginator=this.paginator;
        //console.log(productos);
      },
      error=>{
        console.log(error)
      });
  }
  obtenerCategorias(){
    let Categorias:Catergoria[];
    this.catServer.getCategorias().subscribe((data:Category)=>{
      Categorias=data.categorias;
      this.dataDisplayed=new MatTableDataSource<Catergoria>(Categorias);
      this.dataDisplayed.paginator=this.paginator;
    },
      error1 => {
            console.log(error1);
          alert("Algo salio mal intentelo mas tarde");
      }
    );
  }
  obtenerProveedores(){
    let proveedores:Proveedor[];
    this.provServer.getProviders().subscribe((data:Providers)=>{
      proveedores=data.proveedores;
      this.dataDisplayed=new MatTableDataSource<Proveedor>(proveedores);
      this.dataDisplayed.paginator=this.paginator;
    },
      error1 => {
            console.log(error1);
            alert("algo salio mal intentelo mas tarde");
      });
  }

}
