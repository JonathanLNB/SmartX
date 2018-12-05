import {ModuleWithProviders} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
//componentes
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BajasComponent} from "./bajas/bajas.component";
import {CuponesComponent} from "./componentes/cupones/cupones.component";
import {LoginComponent} from "./Autenticacion/login/login.component"
const appRoutes:Routes=[
  {path:"",component:DashboardComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"bajas/:tipo",component:BajasComponent},
  {path:"cupones",component:CuponesComponent},
  {path:'**',component:DashboardComponent},

];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
