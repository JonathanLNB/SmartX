import {NgModule} from "@angular/core";
import  {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from "@angular/material";
import {MatPaginatorModule} from "@angular/material";
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule,MatTableModule,MatPaginatorModule,

  ],
  exports: [
    MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule,MatTableModule,MatPaginatorModule,
  ],
})
export class Material { }
