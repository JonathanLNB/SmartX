import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from '@angular/common/http';
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
//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//rutas
import {routing,appRoutingProviders} from "./app.routing";
import { BajasComponent } from './bajas/bajas.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateProviderDComponent } from './update-provider-d/update-provider-d.component';
import { ProductDialogIComponent } from './InsertComponents/product-dialog-i/product-dialog-i.component';
import { CategoryDialogIComponent } from './InsertComponents/category-dialog-i/category-dialog-i.component';
import { ProviderDialogIComponent } from './InsertComponents/provider-dialog-i/provider-dialog-i.component';
import { CuponesComponent } from './componentes/cupones/cupones.component';
import { CupondialogiComponent } from './InsertComponents/cupondialogi/cupondialogi.component';
import { CupondialogUComponent } from './updateComponents/cupondialog-u/cupondialog-u.component';
import { LoginComponent } from './Autenticacion/login/login.component';
import { RegisterComponent } from './Autenticacion/register/register.component';


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
    ProductDialogIComponent,
    CategoryDialogIComponent,
    ProviderDialogIComponent,
    CuponesComponent,
    CupondialogiComponent,
    CupondialogUComponent,
    LoginComponent,
    RegisterComponent
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
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  entryComponents:[
    UpdateDialogComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    UpdateProviderDComponent,
    ProductDialogIComponent,
    CategoryDialogIComponent,
    ProviderDialogIComponent,
    CupondialogiComponent,
    CupondialogUComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
