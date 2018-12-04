import { Injectable } from '@angular/core';
import {Chart} from 'chart.js';
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {ReporteSemanales,ReportesAnuales} from "../interfaces/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class GraficasService {
  private url;
  constructor(private http:HttpClient) {
    this.url='http://3.17.28.49:3000/api';
  }
  graficaLinea(idCanvas:string,datos:any,labels:any){
    let char=[];
    console.log("estos son los datos");
    console.log(datos);
    console.log("estos son las etiquetas");
    console.log(labels);
      char=new Chart(idCanvas,{
        type: 'line',
        data: {
          labels:labels ,
          datasets: [
            {
              label: 'Ventas',
              data: datos[0],
              borderColor: '#FF4F33',
              fill:false,
              borderWidth: 1
            },
            {
              label: 'Productos',
              data: datos[1],
              borderColor: '#33FF64',
              fill:false,
              borderWidth: 1
            },
            {
              label:'Ganancias',
              data:datos[2],
              borderColor:'#33E0FF',
              fill:false,
              borderWidth:1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });
    return char;
  }
  //Reportes semanales
  getReporteVenta(periodo:String){
    let ventas;
    return this.http.get(this.url+'/reportes/ventas/totales/'+periodo);
  }
  getReporteProductos(periodo:String){
      return this.http.get(this.url+'/reportes/productos/totales/'+periodo)
  }
  getReporteGanancias(periodo:String){
    return this.http.get(this.url+'/reportes/ganancias/totales/'+periodo)
  }
  getReporteVentaAnual(){
    return this.http.get<ReportesAnuales>('http://3.17.28.49:3000/api/reportes/ventas/totales/anual');
  }
  getReporteGAnual(){
    return this.http.get<ReportesAnuales>('http://3.17.28.49:3000/api/reportes/ganancias/totales/anual');
  }

  getReportePAnual(){
    return this.http.get<ReportesAnuales>('http://3.17.28.49:3000/api/reportes/productos/totales/anual');
  }


}
