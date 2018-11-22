import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//Angular material componentes
import {Material} from "./Material";
//Graficas
import {ChartsModule} from "ng2-charts";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { GraficasComponent } from './graficas/graficas.component';
import { GraficaSemanaComponent } from './grafica-semana/grafica-semana.component';
import { GraficaMesComponent } from './grafica-mes/grafica-mes.component';
import { GraficaAnioComponent } from './grafica-anio/grafica-anio.component';

//rutas
import {routing,appRoutingProviders} from "./app.routing";
import { StoreComponent } from './store/store.component';
import { BajasComponent } from './bajas/bajas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraficasComponent,
    GraficaSemanaComponent,
    GraficaMesComponent,
    GraficaAnioComponent,
    StoreComponent,
    BajasComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    ChartsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
