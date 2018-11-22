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
import {FormsModule} from "@angular/forms";


//rutas
import {routing,appRoutingProviders} from "./app.routing";
import { BajasComponent } from './bajas/bajas.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProviderDComponent } from './update-provider-d/update-provider-d.component';
import { ProductDialogIComponent } from './InsertComponents/product-dialog-i/product-dialog-i.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraficasComponent,
    BajasComponent,
    UpdateDialogComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    UpdateProviderDComponent,
    ProductDialogIComponent
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
    routing,
    FormsModule
  ],
  entryComponents:[
    UpdateDialogComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    UpdateProviderDComponent,
    ProductDialogIComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
