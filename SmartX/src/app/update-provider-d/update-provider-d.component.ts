import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
@Component({
  selector: 'app-update-provider-d',
  templateUrl: './update-provider-d.component.html',
  styleUrls: ['./update-provider-d.component.css']
})
export class UpdateProviderDComponent implements OnInit {
  proveedor:any;
  constructor(public dialog:MatDialogRef<UpdateProviderDComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.proveedor=this.data;
  }
  actualizar(){

  }
  borrar(){

  }
}
