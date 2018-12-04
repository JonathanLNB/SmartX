var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function agregarProducto(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(prod) as prod, 1 as valid from (SELECT * from insertar_producto("+req.body.id+", '"+req.body.producto+"', '"+req.body.codigo+"', '"+req.body.descripcion+"', '"+req.body.imagen+"', "+req.body.marca+", "+req.body.preciov+", "+req.body.precioc+"))  as prod) as consulta;";
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

function buscarProducto(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select array_to_json(array_agg(productos)) as productos, 1 as valid from (SELECT idproducto, producto, codigo, imagen, descripcion, precioVenta, PrecioCompra, marca , m.idmarca, categoria, c.idcategoria, proveedor, pr.idproveedor, id.cantidad from marca m join marca_categoria mc using (idMarca) join categoria c using (idCategoria) join proveedor pr using (idProveedor) join producto p using (idMarca) join precioProducto using (idProducto) join inventariodetalle id using(idproducto) join inventario i using(idinventario) where upper(p.producto) like upper('%"+req.params.busqueda+"%') or upper(m.marca) like upper('%"+req.params.busqueda+"%') or upper(c.categoria) like upper('%"+req.params.busqueda+"%') or upper(pr.proveedor) like upper('%"+req.params.busqueda+"%') and i.fecha = (SELECT fecha from inventario order by fecha desc limit 1)) as productos) as consulta";
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

function buscarProductoporID(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select array_to_json(array_agg(productos)) as productos, 1 as valid from (SELECT idproducto, producto, codigo, imagen, descripcion, precioVenta, PrecioCompra, marca , m.idmarca, categoria, c.idcategoria, proveedor, pr.idproveedor, id.cantidad from marca m join marca_categoria mc using (idMarca) join categoria c using (idCategoria) join proveedor pr using (idProveedor) join producto p using (idMarca) join precioProducto using (idProducto) join inventariodetalle id using(idproducto) join inventario i using(idinventario) where p.idproducto = "+req.params.id+" and i.fecha = (SELECT fecha from inventario order by fecha desc limit 1)) as productos) as consulta";
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

function eliminarProducto(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="DELETE FROM producto WHERE idproducto = "+req.params.idproducto;
    cliente.query(query).then(req => {
        res.send("{\"valid\":1}");
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}
module.exports = {
    agregarProducto,
    buscarProducto,
    buscarProductoporID,
    eliminarProducto
};
