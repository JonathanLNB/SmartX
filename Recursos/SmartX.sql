create table tipoUsuario (idTipoU SERIAL NOT NULL PRIMARY KEY, tipoU varchar(30) NOT NULL);
create table cupon(idCupon SERIAL NOT NULL PRIMARY KEY, cupon varchar(32) NOT NULL, descuento numeric(10,4) NOT NULL, descripcion TEXT NOT NULL);
create table metodoPago(idMetodo SERIAL NOT NULL PRIMARY KEY, pago varchar(30) NOT NULL );
create table usuario(idUsuario SERIAL NOT NULL PRIMARY KEY, nombre varchar(50) NOT NULL, apellidos varchar(50) NOT NULL, correo varchar(255) NOT NULL, numTel varchar(10) NOT NULL, foto TEXT, idTipoU INT NOT NULL REFERENCES tipoUsuario(idTipoU) ON UPDATE CASCADE ON DELETE CASCADE);
create table direccion(idDireccion SERIAL NOT NULL PRIMARY KEY, direccion TEXT NOT NULL, descripcion TEXT NOT NULL , lat double precision NOT NULL, lng double precision NOT NULL, idUsuario INT NOT NULL REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE);
create table tokens(token TEXT NOT NULL, idUsuario INT NOT NULL REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE, fecha DATE NOT NULL , PRIMARY KEY(token, idUsuario));
create table categoria(idCategoria SERIAL NOT NULL PRIMARY KEY, categoria varchar(50) NOT NULL);
create table proveedor(idProveedor SERIAL NOT NULL PRIMARY KEY, proveedor varchar(60) NOT NULL, rfc varchar(13) NOT NULL);
create table marca(idMarca SERIAL PRIMARY KEY, marca varchar(50) NOT NULL, idProveedor INT NOT NULL REFERENCES proveedor(idProveedor) ON UPDATE CASCADE ON DELETE CASCADE);
create table marca_categoria(idMarca INTEGER NOT NULL REFERENCES marca(idMarca) ON UPDATE CASCADE ON DELETE CASCADE, idCategoria INTEGER NOT NULL  REFERENCES categoria(idCategoria) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY(idMarca, idCategoria));
create table producto(idProducto SERIAL NOT NULL PRIMARY KEY, producto varchar(50) NOT NULL, codigo varchar(13) NOT NULL, descripcion TEXT NOT NULL, imagen TEXT NOT NULL , idMarca INT NOT NULL REFERENCES marca(idMarca) ON UPDATE CASCADE ON DELETE CASCADE);
create table precioProducto(idPrecio SERIAL NOT NULL PRIMARY KEY, idProducto INT NOT NULL REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, fecha DATE NOT NULL, precioVenta NUMERIC(8,2) NOT NULL, precioCompra NUMERIC(8,2));
create table inventario(idInventario SERIAL NOT NULL PRIMARY KEY, fecha DATE NOT NULL);
create table inventarioDetalle(idInventario INT NOT NULL REFERENCES inventario(idInventario) ON UPDATE CASCADE ON DELETE CASCADE, idProducto INT NOT NULL REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, cantidad INT NOT NULL , PRIMARY KEY(idInventario, idProducto));
create table venta(idVenta SERIAL PRIMARY KEY, idUsuario INT NOT NULL REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE, fecha  TIMESTAMP NOT NULL, idMetodo INT NOT NULL  REFERENCES metodoPago(idMetodo) ON UPDATE CASCADE ON DELETE CASCADE, idCupon INT NOT NULL  REFERENCES cupon(idCupon) ON UPDATE CASCADE ON DELETE CASCADE);
create table ventaDetalle(idVenta INT NOT NULL REFERENCES venta(idVenta) ON UPDATE CASCADE ON DELETE CASCADE, idProducto INT NOT NULL REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, cantidad INT NOT NULL, PRIMARY KEY (idVenta, idProducto));
create table usuario_proveedor(idUsuario INT NOT NULL REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE, idProveedor INT NOT NULL REFERENCES proveedor(idProveedor) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY (idUsuario,idProveedor));

