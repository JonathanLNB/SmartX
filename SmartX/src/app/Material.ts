import {NgModule} from "@angular/core";
import  {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from "@angular/material";
import {MatPaginatorModule} from "@angular/material";
import {MatSidenavModule} from "@angular/material";
import {MatDividerModule} from "@angular/material";
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from "@angular/material";
import {MatFormFieldModule} from "@angular/material";
import {MatInputModule} from "@angular/material";
import {MatSliderModule} from "@angular/material";
import {MatSelectModule} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule,MatTableModule,MatPaginatorModule,
    MatSidenavModule,MatDividerModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatSliderModule,MatSelectModule
  ],
  exports: [
    MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule,MatTableModule,MatPaginatorModule,
    MatSidenavModule,MatDividerModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatSliderModule,MatSelectModule
  ],
})
export class Material { }
