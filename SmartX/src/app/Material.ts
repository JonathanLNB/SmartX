import {NgModule} from "@angular/core";
import  {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule],
  exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatToolbarModule],
})
export class Material { }
