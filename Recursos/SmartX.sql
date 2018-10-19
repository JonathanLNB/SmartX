create table tipoUsuario (idTipoU SERIAL PRIMARY KEY, tipoU varchar(30));
create table cupon(idCupon SERIAL PRIMARY KEY, cupon varchar(32), descuento numeric(10,4));
create table metodoPago(idMetodo SERIAL PRIMARY KEY, pago varchar(30));
create table usuario(idUsuario SERIAL PRIMARY KEY, nombre varchar(50), apellidos varchar(50), correo varchar(255), numTel varchar(10), idTipoU INT REFERENCES tipoUsuario(idTipoU) ON UPDATE CASCADE ON DELETE CASCADE);
create table direccion(idDireccion SERIAL PRIMARY KEY, direccion TEXT, descripcion TEXT, lat double precision, lng double precision, idUsuario INT REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE);
create table tokens(token TEXT, idUsuario INT REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE, fecha DATE, PRIMARY KEY(token, idUsuario));
create table categoria(idCategoria SERIAL PRIMARY KEY, categoria varchar(50));
create table proveedor(idProveedor SERIAL PRIMARY KEY, proveedor varchar(50), rfc varchar(13));
create table marca(idMarca SERIAL PRIMARY KEY, marca varchar(50), idProveedor INT REFERENCES proveedor(idProveedor) ON UPDATE CASCADE ON DELETE CASCADE);
create table marca_categoria(idMarca INTEGER REFERENCES marca(idMarca) ON UPDATE CASCADE ON DELETE CASCADE, idCategoria INTEGER REFERENCES categoria(idCategoria) ON UPDATE CASCADE ON DELETE CASCADE, PRIMARY KEY(idMarca, idCategoria));
create table producto(idProducto SERIAL PRIMARY KEY, producto varchar(50), codigo varchar(13), descripcion TEXT, idMarca INT REFERENCES marca(idMarca) ON UPDATE CASCADE ON DELETE CASCADE);
create table precioProducto(idPrecio SERIAL PRIMARY KEY, idProducto INT REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, fecha DATE, precioVenta NUMERIC(5,2), precioCompra NUMERIC(5,2));
create table inventario(idInventario SERIAL PRIMARY KEY, fecha DATE);
create table inventarioDetalle(idInventario INT REFERENCES inventario(idInventario) ON UPDATE CASCADE ON DELETE CASCADE, idProducto INT REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, cantidad INT, PRIMARY KEY(idInventario, idProducto));
create table venta(idVenta SERIAL PRIMARY KEY, idUsuario INT REFERENCES usuario(idUsuario) ON UPDATE CASCADE ON DELETE CASCADE, fecha TIMESTAMP, idMetodo INT REFERENCES metodoPago(idMetodo) ON UPDATE CASCADE ON DELETE CASCADE);
create table ventaDetalle(idVenta INT REFERENCES venta(idVenta) ON UPDATE CASCADE ON DELETE CASCADE, idProducto INT REFERENCES producto(idProducto) ON UPDATE CASCADE ON DELETE CASCADE, cantidad INT, subtotal NUMERIC(7,2), descuento INT REFERENCES cupon(idCupon) ON UPDATE CASCADE ON DELETE CASCADE);