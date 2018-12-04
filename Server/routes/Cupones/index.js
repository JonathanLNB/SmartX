var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function agregarCupon(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(cuponR) as cuponR, 1 as valid from (Select * from insertar_cupon("+req.body.id+", "+req.body.cantidad+", '"+req.body.descripcion+"')) as cuponR) as consulta;";
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

function mostrarCupones(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select array_to_json(array_agg(cupones)) as cupones, 1 as valid from (Select * from cupon order by idcupon) as cupones) as consulta";
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

function buscarCupones(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(cupones) as cupones, 1 as valid from (Select * from cupon WHERE cupon like '"+req.params.id+"') as cupones) as consulta";
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

function eliminarCupon(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="DELETE FROM cupon WHERE idcupon = "+req.params.idcupon;
    cliente.query(query).then(req => {
        res.send("{\"valid\":1}");
    }).catch(error => {
        console.log(error);
        res.send("{\"valid\":0}");
        res.end();
    });
}

module.exports = {
    agregarCupon,
    mostrarCupones,
    buscarCupones,
    eliminarCupon
};

