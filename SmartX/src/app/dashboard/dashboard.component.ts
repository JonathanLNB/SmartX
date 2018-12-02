import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Chart} from 'chart.js';
import {GraficasService} from "../servicios/graficas.service";
import {
  DatosReportes,
  ReporteSemanales,
  ReportesAnuales,
  ReportesMensuales,
  DatosReportesAnual
} from "../interfaces/Interfaces";
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[GraficasService]
})
export class DashboardComponent implements OnInit{
  char=[];
  datosSemana=[];datosMes=[];datosanio=[];
  labelsSemana=[];lablesMes=[];labelsAnio=[];
  charSemana=[];charMes=[];charAnio=[];
  constructor(private router:Router, private graficas:GraficasService){}
  ngOnInit(){
    let datos=[];
    let labels=[];
    datos[0]=[10,20,30,40,50,60,70];
    datos[1]=[10,20,30,40,50,60,100];
    labels=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.char=this.graficas.graficaLinea('VentaA',datos,labels);
    this.reporteVentas();
    this.reporteGanancias();
    this.reporteProductos();
    setTimeout(()=>{
      console.log("datos semana \n"+this.datosSemana+"\n"+"datos mes \n"+this.datosMes+"\n datos año \n"+this.datosanio);
    },5000)
  }
  delProduct() {
    //Metodo para  borrar un producto
    console.log("adios  producto");
    this.router.navigate(['bajas/1'])
  }
  delCategory() {
    //Metodo para borrar una categoria
    console.log("adios categoria");
    this.router.navigate(['bajas/2'])
  }
  delProvider() {
    //Metodo para borrar un provedor
    console.log("adios provedor");
    this.router.navigate(['bajas/3'])
  }
  reporteVentas(){
    let vSemana=[],vMensual=[],vAnual=[];
    let labelssemana=[],lablesmes=[],labelsanio=[];
    let ventas:DatosReportes[];
    let ventasAnuales:DatosReportesAnual[];
    this.graficas.getReporteVenta('semanal').subscribe((data:ReporteSemanales)=>{
          ventas=data.semana;
          ventas.forEach((vdata:DatosReportes)=>{
              vSemana.push(vdata.datos);
              labelssemana.push(vdata.dia);
          });
          console.log("datos semana \n"+vSemana+"\n"+labelssemana);
          this.datosSemana.push(vSemana); this.labelsSemana.push(labelssemana);
      }, error1 => {
        console.log(error1);
      });
    this.graficas.getReporteVenta('mensual').subscribe((data:ReportesMensuales)=>{
      ventas=data.mes;
      ventas.forEach((vdata:DatosReportes)=>{
        vMensual.push(vdata.datos);
        lablesmes.push(vdata.dia);
      });
      console.log("datos mes \n"+vMensual+"\n"+lablesmes);
      this.datosMes.push(vMensual); this.lablesMes.push(lablesmes);
    }, error1 => {
      console.log(error1);
    });
    this.graficas.getReporteVenta('anual').subscribe((data:ReportesAnuales)=>{
      ventasAnuales=data.meses;
      ventasAnuales.forEach((vdata:DatosReportesAnual)=>{
        vAnual.push(vdata.datos);
        labelsanio.push(vdata.mes);
      });
      console.log("datos año \n"+vAnual+"\n"+labelsanio);
      this.datosanio.push(vAnual); this.labelsAnio.push(labelsanio);
    }, error1 => {
      console.log(error1);
    });
  }
  reporteProductos(){
    let pSemana=[],pMensual=[],pAnual=[];
    let productos:DatosReportes[];
    let productosAnuales:DatosReportesAnual[];
    this.graficas.getReporteProductos('semanal').subscribe((data:ReporteSemanales)=>{
      productos=data.semana;
      productos.forEach((vdata:DatosReportes)=>{
        pSemana.push(vdata.datos);
      });//fin del foreach
      this.datosSemana.push(pSemana);
    },error1 => {
      console.log(error1);
    });//fin de la peticion

    this.graficas.getReporteProductos('mensual').subscribe((data:ReportesMensuales)=>{
      productos=data.mes;
      productos.forEach((pdata:DatosReportes)=>{
        pMensual.push(pdata.datos);
      },error1 => {
        console.log(error1);
      });//fin del for
      this.datosMes.push(pMensual);
    },error1 => {
      console.log(error1);
    });//fin de la peticion

    this.graficas.getReporteProductos('anual').subscribe((data:ReportesAnuales)=>{
      productosAnuales=data.meses;
      productosAnuales.forEach((pdata:DatosReportesAnual)=>{
        pAnual.push(pdata.datos);
      });//fin del for
      this.datosanio.push(pAnual);
    },error1 => {
      console.log(error1);
    });
  }
  reporteGanancias(){
    let gSemana=[],gMensual=[],gAnual=[];
    let ganancias:DatosReportes[];
    let gananciasA:DatosReportesAnual[];
    this.graficas.getReporteGanancias('semanal').subscribe((data:ReporteSemanales)=>{
      ganancias=data.semana;
      ganancias.forEach((gdata:DatosReportes)=>{
        gSemana.push(gdata.datos);
      });//fin del for
      this.datosSemana.push(gSemana);
    },error1 => {
      console.log(error1);
    });//fin de la peticion

    this.graficas.getReporteGanancias('mensual').subscribe((data:ReportesMensuales)=>{
      ganancias=data.mes;
      ganancias.forEach((gdata:DatosReportes)=>{
        gMensual.push(gdata.datos);
      });
      this.datosMes.push(gMensual);
    },error1 => {
      console.log(error1);
    });//fin de la peticion

    this.graficas.getReporteGanancias('anual').subscribe((data:ReportesAnuales)=>{
      gananciasA=data.meses;
      gananciasA.forEach((gdata:DatosReportesAnual)=>{
        gAnual.push(gdata.datos);
      });//fin del for
      this.datosanio.push(gAnual);
    },error1 => {
      console.log(error1);
    });//fin de la peticion
  }
}
