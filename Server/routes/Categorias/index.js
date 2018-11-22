var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function agregarCategoria(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(cat) as categoria, 1 as valid from (SELECT * from insertar_categoria("+req.body.id+", '"+req.body.categoria+"')) as cat) as consulta";
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

function mostrarCategorias(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select array_to_json(array_agg(categorias)) as categorias, 1 as valid from (Select * from categoria order by idcategoria) as categorias) as consulta";
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

function eliminarCategoria(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="DELETE FROM categoria WHERE idcategoria = "+req.params.idcategoria;
    cliente.query(query).then(req => {
        res.send("{\"valid\":1}");
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

module.exports = {
    agregarCategoria,
    mostrarCategorias,
    eliminarCategoria
}