INSERT INTO tipoUsuario(tipoU) VALUES ('Administrador'), ('Cliente');
INSERT INTO cupon(cupon, descuento, descripcion) VALUES (md5('1'), 0.0, 'Sin descuento');
INSERT INTO metodoPago(pago) VALUES ('Cash On Delivery'), ('Debit Card'), ('Credit Card'), ('Depósito'), ('PayPal');
INSERT INTO proveedor(proveedor, rfc) VALUES ('Xiaomi', substring(md5('Xiaomi'::text) for 13)), ('Lenovo', substring(md5('Lenovo'::text) for 13)), ('Samsung', substring(md5('Samsung'::text) for 13)), ('LG Electronics', substring(md5('LG Electronics'::text) for 13)), ('Alcatel Mobile', substring(md5('Alcatel Mobile'::text) for 13)), ('Sony', substring(md5('Sony'::text) for 13)), ('Apple', substring(md5('Apple'::text) for 13)), ('Nokia', substring(md5('Nokia'::text) for 13)), ('Lanix', substring(md5('Lanix'::text) for 13)), ('Zhong Xing Telecommunication Equipment Company Limited', substring(md5('Zhong Xing Telecommunication Equipment Company Limited'::text) for 13)), ('Huawei Technologies Co.', substring(md5('Huawei Technologies Co.'::text) for 13));
INSERT INTO categoria(categoria) VALUES ('Gama Alta'), ('Gama Media'),('Gama Baja');
INSERT INTO marca(marca,idProveedor) VALUES ('MI', 1), ('RedMi', 1), ('Moto Z', 2), ('Moto X', 2), ('Moto G', 2), ('Moto E', 2), ('Moto C', 2), ('Galaxy S', 3), ('Galaxy J', 3), ('Galaxy A', 3), ('Galaxy Note', 3), ('Galaxy Grand Prime', 3), ('Galaxy Ace', 3), ('LG Q', 4), ('LG G', 4), ('LG K', 4), ('LG V', 4), ('Alcatel 1', 5), ('Alcatel 3', 5), ('Alcatel 5', 5), ('Alcatel IDOL', 5), ('Alcatel A', 5), ('Alcatel U', 5), ('Xperia XZ', 6), ('Xperia XA', 6), ('Xperia L', 6), ('Xperia E', 6), ('Xperia X', 6), ('Xperia C', 6), ('iPhone 6', 7), ('iPhone 7', 7), ('iPhone 8', 7), ('iPhone X', 7), ('Nokia 1', 8), ('Nokia 2', 8), ('Nokia 3', 8), ('Nokia 5', 8), ('Nokia 6', 8), ('Nokia 8', 8), ('Ilium Alpha', 9), ('Ilium M', 9), ('Ilium L', 9), ('ZTE Blade V', 10), ('ZTE Blade A', 10), ('ZTE Blade L', 10), ('Huawei Mate', 11), ('Huawei Nova', 11), ('Huawei P', 11), ('Huawei Y', 11);
INSERT INTO marca_categoria(idMarca, idCategoria) VALUES (1,1), (2,2), /*(3,1),*/ (3,1), (4,1), (5,1), (6,2), (7,3), (8,1), (9,1), (10,1), (11,1), (12,1), (13,3), (14,1), (15,1), (16,1), (17,2), (18,1), (19,1), (20,1), (21,2), (22,3), (23,3), (24,1), (25,1), (26,1), (27,2), (28,2), (29,3), (30,1), (31,1), (32,1), (33,1), (34,3), (35,3), (36,2), (37,1), (38,1), (39,1), (40,1), (41,1), (42,1), (43,1), (44,1), (45,2), (46,1), (47,1), (48,1), (49,2);
INSERT INTO producto(producto, codigo, descripcion, imagen, idMarca) VALUES ('MI 8', '750977200019', '', '', 1), ('MI MAX 3', '750977200029', '', '', 1), ('Redmi Note 6 Pro', '750977200039', '', '', 2), ('Redmi Note 6 Pro', '750977200049', '', '', 2), ('Redmi 6 pro', '750977200059', '', '', 2), ('Moto Z2', '750977200069', '', '', 3), ('Moto Z3', '750977200079', '', '', 3), ('Moto X', '750977200089', '', '', 4), ('Moto X2 Force', '750977200109', '', '', 4), ('Moto G6', '750977200119', '', '', 5), ('Moto E5', '750977200129', '', '', 6), ('Moto C Plus', '750977200139', '', '', 7), ('Galaxy S9+', '750977200149', '', '', 8), ('Galaxy J4+', '750977200159', '', '', 9), ('Galaxy A9', '750977200169', '', '', 10), ('Galaxy Note 9', '750977200179', '', '', 11), ('Galaxy Grand Prime Plus', '750977200189', '', '', 12), ('Galaxy Ace 4', '750977200199', '', '', 13), ('LG Q7+', '750977200209', '', '', 14), ('LG G7 ThinQ', '750977200219', '', '', 15), ('LG K11+', '750977200229', '', '', 16), ('LG V35 ThinQ', '750977200239', '', '', 17), ('Alcatel 1X', '750977200249', '', '', 18), ('Alcatel 3X', '750977200259', '', '', 19), ('Alcatel 5V', '750977200269', '', '', 20);
INSERT INTO producto(producto, codigo, descripcion, imagen, idMarca) VALUES ('Alcatel IDOL 5S', '750977200279', '', '', 21), ('Alcatel A7 XL', '750977200289', '', '',22), ('Alcatel U5 HD', '750977200299', '', '', 23), ('Xperia XZ2', '750977200309', '', '', 24), ('Xperia XA2', '750977200319', '', '', 25), ('Xperia L2', '750977200329', '', '', 26), ('Xperia E5', '750977200339', '', '', 27), ('Xperia X Compact', '750977200349', '', '', 28), ('Xperia C4', '750977200359', '', '', 29), ('iPhone 6', '750977200369', '', '', 30), ('iPhone 7', '750977200379', '', '', 31), ('iPhone 8', '750977200389', '', '', 32), ('iPhone X', '750977200399', '', '', 33), ('Nokia 1', '750977200409', '', '', 34), ('Nokia 2.1', '750977200419', '', '', 35), ('Nokia 3.1', '750977200429', '', '', 36), ('Nokia 5.1', '750977200439', '', '', 37), ('Nokia 6.1', '750977200449', '', '', 38), ('Nokia 8', '750977200459', '', '', 39), ('Lanix Ilium Alpha 9', '750977200469', '', '', 40), ('Lanix Ilium M9', '750977200479', '', '', 41), ('Lanix Ilium L1400', '750977200489', '', '', 42), ('ZTE Blade V9 Vita', '750977200499', '', '', 43), ('ZTE Blade A530', '750977200509', '', '', 44), ('ZTE Blade L7', '750977200519', '', '', 45), ('Huawei Mate 20 Pro', '750977200529', '', '', 46), ('Huawei Nova 3', '750977200539', '', '', 47), ('Huawei P20 Pro', '750977200549', '', '', 48), ('Huawei Y9', '750977200559', '', '', 49);
INSERT INTO precioProducto(idProducto, fecha, precioVenta, precioCompra) VALUES (1, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (2, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (3, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (4, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (5, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (6, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (7, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (8, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (9, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (10, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (11, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (12, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (13, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (14, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (15, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (16, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (17, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (18, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (19, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (20, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (21, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (22, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (23, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (24, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (25, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (26, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (27, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (28, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (29, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (30, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (31, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (32, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (33, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (34, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (35, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (36, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (37, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (38, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (39, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (40, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (41, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (42, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (43, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (44, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (45, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (46, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (47, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (48, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00), (49, now(), Floor(random()*8000)+4000.00, Floor(random()*8000)+1000.00);
INSERT INTO inventario(fecha) VALUES (now());
INSERT INTO inventarioDetalle(idInventario,idProducto, cantidad) VALUES  (1,1, Floor(random()*1000000)), (1,2, Floor(random()*1000000)), (1,3, Floor(random()*1000000)), (1,4, Floor(random()*1000000)), (1,5, Floor(random()*1000000)), (1,6, Floor(random()*1000000)), (1,7, Floor(random()*1000000)), (1,8, Floor(random()*1000000)), (1,9, Floor(random()*1000000)), (1, 10, Floor(random()*1000000)), (1,11, Floor(random()*1000000)), (1,12, Floor(random()*1000000)), (1,13, Floor(random()*1000000)), (1,14, Floor(random()*1000000)), (1,15, Floor(random()*1000000)), (1,16, Floor(random()*1000000)), (1,17, Floor(random()*1000000)), (1,18, Floor(random()*1000000)), (1,19, Floor(random()*1000000)), (1,20, Floor(random()*1000000)), (1,21, Floor(random()*1000000)), (1,22, Floor(random()*1000000)), (1,23, Floor(random()*1000000)), (1,24, Floor(random()*1000000)), (1,25, Floor(random()*1000000)), (1,26, Floor(random()*1000000)), (1,27, Floor(random()*1000000)), (1,28, Floor(random()*1000000)), (1,29, Floor(random()*1000000)), (1,30, Floor(random()*1000000)), (1,31, Floor(random()*1000000)), (1,32, Floor(random()*1000000)), (1,33, Floor(random()*1000000)), (1,34, Floor(random()*1000000)), (1,35, Floor(random()*1000000)), (1,36, Floor(random()*1000000)), (1,37, Floor(random()*1000000)), (1,38, Floor(random()*1000000)), (1,39, Floor(random()*1000000)), (1,40, Floor(random()*1000000)), (1,41, Floor(random()*1000000)), (1,42, Floor(random()*1000000)), (1,43, Floor(random()*1000000)), (1,44, Floor(random()*1000000)), (1,45, Floor(random()*1000000)), (1,46, Floor(random()*1000000)), (1,47, Floor(random()*1000000)), (1,48, Floor(random()*1000000)), (1,49, Floor(random()*1000000));

/*Procedimeintos almacenados*/
CREATE OR REPLACE FUNCTION insertar_usuario(vidUsuario integer, vnombre varchar, vapellidos VARCHAR, vcorreo varchar, vnumtel varchar, vfoto text, vtipou integer, vfbtoken text)
RETURNS TABLE(idUsuario INTEGER, nombre varchar, apellidos varchar, correo VARCHAR, numtel varchar,foto text, idtipou integer, fbtoken text) as
$$
BEGIN
IF(vcorreo NOT IN (SELECT u.correo FROM usuario u))
THEN
INSERT INTO usuario (nombre, apellidos, correo, numTel, foto, idTipoU) VALUES ($2, $3, $4, $5, $6, $7);
INSERT INTO tokens VALUES ($8, (SELECT u.idUsuario from usuario u where u.correo like vcorreo LIMIT 1), now());
ELSE
UPDATE usuario u SET u.nombre = $2, u.apellidos = $3, u.numTel = $5, u.foto = $6 WHERE u.correo like vcorreo;
IF(vfbtoken in (SELECT t.token FROM tokens t))
THEN
UPDATE tokens t SET t.fecha = now() WHERE t.token like vfbtoken;
ELSE
INSERT INTO tokens VALUES (vfbtoken, vidUsuario, now());
END IF;
END IF;
RETURN QUERY SELECT u.idUsuario, u.nombre, u.apellidos, u.correo, u.numtel, u.foto, u.idTipoU, t.token from usuario u join tokens t USING(idUsuario) WHERE u.correo like vcorreo order BY fecha DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_cupon(vidcupon integer, vdescuento numeric(10,4), vdescripcion TEXT)
RETURNS TABLE(idCupon INTEGER, cupon varchar, descuento numeric(10,4), descripcion TEXT) as
$$
BEGIN
IF(vidcupon NOT IN (SELECT c.idcupon FROM cupon c))
THEN
INSERT INTO cupon (cupon, descuento, descripcion) VALUES (md5((SELECT count(*)+1 from cupon LIMIT 1)::text), $2, $3);
ELSE
UPDATE cupon SET cupon = md5($1::text), descuento = $2, descripcion = $3 WHERE idCupon = vidcupon;
END IF;
RETURN QUERY SELECT c.idCupon, c.cupon, c.descuento, c.descripcion from cupon c order BY c.idCupon DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_proveedor(vidproveedor integer, vproveedor varchar, vrfc varchar)
RETURNS TABLE(idProveedor INTEGER, proveedor varchar, rfc varchar) as
$$
BEGIN
IF(vidproveedor NOT IN (SELECT idProveedor FROM proveedor))
THEN
INSERT INTO proveedor (proveedor, rfc) VALUES ($2, $3);
ELSE
UPDATE proveedor SET proveedor = $2, rfc = $3 WHERE idProveedor = vidproveedor;
END IF;
RETURN QUERY SELECT idProveedor, proveedor, rfc from proveedor order BY idProveedor DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_proveedor(vidproveedor integer, vproveedor varchar, vrfc varchar)
RETURNS TABLE(idProveedor INTEGER, proveedor varchar, rfc varchar) as
$$
BEGIN
IF(vidproveedor NOT IN (SELECT p.idProveedor FROM proveedor p))
THEN
INSERT INTO proveedor (proveedor, rfc) VALUES ($2, $3);
ELSE
UPDATE proveedor SET proveedor = $2, rfc = $3 WHERE idProveedor = vidproveedor;
END IF;
RETURN QUERY SELECT p.idProveedor, p.proveedor, p.rfc from proveedor p order BY p.idProveedor DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_marca(vidmarca integer, vmarca varchar, vidProveedor integer)
RETURNS TABLE(idMarca INTEGER, marca varchar,idProveedor INTEGER) as
$$
BEGIN
IF(vidmarca NOT IN (SELECT m.idMarca FROM marca m))
THEN
INSERT INTO marca (marca, idProveedor) VALUES ($2, $3);
ELSE
UPDATE marca SET marca = $2, idProveedor = $3 WHERE idMarca = vidmarca;
END IF;
RETURN QUERY SELECT m.idMarca, m.marca, m.idProveedor from marca m order BY m.idMarca DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_categoria(vidcategoria integer, vcategoria varchar)
RETURNS TABLE(idCategoria INTEGER, categoria varchar) as
$$
BEGIN
IF(vidcategoria NOT IN (SELECT c.idCategoria FROM categoria c))
THEN
INSERT INTO categoria (categoria) VALUES ($2);
ELSE
UPDATE categoria SET categoria = $2 WHERE idCategoria = vidcategoria;
END IF;
RETURN QUERY SELECT c.idCategoria, c.categoria from categoria c order BY c.idCategoria DESC LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_marca_categoria(vidmarca integer, vidcategoria integer)
RETURNS TABLE(valid integer) as
$$
BEGIN
INSERT INTO marca_categoria VALUES ($1, $2);
RETURN QUERY SELECT 1 as valid;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_venta(vidusuario integer, vidmetodo integer, vidcupon integer)
RETURNS TABLE(valid integer, idventa integer) as
$$
BEGIN
INSERT INTO venta(idUsuario, fecha, idMetodo, idCupon) values ($1, now(), $2, $3);
RETURN QUERY SELECT 1 as valid, v.idventa from venta v order by v.idventa desc;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_venta_detalle(vidventa integer, vidproducto INTEGER, cantidad INTEGER)
RETURNS TABLE(valid integer) as
$$
BEGIN
INSERT INTO ventaDetalle values ($1, $2, $3);
RETURN QUERY SELECT 1 as valid;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_inventario()
RETURNS TABLE(valid integer, idInventario integer) as
$$
BEGIN
INSERT INTO inventario(fecha) values (now());
RETURN QUERY SELECT 1 as valid, i.idInventario from inventario i order by i.idInventario desc;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_inventario_detalle(vidinventario integer, vidproducto INTEGER, cantidad INTEGER)
RETURNS TABLE(valid integer) as
$$
BEGIN
INSERT INTO inventarioDetalle values ($1, $2, $3);
RETURN QUERY SELECT 1 as valid;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_producto(vidproducto integer, vproducto varchar, vcodigo varchar, vdescripcion TEXT, vimagen TEXT, vidMarca INTEGER, vpreciov numeric(8,2), vprecioc numeric(8,2))
RETURNS TABLE(idproducto integer, producto varchar, codigo varchar, descripcion TEXT, imagen TEXT, idMarca INTEGER, precioventa numeric(8,2), preciocompra numeric(8,2)) as
$$
BEGIN
IF(vidproducto NOT IN (SELECT p.idProducto FROM producto p))
THEN
INSERT INTO producto (producto, codigo, descripcion, imagen, idMarca) VALUES ($2, $3, $4, $5, $6);
INSERT INTO precioProducto(idProducto, fecha, precioVenta, precioCompra) VALUES  ((SELECT p.idProducto from producto p where p.codigo like vcodigo LIMIT 1), now(), vpreciov, vprecioc);
ELSE
UPDATE producto SET  producto = $2, codigo = $3, descripcion = $4, imagen = $5, idMarca = $6 WHERE  idProducto = vidproducto;
UPDATE precioProducto SET  fecha = now(), precioVenta = vpreciov, precioCompra = vprecioc WHERE idProducto = vidproducto;
END IF;
RETURN QUERY SELECT p.idProducto, p.producto, p.codigo, p.descripcion, p.imagen, p.idMarca, pp.precioVenta, pp.precioCompra FROM producto p join precioProducto pp using(idProducto) where p.codigo = vcodigo LIMIT 1;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertar_direccion(viddireccion integer, vdireccion TEXT, vdescripcion TEXT, vlat double precision, vlng double precision, vidusuario INTEGER)
RETURNS TABLE(iddireccion integer, direccion TEXT, descripcion TEXT, lat double precision, lng double precision, idusuario INTEGER) as
$$
BEGIN
IF(viddireccion NOT IN (SELECT d.iddireccion FROM direccion d))
THEN
INSERT INTO direccion(direccion, descripcion, lat, lng, idUsuario) VALUES ($2, $3, $4, $5, $6);
ELSE
UPDATE direccion SET  direccion = $2, descripcion = $3, lat = $4, lng = $5 WHERE  iddireccion = viddireccion;
END IF;
RETURN QUERY SELECT d.idDireccion, d.direccion, d.descripcion, d.lat, d.lng, d.idUsuario FROM direccion d order by iddireccion desc LIMIT 1;
END;
$$
LANGUAGE plpgsql;

