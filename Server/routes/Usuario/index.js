var pg = require('pg');
var direccion = "postgres://smartx:smartx@localhost:5432/smartx";
var cliente, query;

function insertarUsuario(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (Select row_to_json(usuario) as usuario, 1 as valid from (Select * from insertar_usuario("+req.body.id+", '"+req.body.nombre+"', '"+req.body.apellidos+"', '"+req.body.correo+"', '"+req.body.numtel+"', '"+req.body.foto+"', "+req.body.tipou+",'"+req.body.fbtoken+"')) as usuario) as consulta";
    console.log(query);
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

function datosUsuario(req, res, next) {
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (SELECT row_to_json(usa) as usuario, 1 as valid FROM (SELECT  idUsuario, concat(nombre, ' ', apellidos) as nombre, correo, numTel, foto, u.idTipoU, tipou from usuario u join tipoUsuario using(idTipoU) where correo like '"+req.body.correo+"') as usa) as consulta;";
    console.log(query);
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

function agregarDireccion(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (SELECT row_to_json(dir) as direccion from (SELECT * from insertar_direccion("+req.body.id+", '"+req.body.direccion+"', '"+req.body.descripcion+"', "+req.body.lat+","+req.body.lng+", "+req.body.idusuario+")) as dir) as consulta";
    console.log(query);
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

function mostrarMisDirecciones(req, res, next){
    cliente = new pg.Client(direccion);
    cliente.connect();
    res.setHeader('Content-Type', 'application/json');
    query ="SELECT row_to_json(consulta) FROM (SELECT array_to_json(array_agg(dir)) as direcciones, 1 as valid from (SELECT * from direccion where idUsuario = "+req.params.idusuario+") as dir) as consulta";
    console.log(query);
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
    insertarUsuario,
    agregarDireccion,
    datosUsuario,
    mostrarMisDirecciones
};