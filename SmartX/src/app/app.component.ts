import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SmartX';

  addProduct() {
    /*metodo para añadir un producto  si falta mas logica o es necesario otra clase aaqui se llama*/
    console.log("hola producto");
  }
  addProvider(){
    /*Metodo para agregar un provedor*/
    console.log("hola provedir");
  }

  addCategory() {
    //Metodo para agregar una categoria
    console.log("hola categoria");
  }

  delProduct() {
    //Metodo para  borrar un producto
    console.log("adios  producto");
  }

  delCategory() {
    //Metodo para borrar una categoria
    console.log("adios categoria");
  }

  delProvider() {
    //Metodo para borrar un provedor
    console.log("adios provedor");
  }
}
