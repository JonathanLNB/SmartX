import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {CategoryServiceService} from "../../servicios/category-service.service";

export interface Categoria{
  idcategoria:number,
  categoria:string
}
@Component({
  selector: 'app-category-dialog-i',
  templateUrl: './category-dialog-i.component.html',
  styleUrls: ['./category-dialog-i.component.css'],
  providers:[CategoryServiceService]
})

export class CategoryDialogIComponent implements OnInit {
  protected category:Categoria;
  constructor(public dialog:MatDialogRef<CategoryDialogIComponent>,
              private categoryService:CategoryServiceService) { }

  ngOnInit() {
    this.category={
      idcategoria:0,
      categoria:""
    }
  }
  send(){
    let dialog=this.dialog;
    this.categoryService.insertCategory(this.category).subscribe(data=>{
      dialog.close(1);
    },error1 => {
      console.log(error1);
      alert('Algo salio mal intentelo mas tarde');
      dialog.close();
    });
  }
}
