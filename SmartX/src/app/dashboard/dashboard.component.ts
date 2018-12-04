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
    this.reporteVentas();
    this.reporteProductos();
    this.reporteGanancias();
    setTimeout(()=>{
      this.charSemana=this.graficas.graficaLinea('VentaS',this.datosSemana,this.labelsSemana);
      this.charMes=this.graficas.graficaLinea('VentaM',this.datosMes,this.lablesMes);
      this.charAnio=this.graficas.graficaLinea('VentaA',this.datosanio,this.labelsAnio);
    },8000)
  }
  delProduct() {
    //Metodo para  borrar un producto
    this.router.navigate(['bajas/1'])
  }
  delCategory() {
    //Metodo para borrar una categoria
    this.router.navigate(['bajas/2'])
  }
  delProvider() {
    //Metodo para borrar un provedor
    this.router.navigate(['bajas/3'])
  }
  cupones(){
    this.router.navigate(['cupones'])
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
          this.datosSemana[0]=vSemana;
          this.labelsSemana=labelssemana;
      }, error1 => {
        console.log("error en carga ventas semana\n"+error1);
      });
    this.graficas.getReporteVenta('mensual').subscribe((data:ReportesMensuales)=>{
      ventas=data.mes;
      ventas.forEach((vdata:DatosReportes)=>{
        vMensual.push(vdata.datos);
        lablesmes.push(vdata.dia);
      });
      this.datosMes[0]=vMensual; this.lablesMes=lablesmes;
    }, error1 => {
      console.log("error ventas mensuales\n"+error1);
    });
    this.graficas.getReporteVentaAnual().subscribe((data:ReportesAnuales)=>{
      ventasAnuales=data.meses;
      ventasAnuales.forEach((vdata:DatosReportesAnual)=>{
        vAnual.push(vdata.datos);
        labelsanio.push(vdata.mes);
      });
      this.datosanio[0]=vAnual; this.labelsAnio=labelsanio;
    }, error1 => {
      console.log("error ventas año\n"+error1);
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
      this.datosSemana[1]=pSemana;
    },error1 => {
      console.log("error productos semana\n"+error1);
    });//fin de la peticion

    this.graficas.getReporteProductos('mensual').subscribe((data:ReportesMensuales)=>{
      productos=data.mes;
      productos.forEach((pdata:DatosReportes)=>{
        pMensual.push(pdata.datos);
      },error1 => {
        console.log(error1);
      });//fin del for
      this.datosMes[1]=pMensual;
    },error1 => {
      console.log("error en productos mes\n"+error1);
    });//fin de la peticion

    this.graficas.getReportePAnual().subscribe((data:ReportesAnuales)=>{
      productosAnuales=data.meses;
      productosAnuales.forEach((pdata:DatosReportesAnual)=>{
        pAnual.push(pdata.datos);
      });//fin del for
      this.datosanio[1]=pAnual;
    },error1 => {
      console.log("error productos año\n"+error1);
    });
  }
  reporteGanancias(){
    let gSemana=[],gMensual=[],gAnual=[];
    let gananciasS:DatosReportes[];
    let gananciasM:DatosReportes[];
    let gananciasA:DatosReportesAnual[];
    this.graficas.getReporteGanancias('semanal').subscribe((data:ReporteSemanales)=>{
      console.log('semanal');
      console.log(data);
      gananciasS=data.semana;
      data.semana.forEach((gdata:DatosReportes)=>{
        gSemana.push(gdata.datos);
      });//fin del for
      this.datosSemana[2]=gSemana;
    },error1 => {
      console.log("error en ganancias semanal\n"+error1);
    });//fin de la peticion

    this.graficas.getReporteGanancias('mensual').subscribe((data:ReportesMensuales)=>{
      console.log(data);
      gananciasM=data.mes;
      data.mes.forEach((gdata:DatosReportes)=>{
        gMensual.push(gdata.datos);
      });
      this.datosMes[2]=gMensual;
    },error1 => {
      console.log("error en ganancias mensual"+error1);
    });//fin de la peticion

    this.graficas.getReporteGAnual().subscribe((data:ReportesAnuales)=>{
      console.log('anual');
      console.log(data);
      gananciasA=data.meses;
      data.meses.forEach((gdata:DatosReportesAnual)=>{
        gAnual.push(gdata.datos);
      });//fin del for
      this.datosanio[2]=gAnual;
    },error1 => {
      console.log("error en ganancas anual\n"+error1);
    });//fin de la peticion
  }
}
