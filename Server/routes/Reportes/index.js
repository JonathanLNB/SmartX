var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function reporteVentasAnual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(meses)) as meses, 1 as valid from (select extract(month from v.fecha) as mes, sum((pp.precioventa-c.descuento)*vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 year')  group by  1) as meses";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.meses;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{meses:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteVentasMensual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(mes)) as mes, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, sum((pp.precioventa-c.descuento)*vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 month')  group by  1) as mes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.mes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{mes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteVentasSemanal(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(semana)) as semana, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, sum((pp.precioventa-c.descuento)*vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'6 days')  group by  1) as semana";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.semana;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{semana:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteProductosVAnual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(meses)) as meses, 1 as valid from (select extract(month from v.fecha) as mes, sum(vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 year')  group by  1) as meses";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.meses;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{meses:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteProductosVMensual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(mes)) as mes, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, sum(vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 month')  group by  1) as mes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.mes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{mes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteProductosVSemanal(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(semana)) as semana, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, sum(vd.cantidad) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'6 days')  group by  1) as semana";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.semana;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{semana:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantVAnual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(meses)) as meses, 1 as valid from (select extract(month from v.fecha) as mes, count(idventa) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 year')  group by  1) as meses";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.meses;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{meses:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantVMensual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(mes)) as mes, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, count(idventa) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 month')  group by  1) as mes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.mes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{mes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantVSemanal(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(semana)) as semana, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, count(idventa) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'6 days')  group by  1) as semana";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.semana;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{semana:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantCAnual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(meses)) as meses, 1 as valid from (select extract(month from v.fecha) as mes, count(idusuario) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 year')  group by  1) as meses";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.meses;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{meses:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantCMensual(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(mes)) as mes, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, count(idusuario) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'1 month')  group by  1) as mes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.mes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{mes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function reporteCantCSemanal(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(semana)) as semana, 1 as valid from (select concat(extract(day from v.fecha),'/',extract(month from v.fecha)) as dia, count(idusuario) as datos FROM  producto p JOIN precioproducto pp using(idproducto) JOIN ventadetalle vd using(idproducto) JOIN venta v using(idventa) JOIN cupon c using(idCupon) WHERE v.fecha>(now()-interval'6 days')  group by  1) as semana";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.semana;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{semana:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function totalClientes(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(clientes)) as clientes, 1 as valid from (SELECT nombre, apellidos, correo, numtel from usuario where idtipou = 2) as clientes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.clientes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{clientes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function totalOrdenes(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(ordenes)) as ordenes, 1 as valid from (SELECT v.idventa, concat(u.nombre,' ',u.apellidos), v.fecha, m.pago, c.descripcion from venta v join usuario u using(idusuario) join metodopago m using(idmetodo) join cupon c using (idcupon)) as ordenes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.ordenes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{ordenes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function totalProductosV(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(productos)) as productos, 1 as valid FROM (SELECT idproducto, producto, count(*) from producto where idproducto in (SELECT idproducto from ventadetalle) group by 1, 2 order by idproducto ) as productos";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.productos;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{productos:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function totalProductos(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(productos)) as productos, 1 as valid FROM (SELECT idproducto, producto, codigo, imagen, descripcion, precioVenta, PrecioCompra, marca , categoria, proveedor from marca join marca_categoria using (idMarca) join categoria using (idCategoria) join proveedor using (idProveedor) join producto using (idMarca) join precioProducto using (idProducto) order by idproducto) as productos";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.productos;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{productos:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

function totalClientes(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT array_to_json(array_agg(clientes)) as clientes, 1 as valid from (SELECT idusuario, nombre, apellidos, correo, numtel from usuario where idtipou = 2 order by idusuario) as clientes";
    cliente.query(query).then(req => {
        const rows = req.rows;
        rows.map(row => {
            var respuesta = row.clientes;
            if(respuesta != null)
                res.send(row);
            else
                res.send([{clientes:{}, valid:1}]);
            cliente.end();
        });
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

module.exports = {
    reporteVentasAnual,
    reporteVentasMensual,
    reporteVentasSemanal,
    reporteProductosVAnual,
    reporteProductosVMensual,
    reporteProductosVSemanal,
    reporteCantVAnual,
    reporteCantVMensual,
    reporteCantVSemanal,
    reporteCantCAnual,
    reporteCantCMensual,
    reporteCantCSemanal,
    totalClientes,
    totalOrdenes,
    totalProductos,
    totalProductosV
};