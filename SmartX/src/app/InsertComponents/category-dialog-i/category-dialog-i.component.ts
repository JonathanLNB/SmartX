import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

export interface Categoria{
  idcategoria:number,
  categoria:string
}
@Component({
  selector: 'app-category-dialog-i',
  templateUrl: './category-dialog-i.component.html',
  styleUrls: ['./category-dialog-i.component.css']
})

export class CategoryDialogIComponent implements OnInit {
  protected category:Categoria;
  constructor(public dialog:MatDialogRef<CategoryDialogIComponent>) { }

  ngOnInit() {
    this.category={
      idcategoria:0,
      categoria:""
    }
  }
  send(){

  }
}
