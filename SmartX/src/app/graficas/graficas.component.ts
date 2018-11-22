import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent {

  public lineChartData:Array<any>= [
    [10,20,30,40,50,60,70,80,90,100,110,120],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
    [28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90,28, 48, 40, 19, 86, 27, 90],
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July','agosto','septiembre','octubre','noviembre','diciembre'];
  public lineChartType:string = 'line';
 // public pieChartType:string = 'pie';

  // Pie
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


}
