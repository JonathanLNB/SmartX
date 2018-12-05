import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Catergoria,insertCategoria} from "../interfaces/Interfaces";
import {CategoryServiceService} from "../servicios/category-service.service";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
  providers:[CategoryServiceService]
})
export class UpdateCategoryComponent implements OnInit {
  category:Catergoria;
  constructor(public dialog:MatDialogRef<UpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private categoService:CategoryServiceService) { }

  ngOnInit() {
    this.category=this.data;
  }

  actualizar(){
    let insertCategoria:insertCategoria={
      id:this.category.idcategoria,
      categoria:this.category.categoria
    };
    let dialogo=this.dialog;
    this.categoService.insertCategory(insertCategoria).subscribe(data=>{
      dialogo.close(1);
    },error1 => {
      console.log(error1);
      alert("Algo salio mal intentelo mas tarde");
      dialogo.close();
    });
  }

}
