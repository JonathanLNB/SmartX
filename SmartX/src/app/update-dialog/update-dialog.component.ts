import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  name="nombre";
  id="15";
  clave="1213343";
  price=15;
  producto=true;
  constructor() { }

  ngOnInit() {
  }

}
