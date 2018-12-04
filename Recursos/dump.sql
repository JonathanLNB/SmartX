--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: insertar_categoria(integer, character varying); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_categoria(vidcategoria integer, vcategoria character varying) RETURNS TABLE(idcategoria integer, categoria character varying)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(vidcategoria NOT IN (SELECT c.idCategoria FROM categoria c))
  THEN
    INSERT INTO categoria (categoria) VALUES ($2);
  ELSE
    UPDATE categoria SET categoria = $2 WHERE idCategoria = vidcategoria;
  END IF;
  RETURN QUERY SELECT c.idCategoria, c.categoria from categoria c order BY c.idCategoria DESC LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_categoria(vidcategoria integer, vcategoria character varying) OWNER TO smartx;

--
-- Name: insertar_cupon(integer, numeric, text); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_cupon(vidcupon integer, vdescuento numeric, vdescripcion text) RETURNS TABLE(idcupon integer, cupon character varying, descuento numeric, descripcion text)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(vidcupon NOT IN (SELECT c.idcupon FROM cupon c))
  THEN
    INSERT INTO cupon (cupon, descuento, descripcion) VALUES (md5((SELECT count(*)+1 from cupon LIMIT 1)::text), $2, $3);
  ELSE
    UPDATE cupon SET cupon = md5($1::text), descuento = $2, descripcion = $3 WHERE idCupon = vidcupon;
  END IF;
  RETURN QUERY SELECT c.idCupon, c.cupon, c.descuento, c.descripcion from cupon c order BY c.idCupon DESC LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_cupon(vidcupon integer, vdescuento numeric, vdescripcion text) OWNER TO smartx;

