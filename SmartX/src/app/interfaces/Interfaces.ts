export interface Pupdated{
  prod:any,
  valid:number
}
export interface Productos {
  idproducto:number,
  producto:string,
  imagen:string,
  descripcion:string,
  precioventa:number,
  preciocompra:number,
  marca:string,
  categoria:string,
  proveedor:string,
  codigo:string,
}
export interface Product{
  productos:any,
  valid:number
}
export interface Catergoria {
  idcategoria:number,
  categoria:string,
}
export interface Proveedor {
  idproveedor:number,
  proveedor:string,
  rfc:string
}
export interface DataDialog {
  type:number,
  data:any
}
export interface Product {
  productos:any,
  valid:number
}
export interface Category {
  categorias: any,
  valid: number
}
export  interface SProduct{
  id:number,
  producto:string,
  codigo:string,
  descripcion:string,
  imagen:string,
  marca:number,
  preciov:number,
  precioc:number
}
export interface DatosReportes {
  dia:string,
  datos:number
}
export interface DatosReportesAnual {
  mes:string,
  datos:number
}
//interfaces Reportes semanales
export interface ReporteSemanales {
  semana:any,
  valid:number
}
export interface ReportesMensuales {
  mes:any,
  valid:number
}
export interface ReportesAnuales {
  meses:any,
  valid:number
}
