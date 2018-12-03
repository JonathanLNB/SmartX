import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category:any;
  constructor(public dialog:MatDialogRef<UpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.category=this.data;
  }

  actualizar(){

  }
  borrar(){

  }

}
