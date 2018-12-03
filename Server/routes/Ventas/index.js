var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function crearVenta(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(ven) as venta, 1 as valid from (SELECT * from insertar_venta("+req.body.idusuario+", "+req.body.idmetodo+", "+req.body.idcupon+")) as ven) as consulta";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.row_to_json;
            res.send(respuesta);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function agregarALaVenta(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(ven) as venta, 1 as valid from (SELECT * from insertar_venta_detalle("+req.body.idventa+", "+req.body.idproducto+", "+req.body.cant+")) as ven) as consulta";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.row_to_json;
            res.send(respuesta);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function mostrarMisVentas(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(ven)) as ventas, 1 as valid from (SELECT idVenta, concat(nombre, ' ', apellidos) as cliente, fecha, descripcion, pago from venta join cupon using(idCupon) join metodoPago using(idMetodo) join usuario using(idUsuario) WHERE idUsuario = "+req.params.id+") as ven) as consulta";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.row_to_json;
            res.send(respuesta);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}
function mostrarDetalleMisVentas(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (SELECT (SELECT row_to_json(ven) as venta FROM (SELECT idVenta, concat(nombre, ' ', apellidos) as cliente, fecha, descripcion, pago from venta join cupon using(idCupon) join metodoPago using(idMetodo) join usuario using(idUsuario) WHERE idVenta = "+req.params.idventa+") as ven), (SELECT array_to_json(array_agg(prod)) as productos FROM (SELECT producto, descripcion, codigo, imagen, marca, categoria, (cantidad*precioVenta) as total, cantidad from ventaDetalle join producto using(idProducto) join precioProducto using(idproducto) join marca using(idMarca) join marca_categoria using(idmarca) join categoria using(idcategoria) where idVenta = "+req.params.idventa+") as prod))as consulta";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.row_to_json;
            res.send(respuesta);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}


module.exports = {
    crearVenta,
    agregarALaVenta,
    mostrarMisVentas,
    mostrarDetalleMisVentas
};