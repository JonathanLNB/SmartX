import {ModuleWithProviders} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
//componentes
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StoreComponent} from "./store/store.component";
import {BajasComponent} from "./bajas/bajas.component";

const appRoutes:Routes=[
  {path:"",component:StoreComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"bajas/:tipo",component:BajasComponent},
  {path:'**',component:DashboardComponent}
];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);