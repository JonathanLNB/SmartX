import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource,MatSort} from "@angular/material";
import {MatDialog,MatDialogConfig} from "@angular/material";
import {CupondialogiComponent} from "../../InsertComponents/cupondialogi/cupondialogi.component";
import {CupondialogUComponent} from "../../updateComponents/cupondialog-u/cupondialog-u.component";
import {CuponesService} from "../../servicios/cupones.service";
import {Router,ActivatedRoute,Params} from "@angular/router";
import {Cupon, DataDialog, RequestCupon,CuponUp} from "../../interfaces/Interfaces";
@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css'],
  providers:[CuponesService]
})
export class CuponesComponent implements OnInit {
  displayedColumns: string[] ;
  columnsToDisplay: string[] ;
  public dataDisplayed;
  public title:string;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private dialog:MatDialog,private cuponService:CuponesService,
              private _route:ActivatedRoute,private router:Router) {
    this.title='Cupones';
    this.obtenerCupones();
    this.displayedColumns=['idcupon','cupon','descuento','descripcion'];
    this.columnsToDisplay=this.displayedColumns.slice();
  }

  ngOnInit() {


  }
  obtenerCupones(){
    let cupones:Cupon[];
    this.cuponService.getCupones().subscribe((data:RequestCupon)=>{
      cupones=data.cupones;
      this.dataDisplayed=new MatTableDataSource<Cupon>(cupones);
      this.dataDisplayed.paginator=this.paginator;
    },error1 => {
      console.log(error1);
      alert('Algo salio mal intentalo mas tarde');
    });
  }

  actualiza(row){
    let cupon1:Cupon=row;
    let cuponData:CuponUp;
    cuponData={
      id:0,
      cantidad:0,
      descripcion:''
    };
    cuponData.id=cupon1.idcupon;
    cuponData.cantidad=cupon1.descuento;
    cuponData.descripcion=cupon1.descripcion;
    let dialogRef=this.dialog.open(CupondialogUComponent,{
      width:'800px',
      data:cuponData
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==1)
        this.obtenerCupones();
    },error1 => {
      console.log(error1);
    });
  }

  nuevoRegistro(){
    let dialogRef=this.dialog.open(CupondialogiComponent,{
      width:'800px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result==1)
        this.obtenerCupones();
    },error1 => {
      console.log(error1);
    });
  }

  back(){
    this.router.navigate(['dashboard']);
  }
}
