var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

const {crearVenta, agregarALaVenta, mostrarMisVentas, mostrarDetalleMisVentas} = require('./routes/Ventas');
const {crearInventario, agregarAlInventario} = require('./routes/Inventario');
const {agregarMarca, mostrarMarcas, marcaCategoria} = require('./routes/Marca');
const {agregarProveedor, mostrarProveedores, eliminarProveedor} = require('./routes/Proveedor');
const {agregarProducto, buscarProducto, eliminarProducto} = require('./routes/Productos');
const {agregarCategoria, mostrarCategorias, eliminarCategoria} = require('./routes/Categorias');
const {authentication,notFound, errorHandler} = require('./routes/Middleware');
const {insertarUsuario, agregarDireccion, datosUsuario, mostrarMisDirecciones} = require('./routes/Usuario');
const {agregarCupon, mostrarCupones, buscarCupones, eliminarCupon} = require('./routes/Cupones');
const {
    reporteVentasAnual, reporteVentasMensual, reporteVentasSemanal,
    reporteProductosVAnual, reporteProductosVMensual, reporteProductosVSemanal,
    reporteCantVAnual, reporteCantVMensual, reporteCantVSemanal, reporteCantCAnual,
    reporteCantCMensual, reporteCantCSemanal, totalClientes, totalOrdenes,
    totalProductos, totalProductosV
} = require('./routes/Reportes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app.use(authentication);

/*
   __  __                      _
  / / / /______  ______ ______(_)___  _____
 / / / / ___/ / / / __ `/ ___/ / __ \/ ___/
/ /_/ (__  ) /_/ / /_/ / /  / / /_/ (__  )
\____/____/\__,_/\__,_/_/  /_/\____/____/

*/
app.post("/api/usuario", function (req, res, next) {
    insertarUsuario(req, res, next);
});
app.post("/api/usuario/direccion", function (req, res, next) {
    agregarDireccion(req, res, next);
});
app.post("/api/usuario/info", function (req, res, next) {
    datosUsuario(req, res, next);
});
app.get("/api/usuario/direcciones/:idusuario", function (req, res, next) {
    mostrarMisDirecciones(req, res, next);
});

/*
    __  ___
   /  |/  /___ _______________ ______
  / /|_/ / __ `/ ___/ ___/ __ `/ ___/
 / /  / / /_/ / /  / /__/ /_/ (__  )
/_/  /_/\__,_/_/   \___/\__,_/____/

*/
app.post("/api/marca", function (req, res, next) {
    agregarMarca(req, res, next);
});
app.post("/api/marca_categoria", function (req, res, next) {
    marcaCategoria(req, res, next);
});
app.get("/api/marcas", function (req, res, next) {
    mostrarMarcas(req, res, next);
});
/*
    ____                                __
   / __ \_________ _   _____  ___  ____/ /___  _____
  / /_/ / ___/ __ \ | / / _ \/ _ \/ __  / __ \/ ___/
 / ____/ /  / /_/ / |/ /  __/  __/ /_/ / /_/ / /
/_/   /_/   \____/|___/\___/\___/\__,_/\____/_/

*/
app.post("/api/proveedor", function (req, res, next) {
    agregarProveedor(req, res, next);
});
app.get("/api/proveedores", function (req, res, next) {
   mostrarProveedores(req, res, next);
});
app.delete("/api/proveedor/delete/:idproveedor", function (req, res, next) {
    eliminarProveedor(req, res, next);
});
/*
   ______
  / ____/_  ______  ____  ____  ___  _____
 / /   / / / / __ \/ __ \/ __ \/ _ \/ ___/
/ /___/ /_/ / /_/ / /_/ / / / /  __(__  )
\____/\__,_/ .___/\____/_/ /_/\___/____/
          /_/
*/

app.post("/api/cupon", function (req, res, next) {
    agregarCupon(req, res, next);
});
app.get("/api/cupones", function (req, res, next) {
    mostrarCupones(req, res, next);
});
app.get("/api/cupones/:id", function (req, res, next) {
    buscarCupones(req, res, next);
});
app.delete("/api/cupon/delete/:idcupon", function (req, res, next) {
    eliminarCupon(req, res, next);
});

/*
    ____                 __           __
   / __ \_________  ____/ /_  _______/ /_____  _____
  / /_/ / ___/ __ \/ __  / / / / ___/ __/ __ \/ ___/
 / ____/ /  / /_/ / /_/ / /_/ / /__/ /_/ /_/ (__  )
/_/   /_/   \____/\__,_/\__,_/\___/\__/\____/____/

*/
app.post("/api/producto", function (req, res, next) {
   agregarProducto(req, res, next);
});
app.get("/api/producto/:busqueda", function (req, res, next) {
    buscarProducto(req, res, next);
});
app.delete("/api/producto/delete/:idproducto", function (req, res, next) {
   eliminarProducto(req, res, next);
});
/*
   ______      __                        __
  / ____/___ _/ /____  ____ _____  _____/_/___ _
 / /   / __ `/ __/ _ \/ __ `/ __ \/ ___/ / __ `/
/ /___/ /_/ / /_/  __/ /_/ / /_/ / /  / / /_/ /
\____/\__,_/\__/\___/\__, /\____/_/  /_/\__,_/
                    /____/
*/
app.post("/api/categoria", function (req, res, next) {
    agregarCategoria(req, res, next);
});
app.get("/api/categorias", function (req, res, next) {
    mostrarCategorias(req, res, next);
});
app.delete("/api/categoria/delete/:idcategoria", function (req, res, next) {
    eliminarCategoria(req, res, next);
});
/*
 _    __           __
| |  / /__  ____  / /_____ _
| | / / _ \/ __ \/ __/ __ `/
| |/ /  __/ / / / /_/ /_/ /
|___/\___/_/ /_/\__/\__,_/

*/
app.post("/api/venta", function (req, res, next) {
    crearVenta(req, res, next);
});
app.post("/api/venta/agregar", function (req, res, next) {
   agregarALaVenta(req, res, next);
});
app.get("/api/ventas/:id", function (req, res, next) {
   mostrarMisVentas(req, res, next);
});
app.get("/api/ventas/detalle/:idventa", function (req, res, next) {
    mostrarDetalleMisVentas(req, res, next);
});
/*
    ____                      __             _
   /  _/___ _   _____  ____  / /_____ ______(_)___
   / // __ \ | / / _ \/ __ \/ __/ __ `/ ___/ / __ \
 _/ // / / / |/ /  __/ / / / /_/ /_/ / /  / / /_/ /
/___/_/ /_/|___/\___/_/ /_/\__/\__,_/_/  /_/\____/

*/
app.post("/api/inventario", function (req, res, next) {
    crearInventario(req, res, next);
});
app.post("/api/inventario/agregar", function (req, res, next) {
    agregarAlInventario(req, res, next);
});
/*
    ____                        __
   / __ \___  ____  ____  _____/ /____  _____
  / /_/ / _ \/ __ \/ __ \/ ___/ __/ _ \/ ___/
 / _, _/  __/ /_/ / /_/ / /  / /_/  __(__  )
/_/ |_|\___/ .___/\____/_/   \__/\___/____/
          /_/
*/
app.get("/api/reportes/ganancias/totales/anual", function (req, res, next) {
    reporteVentasAnual(req, res, next);
});
app.get("/api/reportes/ganancias/totales/mensual", function (req, res, next) {
    reporteVentasMensual(req, res, next);
});
app.get("/api/reportes/ganancias/totales/semanal", function (req, res, next) {
    reporteVentasSemanal(req, res, next);
});
app.get("/api/reportes/productos/totales/anual", function (req, res, next) {
    reporteProductosVAnual(req, res, next);
});
app.get("/api/reportes/productos/totales/mensual", function (req, res, next) {
    reporteProductosVMensual(req, res, next);
});
app.get("/api/reportes/productos/totales/semanal", function (req, res, next) {
    reporteProductosVSemanal(req, res, next);
});
app.get("/api/reportes/ventas/totales/anual", function (req, res, next) {
    reporteCantVAnual(req, res, next);
});
app.get("/api/reportes/ventas/totales/mensual", function (req, res, next) {
    reporteCantVMensual(req, res, next);
});
app.get("/api/reportes/ventas/totales/semanal", function (req, res, next) {
    reporteCantVSemanal(req, res, next);
});
app.get("/api/reportes/clientes/totales/anual", function (req, res, next) {
    reporteCantCAnual(req, res, next);
});
app.get("/api/reportes/clientes/totales/mensual", function (req, res, next) {
    reporteCantCMensual(req, res, next);
});
app.get("/api/reportes/clientes/totales/semanal", function (req, res, next) {
    reporteCantCSemanal(req, res, next);
});
app.get("/api/reportes/total/clientes", function (req, res, next) {
    totalClientes(req, res, next);
});
app.get("/api/reportes/total/ventas", function (req, res, next) {
    totalOrdenes(req, res, next);
});
app.get("/api/reportes/total/productosvendidos", function (req, res, next) {
    totalProductosV(req, res, next);
});
app.get("/api/reportes/total/productos", function (req, res, next) {
    totalProductos(req, res, next);
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
