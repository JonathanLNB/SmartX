import {Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Router} from "@angular/router";
import {Chart} from 'chart.js';
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit{
  char=[];
  constructor(private router:Router){

  }

  ngOnInit(){
    this.char=new Chart('VentaA',{
      type: 'line',
      data: {
        labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        datasets: [
          {
            label: 'Ventas',
            data: [10,20,30,40,50,60,70,80,90,100,110,120],
            borderColor: '#FF4F33',
            fill:false,
            borderWidth: 1
          },
          {
            label: 'Productos',
            data: [10,20,30,40,50,60,70,80,80,100,90,100],
            borderColor: '#33FF64',
            fill:false,
            borderWidth: 1
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

}