--
-- Name: insertar_direccion(integer, text, text, double precision, double precision, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_direccion(viddireccion integer, vdireccion text, vdescripcion text, vlat double precision, vlng double precision, vidusuario integer) RETURNS TABLE(iddireccion integer, direccion text, descripcion text, lat double precision, lng double precision, idusuario integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(viddireccion NOT IN (SELECT d.iddireccion FROM direccion d))
  THEN
    INSERT INTO direccion(direccion, descripcion, lat, lng, idUsuario) VALUES ($2, $3, $4, $5, $6);
  ELSE
    UPDATE direccion SET  direccion = $2, descripcion = $3, lat = $4, lng = $5 WHERE  iddireccion = viddireccion;
  END IF;
  RETURN QUERY SELECT d.idDireccion, d.direccion, d.descripcion, d.lat, d.lng, d.idUsuario FROM direccion d order by iddireccion desc LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_direccion(viddireccion integer, vdireccion text, vdescripcion text, vlat double precision, vlng double precision, vidusuario integer) OWNER TO smartx;

--
-- Name: insertar_inventario(); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_inventario() RETURNS TABLE(valid integer, idinventario integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO inventario(fecha) values (now());
  RETURN QUERY SELECT 1 as valid, i.idInventario from inventario i order by i.idInventario desc;
END;
$$;


ALTER FUNCTION public.insertar_inventario() OWNER TO smartx;

--
-- Name: insertar_inventario_detalle(integer, integer, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_inventario_detalle(vidinventario integer, vidproducto integer, cantidad integer) RETURNS TABLE(valid integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  INSERT INTO inventarioDetalle values ($1, $2, $3);
  RETURN QUERY SELECT 1 as valid;
END;
$_$;


ALTER FUNCTION public.insertar_inventario_detalle(vidinventario integer, vidproducto integer, cantidad integer) OWNER TO smartx;

--
-- Name: insertar_marca(integer, character varying, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_marca(vidmarca integer, vmarca character varying, vidproveedor integer) RETURNS TABLE(idmarca integer, marca character varying, idproveedor integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(vidmarca NOT IN (SELECT m.idMarca FROM marca m))
  THEN
    INSERT INTO marca (marca, idProveedor) VALUES ($2, $3);
  ELSE
    UPDATE marca SET marca = $2, idProveedor = $3 WHERE idMarca = vidmarca;
  END IF;
  RETURN QUERY SELECT m.idMarca, m.marca, m.idProveedor from marca m order BY m.idMarca DESC LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_marca(vidmarca integer, vmarca character varying, vidproveedor integer) OWNER TO smartx;

--
-- Name: insertar_marca_categoria(integer, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_marca_categoria(vidmarca integer, vidcategoria integer) RETURNS TABLE(valid integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  INSERT INTO marca_categoria VALUES ($1, $2);
  RETURN QUERY SELECT 1 as valid;
END;
$_$;


ALTER FUNCTION public.insertar_marca_categoria(vidmarca integer, vidcategoria integer) OWNER TO smartx;

--
-- Name: insertar_producto(integer, character varying, character varying, text, text, integer, numeric, numeric); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_producto(vidproducto integer, vproducto character varying, vcodigo character varying, vdescripcion text, vimagen text, vidmarca integer, vpreciov numeric, vprecioc numeric) RETURNS TABLE(idproducto integer, producto character varying, codigo character varying, descripcion text, imagen text, idmarca integer, precioventa numeric, preciocompra numeric)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(vidproducto NOT IN (SELECT p.idProducto FROM producto p))
  THEN
    INSERT INTO producto (producto, codigo, descripcion, imagen, idMarca) VALUES ($2, $3, $4, $5, $6);
    INSERT INTO precioProducto(idProducto, fecha, precioVenta, precioCompra) VALUES  ((SELECT p.idProducto from producto p where p.codigo like vcodigo LIMIT 1), now(), vpreciov, vprecioc);
  ELSE
    UPDATE producto SET  producto = $2, codigo = $3, descripcion = $4, imagen = $5, idMarca = $6 WHERE  producto.idProducto = vidproducto;
    UPDATE precioProducto SET  fecha = now(), precioVenta = vpreciov, precioCompra = vprecioc WHERE precioProducto.idProducto = vidproducto;
  END IF;
  RETURN QUERY SELECT p.idProducto, p.producto, p.codigo, p.descripcion, p.imagen, p.idMarca, pp.precioVenta, pp.precioCompra FROM producto p join precioProducto pp using(idProducto) where p.codigo = vcodigo LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_producto(vidproducto integer, vproducto character varying, vcodigo character varying, vdescripcion text, vimagen text, vidmarca integer, vpreciov numeric, vprecioc numeric) OWNER TO smartx;

--
-- Name: insertar_proveedor(integer, character varying, character varying); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_proveedor(vidproveedor integer, vproveedor character varying, vrfc character varying) RETURNS TABLE(idproveedor integer, proveedor character varying, rfc character varying)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF(vidproveedor NOT IN (SELECT p.idProveedor FROM proveedor p))
  THEN
    INSERT INTO proveedor (proveedor, rfc) VALUES ($2, $3);
  ELSE
    UPDATE proveedor SET proveedor = $2, rfc = $3 WHERE idProveedor = vidproveedor;
  END IF;
  RETURN QUERY SELECT p.idProveedor, p.proveedor, p.rfc from proveedor p order BY p.idProveedor DESC LIMIT 1;
END;
$_$;


ALTER FUNCTION public.insertar_proveedor(vidproveedor integer, vproveedor character varying, vrfc character varying) OWNER TO smartx;

--
-- Name: insertar_usuario(integer, character varying, character varying, character varying, character varying, text, integer, text); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_usuario(vidusuario integer, vnombre character varying, vapellidos character varying, vcorreo character varying, vnumtel character varying, vfoto text, vtipou integer, vfbtoken text) RETURNS TABLE(idusuario integer, nombre character varying, apellidos character varying, correo character varying, numtel character varying, foto text, idtipou integer, fbtoken text)
    LANGUAGE plpgsql
    AS $_$
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
$_$;


ALTER FUNCTION public.insertar_usuario(vidusuario integer, vnombre character varying, vapellidos character varying, vcorreo character varying, vnumtel character varying, vfoto text, vtipou integer, vfbtoken text) OWNER TO smartx;

--
-- Name: insertar_venta(integer, integer, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_venta(vidusuario integer, vidmetodo integer, vidcupon integer) RETURNS TABLE(valid integer, idventa integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  INSERT INTO venta(idUsuario, fecha, idMetodo, idCupon) values ($1, now(), $2, $3);
  RETURN QUERY SELECT 1 as valid, v.idventa from venta v order by v.idventa desc;
END;
$_$;


ALTER FUNCTION public.insertar_venta(vidusuario integer, vidmetodo integer, vidcupon integer) OWNER TO smartx;

--
-- Name: insertar_venta_detalle(integer, integer, integer); Type: FUNCTION; Schema: public; Owner: smartx
--

CREATE FUNCTION public.insertar_venta_detalle(vidventa integer, vidproducto integer, vcantidad integer) RETURNS TABLE(valid integer)
    LANGUAGE plpgsql
    AS $_$
BEGIN
  IF (vcantidad < (SELECT i.cantidad
                   from inventarioDetalle i
                          join producto using (idProducto)
                   where idProducto = vidproducto
                   LIMIT 1))
  THEN
    INSERT INTO ventaDetalle values ($1, $2, $3);
    UPDATE inventarioDetalle SET cantidad = cantidad-vcantidad WHERE inventarioDetalle.idProducto = vidproducto;
    RETURN QUERY SELECT 1 as valid;
  ELSE
    RETURN QUERY SELECT 2 as valid;
  END IF;
END;
$_$;


ALTER FUNCTION public.insertar_venta_detalle(vidventa integer, vidproducto integer, vcantidad integer) OWNER TO smartx;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.categoria (
    idcategoria integer NOT NULL,
    categoria character varying(50) NOT NULL
);


ALTER TABLE public.categoria OWNER TO smartx;

--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.categoria_idcategoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoria_idcategoria_seq OWNER TO smartx;

--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.categoria_idcategoria_seq OWNED BY public.categoria.idcategoria;


--
-- Name: cupon; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.cupon (
    idcupon integer NOT NULL,
    cupon character varying(32) NOT NULL,
    descuento numeric(10,4) NOT NULL,
    descripcion text NOT NULL
);


ALTER TABLE public.cupon OWNER TO smartx;

--
-- Name: cupon_idcupon_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.cupon_idcupon_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cupon_idcupon_seq OWNER TO smartx;

--
-- Name: cupon_idcupon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.cupon_idcupon_seq OWNED BY public.cupon.idcupon;


--
-- Name: direccion; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.direccion (
    iddireccion integer NOT NULL,
    direccion text NOT NULL,
    descripcion text NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    idusuario integer NOT NULL
);


ALTER TABLE public.direccion OWNER TO smartx;

--
-- Name: direccion_iddireccion_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.direccion_iddireccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.direccion_iddireccion_seq OWNER TO smartx;

--
-- Name: direccion_iddireccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.direccion_iddireccion_seq OWNED BY public.direccion.iddireccion;


--
-- Name: inventario; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.inventario (
    idinventario integer NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.inventario OWNER TO smartx;

--
-- Name: inventario_idinventario_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.inventario_idinventario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventario_idinventario_seq OWNER TO smartx;

--
-- Name: inventario_idinventario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.inventario_idinventario_seq OWNED BY public.inventario.idinventario;


--
-- Name: inventariodetalle; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.inventariodetalle (
    idinventario integer NOT NULL,
    idproducto integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.inventariodetalle OWNER TO smartx;

--
-- Name: marca; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.marca (
    idmarca integer NOT NULL,
    marca character varying(50) NOT NULL,
    idproveedor integer NOT NULL
);


ALTER TABLE public.marca OWNER TO smartx;

--
-- Name: marca_categoria; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.marca_categoria (
    idmarca integer NOT NULL,
    idcategoria integer NOT NULL
);


ALTER TABLE public.marca_categoria OWNER TO smartx;

--
-- Name: marca_idmarca_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.marca_idmarca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marca_idmarca_seq OWNER TO smartx;

--
-- Name: marca_idmarca_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.marca_idmarca_seq OWNED BY public.marca.idmarca;


--
-- Name: metodopago; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.metodopago (
    idmetodo integer NOT NULL,
    pago character varying(30) NOT NULL
);


ALTER TABLE public.metodopago OWNER TO smartx;

--
-- Name: metodopago_idmetodo_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.metodopago_idmetodo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metodopago_idmetodo_seq OWNER TO smartx;

--
-- Name: metodopago_idmetodo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.metodopago_idmetodo_seq OWNED BY public.metodopago.idmetodo;


--
-- Name: precioproducto; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.precioproducto (
    idprecio integer NOT NULL,
    idproducto integer NOT NULL,
    fecha date NOT NULL,
    precioventa numeric(8,2) NOT NULL,
    preciocompra numeric(8,2)
);


ALTER TABLE public.precioproducto OWNER TO smartx;

--
-- Name: precioproducto_idprecio_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.precioproducto_idprecio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.precioproducto_idprecio_seq OWNER TO smartx;

--
-- Name: precioproducto_idprecio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.precioproducto_idprecio_seq OWNED BY public.precioproducto.idprecio;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.producto (
    idproducto integer NOT NULL,
    producto character varying(50) NOT NULL,
    codigo character varying(13) NOT NULL,
    descripcion text NOT NULL,
    imagen text NOT NULL,
    idmarca integer NOT NULL
);


ALTER TABLE public.producto OWNER TO smartx;

--
-- Name: producto_idproducto_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.producto_idproducto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_idproducto_seq OWNER TO smartx;

--
-- Name: producto_idproducto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.producto_idproducto_seq OWNED BY public.producto.idproducto;


--
-- Name: proveedor; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.proveedor (
    idproveedor integer NOT NULL,
    proveedor character varying(60) NOT NULL,
    rfc character varying(13) NOT NULL
);


ALTER TABLE public.proveedor OWNER TO smartx;

--
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.proveedor_idproveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.proveedor_idproveedor_seq OWNER TO smartx;

--
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.proveedor_idproveedor_seq OWNED BY public.proveedor.idproveedor;


--
-- Name: tipousuario; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.tipousuario (
    idtipou integer NOT NULL,
    tipou character varying(30) NOT NULL
);


ALTER TABLE public.tipousuario OWNER TO smartx;

--
-- Name: tipousuario_idtipou_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.tipousuario_idtipou_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tipousuario_idtipou_seq OWNER TO smartx;

--
-- Name: tipousuario_idtipou_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.tipousuario_idtipou_seq OWNED BY public.tipousuario.idtipou;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.tokens (
    token text NOT NULL,
    idusuario integer NOT NULL,
    fecha date NOT NULL
);


ALTER TABLE public.tokens OWNER TO smartx;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    nombre character varying(50) NOT NULL,
    apellidos character varying(50) NOT NULL,
    correo character varying(255) NOT NULL,
    numtel character varying(10) NOT NULL,
    foto text,
    idtipou integer NOT NULL
);


ALTER TABLE public.usuario OWNER TO smartx;

--
-- Name: usuario_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.usuario_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_idusuario_seq OWNER TO smartx;

--
-- Name: usuario_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;


--
-- Name: usuario_proveedor; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.usuario_proveedor (
    idusuario integer NOT NULL,
    idproveedor integer NOT NULL
);


ALTER TABLE public.usuario_proveedor OWNER TO smartx;

--
-- Name: venta; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.venta (
    idventa integer NOT NULL,
    idusuario integer NOT NULL,
    fecha timestamp without time zone NOT NULL,
    idmetodo integer NOT NULL,
    idcupon integer NOT NULL
);


ALTER TABLE public.venta OWNER TO smartx;

--
-- Name: venta_idventa_seq; Type: SEQUENCE; Schema: public; Owner: smartx
--

CREATE SEQUENCE public.venta_idventa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venta_idventa_seq OWNER TO smartx;

--
-- Name: venta_idventa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: smartx
--

ALTER SEQUENCE public.venta_idventa_seq OWNED BY public.venta.idventa;


--
-- Name: ventadetalle; Type: TABLE; Schema: public; Owner: smartx
--

CREATE TABLE public.ventadetalle (
    idventa integer NOT NULL,
    idproducto integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE public.ventadetalle OWNER TO smartx;

--
-- Name: categoria idcategoria; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.categoria ALTER COLUMN idcategoria SET DEFAULT nextval('public.categoria_idcategoria_seq'::regclass);


--
-- Name: cupon idcupon; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.cupon ALTER COLUMN idcupon SET DEFAULT nextval('public.cupon_idcupon_seq'::regclass);


--
-- Name: direccion iddireccion; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.direccion ALTER COLUMN iddireccion SET DEFAULT nextval('public.direccion_iddireccion_seq'::regclass);


--
-- Name: inventario idinventario; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.inventario ALTER COLUMN idinventario SET DEFAULT nextval('public.inventario_idinventario_seq'::regclass);


--
-- Name: marca idmarca; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca ALTER COLUMN idmarca SET DEFAULT nextval('public.marca_idmarca_seq'::regclass);


--
-- Name: metodopago idmetodo; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.metodopago ALTER COLUMN idmetodo SET DEFAULT nextval('public.metodopago_idmetodo_seq'::regclass);


--
-- Name: precioproducto idprecio; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.precioproducto ALTER COLUMN idprecio SET DEFAULT nextval('public.precioproducto_idprecio_seq'::regclass);


--
-- Name: producto idproducto; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.producto ALTER COLUMN idproducto SET DEFAULT nextval('public.producto_idproducto_seq'::regclass);


--
-- Name: proveedor idproveedor; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.proveedor ALTER COLUMN idproveedor SET DEFAULT nextval('public.proveedor_idproveedor_seq'::regclass);


--
-- Name: tipousuario idtipou; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.tipousuario ALTER COLUMN idtipou SET DEFAULT nextval('public.tipousuario_idtipou_seq'::regclass);


--
-- Name: usuario idusuario; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);


--
-- Name: venta idventa; Type: DEFAULT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.venta ALTER COLUMN idventa SET DEFAULT nextval('public.venta_idventa_seq'::regclass);


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.categoria (idcategoria, categoria) FROM stdin;
1	Gama Alta
2	Gama Media
3	Gama Baja
\.


--
-- Data for Name: cupon; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.cupon (idcupon, cupon, descuento, descripcion) FROM stdin;
1	c4ca4238a0b923820dcc509a6f75849b	0.0000	Sin descuento
\.


--
-- Data for Name: direccion; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.direccion (iddireccion, direccion, descripcion, lat, lng, idusuario) FROM stdin;
\.


--
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.inventario (idinventario, fecha) FROM stdin;
1	2018-11-23
\.


--
-- Data for Name: inventariodetalle; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.inventariodetalle (idinventario, idproducto, cantidad) FROM stdin;
1	1	931442
1	2	366487
1	3	62333
1	4	879234
1	5	494803
1	6	289767
1	7	8153
1	8	434212
1	9	361235
1	10	989618
1	11	980111
1	12	524995
1	13	677565
1	14	724824
1	15	723994
1	16	64600
1	17	137021
1	18	416353
1	19	265716
1	20	5192
1	21	319993
1	22	65479
1	23	6620
1	24	853832
1	25	49627
1	26	919674
1	27	493802
1	28	202823
1	29	596135
1	30	694940
1	31	690165
1	32	527577
1	33	61428
1	34	752499
1	35	406812
1	36	556231
1	37	42266
1	38	414965
1	39	990444
1	40	403502
1	41	404583
1	42	970555
1	43	928497
1	44	82148
1	45	695380
1	46	652492
1	47	146749
1	48	832401
1	49	68846
\.


--
-- Data for Name: marca; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.marca (idmarca, marca, idproveedor) FROM stdin;
1	MI	1
2	RedMi	1
3	Moto Z	2
4	Moto X	2
5	Moto G	2
6	Moto E	2
7	Moto C	2
8	Galaxy S	3
9	Galaxy J	3
10	Galaxy A	3
11	Galaxy Note	3
12	Galaxy Grand Prime	3
13	Galaxy Ace	3
14	LG Q	4
15	LG G	4
16	LG K	4
17	LG V	4
18	Alcatel 1	5
19	Alcatel 3	5
20	Alcatel 5	5
21	Alcatel IDOL	5
22	Alcatel A	5
23	Alcatel U	5
24	Xperia XZ	6
25	Xperia XA	6
26	Xperia L	6
27	Xperia E	6
28	Xperia X	6
29	Xperia C	6
30	iPhone 6	7
31	iPhone 7	7
32	iPhone 8	7
33	iPhone X	7
34	Nokia 1	8
35	Nokia 2	8
36	Nokia 3	8
37	Nokia 5	8
38	Nokia 6	8
39	Nokia 8	8
40	Ilium Alpha	9
41	Ilium M	9
42	Ilium L	9
43	ZTE Blade V	10
44	ZTE Blade A	10
45	ZTE Blade L	10
46	Huawei Mate	11
47	Huawei Nova	11
48	Huawei P	11
49	Huawei Y	11
\.


--
-- Data for Name: marca_categoria; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.marca_categoria (idmarca, idcategoria) FROM stdin;
1	1
2	2
3	1
4	1
5	1
6	2
7	3
8	1
9	1
10	1
11	1
12	1
13	3
14	1
15	1
16	1
17	2
18	1
19	1
20	1
21	2
22	3
23	3
24	1
25	1
26	1
27	2
28	2
29	3
30	1
31	1
32	1
33	1
34	3
35	3
36	2
37	1
38	1
39	1
40	1
41	1
42	1
43	1
44	1
45	2
46	1
47	1
48	1
49	2
\.


--
-- Data for Name: metodopago; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.metodopago (idmetodo, pago) FROM stdin;
1	Cash On Delivery
2	Debit Card
3	Credit Card
4	Depósito
5	PayPal
\.


--
-- Data for Name: precioproducto; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.precioproducto (idprecio, idproducto, fecha, precioventa, preciocompra) FROM stdin;
1	1	2018-11-23	4456.00	4191.00
2	2	2018-11-23	4587.00	8832.00
3	3	2018-11-23	5443.00	6118.00
4	4	2018-11-23	5193.00	1606.00
5	5	2018-11-23	5609.00	3870.00
6	6	2018-11-23	7292.00	4906.00
7	7	2018-11-23	10785.00	2532.00
8	8	2018-11-23	9371.00	7363.00
9	9	2018-11-23	5986.00	7831.00
10	10	2018-11-23	8738.00	8543.00
11	11	2018-11-23	11940.00	4749.00
12	12	2018-11-23	7664.00	1919.00
13	13	2018-11-23	10307.00	6743.00
14	14	2018-11-23	10276.00	6418.00
15	15	2018-11-23	7351.00	5685.00
16	16	2018-11-23	10226.00	4807.00
17	17	2018-11-23	11877.00	7814.00
18	18	2018-11-23	7640.00	2320.00
19	19	2018-11-23	7932.00	5833.00
20	20	2018-11-23	5926.00	6542.00
21	21	2018-11-23	11703.00	6219.00
22	22	2018-11-23	5449.00	7488.00
23	23	2018-11-23	10752.00	7820.00
24	24	2018-11-23	8851.00	1738.00
25	25	2018-11-23	9651.00	2590.00
26	26	2018-11-23	4281.00	6592.00
27	27	2018-11-23	9339.00	4946.00
28	28	2018-11-23	10512.00	4647.00
29	29	2018-11-23	5690.00	5789.00
30	30	2018-11-23	5066.00	6041.00
31	31	2018-11-23	5475.00	8293.00
32	32	2018-11-23	4849.00	2352.00
33	33	2018-11-23	10107.00	5489.00
34	34	2018-11-23	6673.00	3039.00
35	35	2018-11-23	5322.00	5599.00
36	36	2018-11-23	11582.00	2026.00
37	37	2018-11-23	5819.00	2031.00
38	38	2018-11-23	11515.00	1571.00
39	39	2018-11-23	11851.00	5367.00
40	40	2018-11-23	5310.00	6503.00
41	41	2018-11-23	9957.00	2591.00
42	42	2018-11-23	7096.00	4297.00
43	43	2018-11-23	9538.00	2608.00
44	44	2018-11-23	10945.00	8229.00
45	45	2018-11-23	10398.00	1011.00
46	46	2018-11-23	8270.00	8873.00
47	47	2018-11-23	11304.00	6119.00
48	48	2018-11-23	5225.00	6411.00
49	49	2018-11-23	5609.00	4898.00
50	55	2018-11-30	3000.00	2000.00
\.


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.producto (idproducto, producto, codigo, descripcion, imagen, idmarca) FROM stdin;
36	iPhone 7	750977200379		https://store.storeimages.cdn-apple.com/4981/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone7/plus/iphone7-plus-rosegold-select-2016?wid=513&hei=556&fmt=jpeg&qlt=95&op_usm=0.5	31
21	LG K11+	750977200229		https://img.mobileunlock24.com/5899-thickbox_default/desbloquear-lg-k11-plus.jpg	16
7	Moto Z3	750977200079		https://mxmoto.vteximg.com.br/arquivos/ids/157437-1000-1000/MotoZ3Play---Deep-Indigo---Combo.png?v=636638232371900000	3
10	Moto G6	750977200119		https://www.motorola.com/sites/default/files/library/us/products/moto-g-gen-6/moto-g6-black-na-1000%20%281%29.jpg	5
22	LG V35 ThinQ	750977200239		https://icdn2.digitaltrends.com/image/lg-v35-thinq-prod-720x720.png	17
32	Xperia E5	750977200339		https://api.sonymobile.com/files/xperia-E5-White-product-shot-2000x2000-51d3209aa83de3c70ad50d571f10d5d6.png	27
19	LG Q7+	750977200209		https://www.google.com/search?q=LG+Q7%2B&client=ubuntu&hs=Leg&channel=fs&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjZ5oCfooDfAhWKyoMKHU45A6EQ_AUIDigB&biw=1366&bih=626#imgrc=REktGuqYllIUmM:	14
2	MI MAX 3	750977200029		https://li1.rightinthebox.com/images/384x384/201807/myholh1532056886391.jpg	1
16	Galaxy Note 9	750977200179		https://hniesfp.imgix.net/8/images/detailed/136/samsng_note_9_blue_1.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format	11
33	Xperia X Compact	750977200349		https://api.sonymobile.com/files/xperia-X-Compact-Blue-product-shot-2000x2000-f1ea080764f9f1209941e9fbdb452080.png	28
17	Galaxy Grand Prime Plus	750977200189		https://cellucity.co.za/wp-content/uploads/2017/10/Samsung-Galaxy-Grand-Prime-Plus-b.jpg	12
45	Lanix Ilium Alpha 9	750977200469		https://i.blogs.es/0628da/1366_2000-1/450_1000.jpg	40
6	Moto Z2	750977200069		https://www.walmart.com.mx/images/products/img_large/00085369910282l.jpg	3
26	Alcatel IDOL 5S	750977200279		https://d2giyh01gjb6fi.cloudfront.net/default/0001/63/thumb_62377_default_big.jpeg	21
54	Huawei Y9	750977200559		https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/y9-2018/img/pic_s14-quality-image-original.jpg	49
20	LG G7 ThinQ	750977200219		https://www.csmobiles.com/WebRoot/StoreES3/Shops/78317249/5B29/6D61/A709/F0D9/1E43/0A0C/6D00/248B/lg-g7-thinq-leak-black_ml.jpg	15
3	Redmi Note 6 Pro	750977200039		https://www.powerplanetonline.com/cdnassets/xiaomi_redmi_note_6_pro_01_negro_ad_l.jpg	2
39	Nokia 1	750977200409		https://images.ctfassets.net/wcfotm6rrl7u/5uZBthmOY0I4e6gcGeiwcw/978dcb88ebf05c2f6ca8d96d9303240d/nokia_1-details-blue.png?fm=jpg&fl=progressive&bg=rgb:FFFFFF&q=60	34
52	Huawei Nova 3	750977200539		https://www.sanborns.com.mx/imagenes-sanborns-ii/1200/2005669335003.jpg	47
4	Redmi Note 6 Pro	750977200049		https://www.powerplanetonline.com/cdnassets/xiaomi_redmi_note_6_pro_01_negro_ad_l.jpg	2
35	iPhone 6	750977200369		https://staticshop.o2.co.uk/product/images/apple-iphone-6-space-grey-ios-10-sku-header.png?cb=79a7d32bdeb734b6426981fd2342e0c5	30
15	Galaxy A9	750977200169		https://images.samsung.com/is/image/samsung/es-galaxy-a9-a920-sm-a920fzbdphe-backvitalityblue-123157117?$PD_GALLERY_L_JPG$	10
43	Nokia 6.1	750977200449		https://static.spdigital.cl/img/products/nokia-6-2018-4gb-64gb-black.jpg	38
5	Redmi 6 pro	750977200059		https://image2.geekbuying.com/ggo_pic/2018-06-25/Xiaomi-Redmi-6-Pro-5-84-Inch-4GB-64GB-Smartphone-Blue-677537-.jpg	2
1	MI 8	750977200019		https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQovbVh167GuadwWb9iKCHzzzkzWcDcyRiFvBHdnTQcIzWrc7s&usqp=CAY	1
40	Nokia 2.1	750977200419		https://d2giyh01gjb6fi.cloudfront.net/default/0002/43/thumb_142271_default_big.jpeg	35
9	Moto X2 Force	750977200109		https://www.motorola.com/sites/default/files/library/storage/products/smartphones/moto-z2-force-NA-blk-1000.png	4
18	Galaxy Ace 4	750977200199		https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/main_card_image/https/bdt.computerhoy.com/sites/default/files/Galaxy-Ace-4.png?itok=p6TOCV8L	13
38	iPhone X	750977200399		http://1546046097.rsc.cdn77.org/1584-large_default/iphone-x.jpg	33
24	Alcatel 3X	750977200259		https://eu.alcatelmobile.com/media/catalog/product/cache/6/image/600x600/9df78eab33525d08d6e5fb8d27136e95/a/l/alcatel-3x_mobile_duo-min.png	19
13	Galaxy S9+	750977200149		https://www.csmobiles.com/WebRoot/StoreES3/Shops/78317249/5AB4/EC0C/7822/58BD/B3AC/0A0C/6D00/7D6F/samsung_galaxy_s9_plus_phone_template_2048x_ml.jpg	8
55	Moto E3	3333333333333	Primer Descripción	https://www.maxmovil.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/m/o/motorola_moto_e3_libre.jpg	6
12	Moto C Plus	750977200139		https://http2.mlstatic.com/celular-motorola-moto-c-plus-16gb-dual-sim-xt1724-sellado-D_NQ_NP_664042-MLM26532515119_122017-F.jpg	7
11	Moto E5	750977200129		https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/7/2/723755120662-8.jpg	6
14	Galaxy J4+	750977200159		https://cdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-j4-plus-sm-j415f-1.jpg	9
41	Nokia 3.1	750977200429		https://cf3.s3.souqcdn.com/item/2018/07/08/36/39/61/50/item_XL_36396150_142958673.jpg	36
50	ZTE Blade L7	750977200519		https://res.cloudinary.com/tugadgetshop/image/upload/w_350	45
42	Nokia 5.1	750977200439		https://image.coolblue.nl/422x390/products/1104474	37
46	Lanix Ilium M9	750977200479		https://lanix.com/img/galeria/5b84497d6b837.png	41
31	Xperia L2	750977200329		https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/7/3/7311271611257-1.jpg	26
44	Nokia 8	750977200459		https://images.ctfassets.net/wcfotm6rrl7u/H4mXFOvx4Y8YUCiK4GYye/d74b9c7cf098a085c826f5cf0d7e3321/nokia_8-details-blue_polished.png?fm=jpg&fl=progressive&bg=rgb:FFFFFF&q=60	39
37	iPhone 8	750977200389		https://store.storeimages.cdn-apple.com/4667/as-images.apple.com/is/image/AppleInc/aos/published/images/i/ph/iphone8/plus/iphone8-plus-gold-select-2018?wid=513&hei=556&fmt=jpeg&qlt=95&op_usm=0.5	32
27	Alcatel A7 XL	750977200289		https://drop.ndtv.com/TECH/product_database/images/942017120939PM_635_alcatela7xl_db.jpeg	22
25	Alcatel 5V	750977200269		https://eu.alcatelmobile.com/media/catalog/product/cache/6/image/600x600/9df78eab33525d08d6e5fb8d27136e95/a/l/alcatel-5v_packshot_duo_black-min.png	20
29	Xperia XZ2	750977200309		https://api.sonymobile.com/files/xperia-XZ2-silver-product-shot-2000x2000-5c3cb53f4777b7540e4f9bc7193d2a9c.png	24
28	Alcatel U5 HD	750977200299		https://www.notebookcheck.org/uploads/tx_nbc2/Alcatel-U5-HD.jpg	23
47	Lanix Ilium L1400	750977200489		https://http2.mlstatic.com/lanix-ilium-l1400-8core-64-3gb-138-20mpx-D_NQ_NP_789644-MCO26757965835_022018-F.jpg	42
23	Alcatel 1X	750977200249		https://eu.alcatelmobile.com/media/catalog/product/cache/6/image/600x600/9df78eab33525d08d6e5fb8d27136e95/a/l/alcatel-1x_mobile_duo-min.png	18
48	ZTE Blade V9 Vita	750977200499		https://www.planetofmobile.com/wp-content/uploads/2018/02/ZTE-Blade-V9-Vita-500x500.jpg	43
30	Xperia XA2	750977200319		https://api.sonymobile.com/files/xperia-XA2-silver-product-shot-2000x2000-7777646d08a5304535633766a47b2128.png	25
8	Moto X	750977200089		https://www.movilzona.es/app/uploads/2013/08/motorola-moto-x-1-650x520.jpg	4
51	Huawei Mate 20 Pro	750977200529		https://www.tuexpertomovil.com/wp-content/uploads/2018/11/comparativa-huawei-mate-20-pro-vs-huawei-p20-pro-02.jpg	46
53	Huawei P20 Pro	750977200549		http://www.csmobiles.com/WebRoot/StoreES3/Shops/78317249/5B29/52A6/315F/7BD9/6DE5/0A0C/6D0A/3A22/huawei-p20-pro-twilight-front-and-back.jpg	48
34	Xperia C4	750977200359		https://api.sonymobile.com/files/xperia-C4-white-product-shot-2000x2000-5c4254effd14697467268ee1ab71c77e.png	29
49	ZTE Blade A530	750977200509		https://cdn2.gsmarena.com/vv/pics/zte/zte-a520.jpg	44
\.


--
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.proveedor (idproveedor, proveedor, rfc) FROM stdin;
1	Xiaomi	516581a2ce920
2	Lenovo	57040fe2fe7a0
3	Samsung	3910b1e0ccab1
4	LG Electronics	11be2fa331de7
5	Alcatel Mobile	777f31bda9156
6	Sony	2da860f7216f3
7	Apple	9f6290f4436e5
8	Nokia	49f17151a1bc1
9	Lanix	970fdde742e7e
10	Zhong Xing Telecommunication Equipment Company Limited	12e0e89757cf7
11	Huawei Technologies Co.	59bc15af81399
\.


--
-- Data for Name: tipousuario; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.tipousuario (idtipou, tipou) FROM stdin;
1	Administrador
2	Cliente
\.


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.tokens (token, idusuario, fecha) FROM stdin;
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.usuario (idusuario, nombre, apellidos, correo, numtel, foto, idtipou) FROM stdin;
1	alan	alvarez	15030093@itcelaya.edu.mx	4612223796	''	2
\.


--
-- Data for Name: usuario_proveedor; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.usuario_proveedor (idusuario, idproveedor) FROM stdin;
\.


--
-- Data for Name: venta; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.venta (idventa, idusuario, fecha, idmetodo, idcupon) FROM stdin;
1	1	2018-12-01 22:20:56.193	1	1
2	1	2018-12-01 22:21:13.082	1	1
3	1	2018-12-02 22:27:20.686	1	1
\.


--
-- Data for Name: ventadetalle; Type: TABLE DATA; Schema: public; Owner: smartx
--

COPY public.ventadetalle (idventa, idproducto, cantidad) FROM stdin;
1	1	2
1	2	3
3	1	10
3	2	10
\.


--
-- Name: categoria_idcategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.categoria_idcategoria_seq', 3, true);


--
-- Name: cupon_idcupon_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.cupon_idcupon_seq', 1, true);


--
-- Name: direccion_iddireccion_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.direccion_iddireccion_seq', 1, false);


--
-- Name: inventario_idinventario_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.inventario_idinventario_seq', 1, true);


--
-- Name: marca_idmarca_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.marca_idmarca_seq', 49, true);


--
-- Name: metodopago_idmetodo_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.metodopago_idmetodo_seq', 5, true);


--
-- Name: precioproducto_idprecio_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.precioproducto_idprecio_seq', 50, true);


--
-- Name: producto_idproducto_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.producto_idproducto_seq', 55, true);


--
-- Name: proveedor_idproveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.proveedor_idproveedor_seq', 11, true);


--
-- Name: tipousuario_idtipou_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.tipousuario_idtipou_seq', 2, true);


--
-- Name: usuario_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.usuario_idusuario_seq', 1, true);


--
-- Name: venta_idventa_seq; Type: SEQUENCE SET; Schema: public; Owner: smartx
--

SELECT pg_catalog.setval('public.venta_idventa_seq', 3, true);


--
-- Name: categoria categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (idcategoria);


--
-- Name: cupon cupon_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.cupon
    ADD CONSTRAINT cupon_pkey PRIMARY KEY (idcupon);


--
-- Name: direccion direccion_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT direccion_pkey PRIMARY KEY (iddireccion);


--
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (idinventario);


--
-- Name: inventariodetalle inventariodetalle_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.inventariodetalle
    ADD CONSTRAINT inventariodetalle_pkey PRIMARY KEY (idinventario, idproducto);


--
-- Name: marca_categoria marca_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca_categoria
    ADD CONSTRAINT marca_categoria_pkey PRIMARY KEY (idmarca, idcategoria);


--
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (idmarca);


--
-- Name: metodopago metodopago_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.metodopago
    ADD CONSTRAINT metodopago_pkey PRIMARY KEY (idmetodo);


--
-- Name: precioproducto precioproducto_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.precioproducto
    ADD CONSTRAINT precioproducto_pkey PRIMARY KEY (idprecio);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (idproducto);


--
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (idproveedor);


--
-- Name: tipousuario tipousuario_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.tipousuario
    ADD CONSTRAINT tipousuario_pkey PRIMARY KEY (idtipou);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (token, idusuario);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);


--
-- Name: usuario_proveedor usuario_proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario_proveedor
    ADD CONSTRAINT usuario_proveedor_pkey PRIMARY KEY (idusuario, idproveedor);


--
-- Name: venta venta_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_pkey PRIMARY KEY (idventa);


--
-- Name: ventadetalle ventadetalle_pkey; Type: CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.ventadetalle
    ADD CONSTRAINT ventadetalle_pkey PRIMARY KEY (idventa, idproducto);


--
-- Name: direccion direccion_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT direccion_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventariodetalle inventariodetalle_idinventario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.inventariodetalle
    ADD CONSTRAINT inventariodetalle_idinventario_fkey FOREIGN KEY (idinventario) REFERENCES public.inventario(idinventario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventariodetalle inventariodetalle_idproducto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.inventariodetalle
    ADD CONSTRAINT inventariodetalle_idproducto_fkey FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: marca_categoria marca_categoria_idcategoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca_categoria
    ADD CONSTRAINT marca_categoria_idcategoria_fkey FOREIGN KEY (idcategoria) REFERENCES public.categoria(idcategoria) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: marca_categoria marca_categoria_idmarca_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca_categoria
    ADD CONSTRAINT marca_categoria_idmarca_fkey FOREIGN KEY (idmarca) REFERENCES public.marca(idmarca) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: marca marca_idproveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_idproveedor_fkey FOREIGN KEY (idproveedor) REFERENCES public.proveedor(idproveedor) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: precioproducto precioproducto_idproducto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.precioproducto
    ADD CONSTRAINT precioproducto_idproducto_fkey FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: producto producto_idmarca_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_idmarca_fkey FOREIGN KEY (idmarca) REFERENCES public.marca(idmarca) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tokens tokens_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: usuario usuario_idtipou_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_idtipou_fkey FOREIGN KEY (idtipou) REFERENCES public.tipousuario(idtipou) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: usuario_proveedor usuario_proveedor_idproveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario_proveedor
    ADD CONSTRAINT usuario_proveedor_idproveedor_fkey FOREIGN KEY (idproveedor) REFERENCES public.proveedor(idproveedor) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: usuario_proveedor usuario_proveedor_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.usuario_proveedor
    ADD CONSTRAINT usuario_proveedor_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venta venta_idcupon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_idcupon_fkey FOREIGN KEY (idcupon) REFERENCES public.cupon(idcupon) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venta venta_idmetodo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_idmetodo_fkey FOREIGN KEY (idmetodo) REFERENCES public.metodopago(idmetodo) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: venta venta_idusuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.venta
    ADD CONSTRAINT venta_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES public.usuario(idusuario) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ventadetalle ventadetalle_idproducto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.ventadetalle
    ADD CONSTRAINT ventadetalle_idproducto_fkey FOREIGN KEY (idproducto) REFERENCES public.producto(idproducto) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ventadetalle ventadetalle_idventa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: smartx
--

ALTER TABLE ONLY public.ventadetalle
    ADD CONSTRAINT ventadetalle_idventa_fkey FOREIGN KEY (idventa) REFERENCES public.venta(idventa) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

