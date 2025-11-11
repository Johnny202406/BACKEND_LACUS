DROP TABLE IF EXISTS "public"."migrations";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS migrations_id_seq;

-- Table Definition
CREATE TABLE "public"."migrations" (
    "id" int4 NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "timestamp" int8 NOT NULL,
    "name" varchar NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_8c82d7f526340ab734260ea46be" ON public.migrations USING btree (id);

DROP TABLE IF EXISTS "public"."tarifa_cobertura";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tarifa_cobertura_id_seq;

-- Table Definition
CREATE TABLE "public"."tarifa_cobertura" (
    "id" int4 NOT NULL DEFAULT nextval('tarifa_cobertura_id_seq'::regclass),
    "direccion" varchar(255) NOT NULL,
    "punto_direccion" point NOT NULL,
    "centro_cobertura" point NOT NULL,
    "radio_cobertura" float8 NOT NULL DEFAULT 0,
    "tarifa_kg_km" numeric(10,2) NOT NULL DEFAULT 0,
    "tarifa_minima" numeric(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_9fc2100ba22cd6ddc98219325d8" ON public.tarifa_cobertura USING btree (id);
CREATE UNIQUE INDEX "UQ_c7885e73675499822233eca964f" ON public.tarifa_cobertura USING btree (direccion);

DROP TABLE IF EXISTS "public"."publicacion";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS publicacion_id_seq;

-- Table Definition
CREATE TABLE "public"."publicacion" (
    "id" int4 NOT NULL DEFAULT nextval('publicacion_id_seq'::regclass),
    "titulo" varchar(100) NOT NULL,
    "url_redireccion" varchar(500),
    "public_id" varchar(255) NOT NULL,
    "secure_url" varchar(500) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_c14e747a7cc735a880bfbf58a70" ON public.publicacion USING btree (id);
CREATE UNIQUE INDEX "UQ_aa1fd629500eeb2a31dac5afeb9" ON public.publicacion USING btree (titulo);

DROP TABLE IF EXISTS "public"."producto";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS producto_id_seq;

-- Table Definition
CREATE TABLE "public"."producto" (
    "id" int4 NOT NULL DEFAULT nextval('producto_id_seq'::regclass),
    "codigo" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "nombre" varchar(255) NOT NULL,
    "descripcion" varchar(1000) DEFAULT 'Descripción...'::character varying,
    "peso_kg" float8 NOT NULL DEFAULT 0,
    "precio" float8 NOT NULL DEFAULT 0,
    "habilitado" bool NOT NULL DEFAULT true,
    "porcentaje_descuento" int4 NOT NULL DEFAULT 0,
    "id_categoria" int4 NOT NULL,
    "id_marca" int4 NOT NULL,
    CONSTRAINT "FK_e87a319f3da1b6da5fedd1988be" FOREIGN KEY ("id_categoria") REFERENCES "public"."categoria"("id"),
    CONSTRAINT "FK_116783c6bfbff483096740514be" FOREIGN KEY ("id_marca") REFERENCES "public"."marca"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_5be023b11909fe103e24c740c7d" ON public.producto USING btree (id);
CREATE UNIQUE INDEX "UQ_4ecaa777d3efc10b5a6327cfe42" ON public.producto USING btree (codigo);
CREATE UNIQUE INDEX "UQ_d86d179360134b4b74bda750664" ON public.producto USING btree (nombre);

DROP TABLE IF EXISTS "public"."detalle_entrada";
-- Table Definition
CREATE TABLE "public"."detalle_entrada" (
    "id" int4 NOT NULL,
    "cantidad" int4 NOT NULL DEFAULT 1,
    "id_producto" int4 NOT NULL,
    "id_entrada" int4 NOT NULL,
    CONSTRAINT "FK_1d93107ced3fd1adccfa23c36a6" FOREIGN KEY ("id_producto") REFERENCES "public"."producto"("id"),
    CONSTRAINT "FK_fad935e888d5f0da154fe93cbe1" FOREIGN KEY ("id_entrada") REFERENCES "public"."entrada"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_0c8bed66d22aca213f510ff0631" ON public.detalle_entrada USING btree (id);

DROP TABLE IF EXISTS "public"."tipo_comprobante";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tipo_comprobante_id_seq;

-- Table Definition
CREATE TABLE "public"."tipo_comprobante" (
    "id" int4 NOT NULL DEFAULT nextval('tipo_comprobante_id_seq'::regclass),
    "nombre" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_cbe299324a18b424d39c8beb50e" ON public.tipo_comprobante USING btree (id);
CREATE UNIQUE INDEX "UQ_e0a7c5714e7c21bdcc2fd41f8ea" ON public.tipo_comprobante USING btree (nombre);

DROP TABLE IF EXISTS "public"."estado_pedido";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS estado_pedido_id_seq;

-- Table Definition
CREATE TABLE "public"."estado_pedido" (
    "id" int4 NOT NULL DEFAULT nextval('estado_pedido_id_seq'::regclass),
    "nombre" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_322a39d3ad3ad13b3f3213e0f65" ON public.estado_pedido USING btree (id);
CREATE UNIQUE INDEX "UQ_94048f70d377eb9f8ecc54e0150" ON public.estado_pedido USING btree (nombre);

DROP TABLE IF EXISTS "public"."tipo_entrega";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tipo_entrega_id_seq;

-- Table Definition
CREATE TABLE "public"."tipo_entrega" (
    "id" int4 NOT NULL DEFAULT nextval('tipo_entrega_id_seq'::regclass),
    "nombre" varchar(50) NOT NULL DEFAULT 'Sin nombre'::character varying,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_063242db51d8b72b07fab8157ee" ON public.tipo_entrega USING btree (id);
CREATE UNIQUE INDEX "UQ_1af5fddf6fbeee8f36f9029875e" ON public.tipo_entrega USING btree (nombre);

DROP TABLE IF EXISTS "public"."metodo_pago";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS metodo_pago_id_seq;

-- Table Definition
CREATE TABLE "public"."metodo_pago" (
    "id" int4 NOT NULL DEFAULT nextval('metodo_pago_id_seq'::regclass),
    "nombre" varchar(50) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_a7bf4e34ece4c63524bbe79aa5d" ON public.metodo_pago USING btree (id);
CREATE UNIQUE INDEX "UQ_bbda210e1d462da3bff07460481" ON public.metodo_pago USING btree (nombre);

DROP TABLE IF EXISTS "public"."usuario";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS usuario_id_seq;

-- Table Definition
CREATE TABLE "public"."usuario" (
    "id" int4 NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    "sub" varchar(36) NOT NULL,
    "nombre" varchar(100),
    "apellido" varchar(100),
    "dni" varchar(15),
    "numero" varchar(20),
    "correo" varchar(255) NOT NULL,
    "habilitado" bool NOT NULL DEFAULT true,
    "id_tipo_usuario" int4 NOT NULL,
    CONSTRAINT "FK_1961b44873a11fcc9640c381834" FOREIGN KEY ("id_tipo_usuario") REFERENCES "public"."tipo_usuario"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_a56c58e5cabaa04fb2c98d2d7e2" ON public.usuario USING btree (id);
CREATE UNIQUE INDEX "UQ_914d5e28c0c37219af0a6911f0f" ON public.usuario USING btree (sub);
CREATE UNIQUE INDEX "UQ_349ecb64acc4355db443ca17cbd" ON public.usuario USING btree (correo);

DROP TABLE IF EXISTS "public"."detalle_pedido";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS detalle_pedido_id_seq;

-- Table Definition
CREATE TABLE "public"."detalle_pedido" (
    "id" int4 NOT NULL DEFAULT nextval('detalle_pedido_id_seq'::regclass),
    "precio" numeric(10,2) NOT NULL,
    "cantidad" int4 NOT NULL DEFAULT 1,
    "subtotal" numeric(10,2) NOT NULL,
    "id_producto" int4 NOT NULL,
    "id_pedido" int4 NOT NULL,
    CONSTRAINT "FK_1e7d99f4f8c18bbcd15fc0fbe9b" FOREIGN KEY ("id_producto") REFERENCES "public"."producto"("id"),
    CONSTRAINT "FK_358afcceb14c2f910d152a3ad2f" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedido"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_123bec7ab52f5db0a11766f87c0" ON public.detalle_pedido USING btree (id);

DROP TABLE IF EXISTS "public"."imagen_producto";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS imagen_producto_id_seq;

-- Table Definition
CREATE TABLE "public"."imagen_producto" (
    "id" int4 NOT NULL DEFAULT nextval('imagen_producto_id_seq'::regclass),
    "public_id" varchar(255) NOT NULL,
    "secure_url" varchar(500) NOT NULL,
    "id_producto" int4 NOT NULL,
    CONSTRAINT "FK_92e5a751988a5d7f5dd638b9ff4" FOREIGN KEY ("id_producto") REFERENCES "public"."producto"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_2a4b89ebcf0161f7b85a19a62c5" ON public.imagen_producto USING btree (id);

DROP TABLE IF EXISTS "public"."categoria";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS categoria_id_seq;

-- Table Definition
CREATE TABLE "public"."categoria" (
    "id" int4 NOT NULL DEFAULT nextval('categoria_id_seq'::regclass),
    "nombre" varchar(100) NOT NULL,
    "habilitado" bool NOT NULL DEFAULT true,
    "public_id" varchar(255) NOT NULL,
    "secure_url" varchar(500) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_f027836b77b84fb4c3a374dc70d" ON public.categoria USING btree (id);
CREATE UNIQUE INDEX "UQ_6771d90221138c5bf48044fd73d" ON public.categoria USING btree (nombre);

DROP TABLE IF EXISTS "public"."marca";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS marca_id_seq;

-- Table Definition
CREATE TABLE "public"."marca" (
    "id" int4 NOT NULL DEFAULT nextval('marca_id_seq'::regclass),
    "nombre" varchar(100) NOT NULL,
    "habilitado" bool NOT NULL DEFAULT true,
    "public_id" varchar(255) NOT NULL,
    "secure_url" varchar(500) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_d41856ffd597050edc69ea5188d" ON public.marca USING btree (id);
CREATE UNIQUE INDEX "UQ_4e6b4984c6761c6a15daa395fdd" ON public.marca USING btree (nombre);

DROP TABLE IF EXISTS "public"."detalle_carrito";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS detalle_carrito_id_seq;

-- Table Definition
CREATE TABLE "public"."detalle_carrito" (
    "id" int4 NOT NULL DEFAULT nextval('detalle_carrito_id_seq'::regclass),
    "cantidad" int4 NOT NULL DEFAULT 1,
    "id_producto" int4 NOT NULL,
    "id_carrito" int4 NOT NULL,
    CONSTRAINT "FK_1b6e6a50069405b9ca762853dd5" FOREIGN KEY ("id_producto") REFERENCES "public"."producto"("id"),
    CONSTRAINT "FK_6de25637302f36d153e4b80af47" FOREIGN KEY ("id_carrito") REFERENCES "public"."carrito"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_e699fe85a01b009766c7040a149" ON public.detalle_carrito USING btree (id);

DROP TABLE IF EXISTS "public"."carrito";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS carrito_id_seq;

-- Table Definition
CREATE TABLE "public"."carrito" (
    "id" int4 NOT NULL DEFAULT nextval('carrito_id_seq'::regclass),
    "updated_at" timestamp NOT NULL,
    "id_usuario" int4 NOT NULL,
    CONSTRAINT "FK_2f59229fe3184c1a775de06d16c" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_a8af129f65d19017ca8afe737d3" ON public.carrito USING btree (id);
CREATE UNIQUE INDEX "REL_2f59229fe3184c1a775de06d16" ON public.carrito USING btree (id_usuario);

DROP TABLE IF EXISTS "public"."tipo_usuario";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS tipo_usuario_id_seq;

-- Table Definition
CREATE TABLE "public"."tipo_usuario" (
    "id" int4 NOT NULL DEFAULT nextval('tipo_usuario_id_seq'::regclass),
    "nombre" varchar(100) NOT NULL,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_2abd2759a18236cbf357c06dea0" ON public.tipo_usuario USING btree (id);

DROP TABLE IF EXISTS "public"."entrada";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS entrada_id_seq;

-- Table Definition
CREATE TABLE "public"."entrada" (
    "id" int4 NOT NULL DEFAULT nextval('entrada_id_seq'::regclass),
    "fecha" date NOT NULL,
    "hora" time NOT NULL,
    "habilitado" bool NOT NULL DEFAULT true,
    "total" int4 DEFAULT 0,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_e7a5c037c8d52f966bc70325e5b" ON public.entrada USING btree (id);

DROP TABLE IF EXISTS "public"."comprobante";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comprobante_id_seq;

-- Table Definition
CREATE TABLE "public"."comprobante" (
    "id" int4 NOT NULL DEFAULT nextval('comprobante_id_seq'::regclass),
    "id_tipo_comprobante" int4 NOT NULL,
    "id_pedido" int4 NOT NULL,
    "ruc" varchar(11),
    "razon_social" varchar(255),
    "dni" varchar(8),
    "nombres" varchar(510),
    CONSTRAINT "FK_cc08c305816220c1020b845706c" FOREIGN KEY ("id_tipo_comprobante") REFERENCES "public"."tipo_comprobante"("id"),
    CONSTRAINT "FK_4a9e94f801cb6df4024484f9455" FOREIGN KEY ("id_pedido") REFERENCES "public"."pedido"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_135594a557045b330b999e49491" ON public.comprobante USING btree (id);
CREATE UNIQUE INDEX "REL_4a9e94f801cb6df4024484f945" ON public.comprobante USING btree (id_pedido);

DROP TABLE IF EXISTS "public"."pedido";
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS pedido_id_seq;

-- Table Definition
CREATE TABLE "public"."pedido" (
    "id" int4 NOT NULL DEFAULT nextval('pedido_id_seq'::regclass),
    "codigo" uuid NOT NULL,
    "fecha" date NOT NULL,
    "hora" time NOT NULL,
    "total" numeric(10,2) NOT NULL DEFAULT 0,
    "direccion" point,
    "ultima_fecha" date,
    "id_estado_pedido" int4 NOT NULL,
    "id_tipo_entrega" int4 NOT NULL,
    "id_metodo_pago" int4 NOT NULL,
    "id_usuario" int4 NOT NULL,
    "subtotal" numeric(10,2) NOT NULL DEFAULT '0'::numeric,
    "delivery_costo" numeric(10,2) NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT "FK_8606b56a20e0a912316264801d5" FOREIGN KEY ("id_metodo_pago") REFERENCES "public"."metodo_pago"("id"),
    CONSTRAINT "FK_512f2a53c873366a90180938ee5" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id"),
    CONSTRAINT "FK_7eca733e235d15e61c783039093" FOREIGN KEY ("id_estado_pedido") REFERENCES "public"."estado_pedido"("id"),
    CONSTRAINT "FK_a90f64fa06d462fb4e1faf11653" FOREIGN KEY ("id_tipo_entrega") REFERENCES "public"."tipo_entrega"("id"),
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX "PK_af8d8b3d07fae559c37f56b3f43" ON public.pedido USING btree (id);
CREATE UNIQUE INDEX "UQ_7e1b57613e133690e2089c68e05" ON public.pedido USING btree (codigo);

INSERT INTO "public"."migrations" ("id", "timestamp", "name") VALUES
(1, 1761841912089, 'AutoMigration1761841912089'),
(2, 1761841975878, 'SeedInitialData1761841975878'),
(3, 1761843020852, 'SeedDefaultValue1761843020852'),
(4, 1761951691413, 'AutoMigration1761951691413'),
(5, 1761954410589, 'AutoMigration1761954410589'),
(6, 1762728739205, 'AutoMigration1762728739205'),
(7, 1762810608310, 'AutoMigration1762810608310');

INSERT INTO "public"."publicacion" ("id", "titulo", "url_redireccion", "public_id", "secure_url") VALUES
(1, 'JEFER', 'HTTPS://PHOTOS.GOOGLE.COM/U/0/?HL=ES', 'publication/uvauqiysn48yldzduabz', 'https://res.cloudinary.com/valentine1234/image/upload/v1762873020/publication/uvauqiysn48yldzduabz.webp'),
(2, 'TIENDA', 'HTTPS://WWW.FACEBOOK.COM/LACUSPERU/?LOCALE=ES_LA', 'publication/u9gpnsmoynp3xwj2pmol', 'https://res.cloudinary.com/valentine1234/image/upload/v1762873256/publication/u9gpnsmoynp3xwj2pmol.webp');
INSERT INTO "public"."producto" ("id", "codigo", "nombre", "descripcion", "peso_kg", "precio", "habilitado", "porcentaje_descuento", "id_categoria", "id_marca") VALUES
(2, 'f6e60060-2421-47f0-afc4-4933a72af178', 'REPORDUCTOR CUYES RCUY *50', 'Descripción...', 50, 102, 't', 0, 1, 2),
(3, '37262c4d-0542-43c6-bee1-11dd70822b5a', 'REPORDUCTOR ANTI VIT', 'Descripción...', 50, 110, 't', 10, 1, 2),
(4, '933b008a-f493-4129-be76-fc59c617e821', 'INICIO CRCIMEINTO CUY', 'Descripción...', 50, 120, 't', 0, 1, 2),
(5, 'b81281e8-1aec-43f8-9eb4-5cd2f4505372', 'ENGORDE CUY ECUYMED', 'Descripción...', 50, 100, 't', 5, 1, 2),
(6, 'e2b6a06b-7189-4000-b60d-9a0b64f20c55', 'PRE INICIO POLLOS', 'Descripción...', 50, 100, 't', 0, 2, 6),
(7, 'a9c3675f-3c2b-41b4-9c73-5bd494e9e087', 'INICIO POLLO', 'Descripción...', 50, 115, 't', 0, 2, 6),
(8, 'e488d323-875c-429e-ae18-f4a5c0c8c8db', 'CRECIMINTO POLLO', 'Descripción...', 50, 110, 't', 0, 2, 6),
(9, 'ffc47bc8-84cb-4f42-b642-76663fb8f202', 'ENGORDE POLLO', 'Descripción...', 50, 109, 't', 0, 2, 6),
(10, 'fa570bc6-62b4-47f4-aaf7-2e0bb63568f2', 'PRE-POSTURA GALLINAS PG X 50 KG', 'Descripción...', 50, 105, 't', 0, 2, 6),
(11, '9f793a15-028f-4009-8e56-97bed3aed2ea', 'POSTURA GALLINA', 'Descripción...', 50, 107, 't', 0, 2, 6),
(12, '95704b6e-0b25-4801-8fce-b4d5b4220a7c', 'FASE 1/F1/LECHONES', 'Descripción...', 24, 154, 't', 0, 3, 2),
(13, 'd1827227-a748-477b-a160-ab757d20e7fc', 'INICIO CERDO', 'Descripción...', 50, 119, 't', 0, 3, 2),
(14, '5fb2d46a-6533-4ba3-b2fb-0b462af7f1c4', 'CRECIMIENTO CERDO', 'Descripción...', 50, 110, 't', 0, 3, 6),
(15, 'eb8c06a8-cba4-4d20-9e1d-be8d337bd3f9', 'ENGORDE CERDO', 'Descripción...', 50, 105, 't', 0, 3, 4),
(16, '7833d7db-dde6-440f-81cb-1dc598d82f83', 'GESTANTE CEDO', 'Descripción...', 50, 96, 't', 0, 3, 4),
(17, '10e4832f-e82b-4946-8309-ed77780c8914', 'LACTANCIA CERDO', 'Descripción...', 50, 107, 't', 0, 3, 4),
(18, '8041f55a-d41a-4b59-b3b9-1d297d7fdb03', 'MAIZ ENTERO', 'Descripción...', 50, 88, 't', 0, 4, 7),
(19, '139f283e-54c0-46a0-b42b-f9c71e4a6c1a', 'MAIZ PARTIDO', 'Descripción...', 50, 91, 't', 0, 4, 7),
(20, 'bb441074-0ba9-4d9c-b8bb-e165e86ca360', 'MAIZ REFINADA', 'Descripción...', 50, 91, 't', 0, 4, 7),
(21, '5ef1920f-3d4a-4e36-aab0-a03e25d91076', 'ENGORDE TORO', 'Descripción...', 50, 71, 't', 0, 5, 4),
(22, '2593670f-2baa-4a3d-9043-0f08ab0da709', 'VACAS LECHERAS LECHERINA', 'Descripción...', 50, 105, 't', 0, 5, 8),
(23, 'aa70bc49-67bb-4882-945b-a3cbd904d52f', 'TERNERAS CRECIMIENTO', 'Descripción...', 50, 104, 't', 0, 5, 8),
(24, '34701833-0ec8-4219-b284-70a38f7b2d02', 'INICIO PATO', 'Descripción...', 50, 114, 't', 0, 6, 8),
(25, 'e2b10038-ff59-4410-8af9-70826f741f90', 'CRECIMIENTO PATO', 'Descripción...', 50, 108, 't', 0, 6, 8),
(26, 'b355843f-0821-4905-b39e-a8228fc1bd80', 'INICIO PAVO', 'Descripción...', 50, 128, 't', 0, 6, 8),
(27, 'ce1e589a-6818-453d-a7b1-759d330a33e0', 'CRECIMIENTO PAVO', 'Descripción...', 50, 124, 't', 0, 6, 8),
(28, '949d4d3f-d74d-40c0-bdbd-8f31a2093378', 'ENGORDE PAVO', 'Descripción...', 50, 111, 't', 0, 6, 8),
(29, '4ff9440f-93ca-45e7-a304-3ad29aacf983', 'CRIADOR CRECIMIENTO GALLO DE PELEA', 'Descripción...', 40, 110, 't', 0, 7, 8),
(30, '04ba8723-7723-4333-8669-3e3efe383594', 'GALLO DE PELEA ALLIN', 'Descripción...', 50, 108, 't', 0, 7, 4),
(31, '10f18912-dd59-4b20-b21d-bd13c8b9ec5f', 'CONEJINA B12', 'Descripción...', 40, 107, 't', 0, 8, 8),
(32, '3de2d01c-1678-408d-b301-216d6bc24093', 'CONEPLUS BABY', 'Descripción...', 25, 78, 't', 0, 8, 9),
(33, '11651401-cf84-432f-8b5c-b154e2770ac5', 'CRIADOR CONEJO CORIMIX X 40 KG', 'Descripción...', 40, 102, 't', 0, 8, 10);
INSERT INTO "public"."detalle_entrada" ("id", "cantidad", "id_producto", "id_entrada") VALUES
(1, 7, 5, 1),
(2, 4, 3, 1),
(3, 19, 33, 1),
(4, 15, 32, 1),
(5, 14, 30, 1),
(6, 12, 31, 1),
(7, 12, 19, 1),
(8, 11, 20, 1),
(9, 12, 21, 1),
(10, 13, 23, 1),
(11, 14, 22, 1),
(12, 15, 24, 1),
(13, 16, 25, 1),
(14, 17, 26, 1),
(15, 18, 27, 1),
(16, 18, 29, 1),
(17, 13, 28, 1),
(18, 12, 13, 1),
(19, 11, 14, 1),
(20, 17, 15, 1),
(21, 18, 16, 1),
(22, 19, 17, 1),
(23, 1, 18, 1),
(24, 15, 7, 1),
(25, 12, 8, 1),
(26, 10, 6, 1),
(27, 19, 4, 1);
INSERT INTO "public"."tipo_comprobante" ("id", "nombre") VALUES
(1, 'boleta'),
(2, 'factura'),
(3, 'ticket');
INSERT INTO "public"."estado_pedido" ("id", "nombre") VALUES
(1, 'pagado'),
(2, 'alistado'),
(3, 'en camino'),
(4, 'entregado'),
(5, 'no entregado');
INSERT INTO "public"."tipo_entrega" ("id", "nombre") VALUES
(1, 'tienda'),
(2, 'delivery');
INSERT INTO "public"."metodo_pago" ("id", "nombre") VALUES
(1, 'tarjeta'),
(2, 'yape');
INSERT INTO "public"."usuario" ("id", "sub", "nombre", "apellido", "dni", "numero", "correo", "habilitado", "id_tipo_usuario") VALUES
(1, '102709326430535603042', 'FUNNY', 'VALENTINE', NULL, NULL, 'funnyvalentineofi@gmail.com', 't', 1),
(2, '115149424468422488190', 'JEFERSON', 'J.', NULL, NULL, 'jeferjqc@gmail.com', 't', 2);
INSERT INTO "public"."detalle_pedido" ("id", "precio", "cantidad", "subtotal", "id_producto", "id_pedido") VALUES
(1, 108.00, 1, 108.00, 30, 1),
(2, 107.00, 7, 749.00, 31, 1),
(3, 102.00, 2, 204.00, 33, 1),
(4, 78.00, 1, 78.00, 32, 1);
INSERT INTO "public"."imagen_producto" ("id", "public_id", "secure_url", "id_producto") VALUES
(1, 'product/i4vvhyvvwlvemxkwsuzh', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868593/product/i4vvhyvvwlvemxkwsuzh.webp', 2),
(2, 'product/ynhuuqlfmw5oleujtb8n', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868758/product/ynhuuqlfmw5oleujtb8n.webp', 3),
(3, 'product/thsvgympr4x9wsjhvapz', 'https://res.cloudinary.com/valentine1234/image/upload/v1762868936/product/thsvgympr4x9wsjhvapz.webp', 4),
(4, 'product/qctzh7cqtfcezqmi7trf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869052/product/qctzh7cqtfcezqmi7trf.webp', 5),
(5, 'product/n1sgy80jwswhikkqsrjg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869053/product/n1sgy80jwswhikkqsrjg.webp', 5),
(6, 'product/uapp1uluzgdqn39hio10', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869209/product/uapp1uluzgdqn39hio10.webp', 6),
(7, 'product/gzycazdtl7fwan2ocyfd', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869285/product/gzycazdtl7fwan2ocyfd.webp', 7),
(8, 'product/a0ugd0tlj4l0fzxkdx4i', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869374/product/a0ugd0tlj4l0fzxkdx4i.webp', 8),
(9, 'product/jmcrtzua6of6j9tcdvrv', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869379/product/jmcrtzua6of6j9tcdvrv.webp', 8),
(10, 'product/a6hqggupiybyb9b3bgdw', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869430/product/a6hqggupiybyb9b3bgdw.webp', 9),
(11, 'product/kwrklj5sxt26t5dd82ih', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869433/product/kwrklj5sxt26t5dd82ih.webp', 9),
(12, 'product/ljanvwjxe33sgehhstpc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869515/product/ljanvwjxe33sgehhstpc.webp', 10),
(13, 'product/zu3nyrawfzqlmg72bilm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869515/product/zu3nyrawfzqlmg72bilm.webp', 10),
(14, 'product/qvh1ctc1vvfjvvej4xdo', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869558/product/qvh1ctc1vvfjvvej4xdo.webp', 11),
(15, 'product/wwbgxtf12lzesj6r4z0z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869559/product/wwbgxtf12lzesj6r4z0z.webp', 11),
(16, 'product/l9nz6xqwovxwtoku0oei', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869651/product/l9nz6xqwovxwtoku0oei.webp', 12),
(17, 'product/dzfo1odbwuj9qgukh51f', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869656/product/dzfo1odbwuj9qgukh51f.webp', 12),
(18, 'product/mueef2nv3ya7fbpw4drl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869733/product/mueef2nv3ya7fbpw4drl.webp', 13),
(19, 'product/lv3jwthuh7cnrwn16ae4', 'https://res.cloudinary.com/valentine1234/image/upload/v1762869959/product/lv3jwthuh7cnrwn16ae4.webp', 14),
(20, 'product/bcmqlr9uyefkcasm1qit', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870043/product/bcmqlr9uyefkcasm1qit.webp', 15),
(21, 'product/ieplwuzzyopw558pk4fm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870184/product/ieplwuzzyopw558pk4fm.webp', 16),
(22, 'product/dzqldrbjkvwypm1fgx4z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870237/product/dzqldrbjkvwypm1fgx4z.webp', 17),
(23, 'product/wuonpql2lnk4phvu4ztn', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870490/product/wuonpql2lnk4phvu4ztn.webp', 18),
(24, 'product/i2odawc69hioa2pfbnrs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870596/product/i2odawc69hioa2pfbnrs.webp', 19),
(25, 'product/szlanxl9jn61xehrstaf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870596/product/szlanxl9jn61xehrstaf.webp', 19),
(26, 'product/y9udknm7qzn2iqmfpwzq', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870667/product/y9udknm7qzn2iqmfpwzq.webp', 20),
(27, 'product/oh1rqdjwa1f0pfwmkbcw', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870671/product/oh1rqdjwa1f0pfwmkbcw.webp', 20),
(28, 'product/w1mcks2pyxsnyqxtcj7t', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870833/product/w1mcks2pyxsnyqxtcj7t.webp', 21),
(29, 'product/dc7gbdo4wr03f6lxzjgs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870833/product/dc7gbdo4wr03f6lxzjgs.webp', 21),
(30, 'product/fjlt3cjzh70ekvn8ljsx', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871129/product/fjlt3cjzh70ekvn8ljsx.webp', 23),
(31, 'product/fzyyld2nzmkzt0sehukn', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871132/product/fzyyld2nzmkzt0sehukn.webp', 23),
(32, 'product/kk66pd6rgdh0xhhbygh1', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871256/product/kk66pd6rgdh0xhhbygh1.webp', 24),
(33, 'product/c2vrkpfvj9ahjrj1xhqm', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871334/product/c2vrkpfvj9ahjrj1xhqm.webp', 25),
(34, 'product/ce2sziwxjdsiihhuq6ck', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871414/product/ce2sziwxjdsiihhuq6ck.webp', 26),
(35, 'product/k6px40xc1ya70h7jhvp5', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871578/product/k6px40xc1ya70h7jhvp5.webp', 27),
(36, 'product/tyk6fvehi8mblyqsixgs', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871646/product/tyk6fvehi8mblyqsixgs.webp', 28),
(37, 'product/epvbjpqgktlvattb3ai6', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871743/product/epvbjpqgktlvattb3ai6.webp', 29),
(38, 'product/njtiyw86qlb4cswwhvur', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871773/product/njtiyw86qlb4cswwhvur.webp', 29),
(39, 'product/h6yf0qfupurepvn36e6s', 'https://res.cloudinary.com/valentine1234/image/upload/v1762871935/product/h6yf0qfupurepvn36e6s.webp', 30),
(40, 'product/ftqwijjtmxw3tas0exzb', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872082/product/ftqwijjtmxw3tas0exzb.webp', 31),
(41, 'product/al5yecyl1kpt2xv4ut8z', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872251/product/al5yecyl1kpt2xv4ut8z.webp', 32),
(42, 'product/evgbp8eoleizss6u0zlc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872518/product/evgbp8eoleizss6u0zlc.webp', 33),
(43, 'product/lbez4mwlkinbo5768rvl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762875168/product/lbez4mwlkinbo5768rvl.webp', 22);
INSERT INTO "public"."categoria" ("id", "nombre", "habilitado", "public_id", "secure_url") VALUES
(1, 'CUY', 't', 'category/m0ajfc35odhd0fdt7mnr', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866709/category/m0ajfc35odhd0fdt7mnr.webp'),
(2, 'GALLINAS', 't', 'category/jjokr1jbzmpilwjmpxev', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866726/category/jjokr1jbzmpilwjmpxev.webp'),
(3, 'CERDOS', 't', 'category/kfuheazbl3zyn9xhn4dt', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866739/category/kfuheazbl3zyn9xhn4dt.webp'),
(4, 'MAIZ', 't', 'category/crkpbjacu2gwfmelvz8x', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866807/category/crkpbjacu2gwfmelvz8x.webp'),
(5, 'VACUNOS', 't', 'category/nqhaqdnzxyddx4p1moh3', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866820/category/nqhaqdnzxyddx4p1moh3.webp'),
(6, 'AVES 2', 't', 'category/dcor6a5y5bzvw4alhg1a', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866830/category/dcor6a5y5bzvw4alhg1a.webp'),
(7, 'GALLOS DE PELEA', 't', 'category/w8txifluxgspeq9uoexd', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866845/category/w8txifluxgspeq9uoexd.webp'),
(8, 'CONEJOS', 't', 'category/z6xvrpm1dctfgsjeiwsh', 'https://res.cloudinary.com/valentine1234/image/upload/v1762866861/category/z6xvrpm1dctfgsjeiwsh.webp'),
(9, 'VETERINARIO', 't', 'category/ebfg5qnaneud3d0jmvdy', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867060/category/ebfg5qnaneud3d0jmvdy.webp');
INSERT INTO "public"."marca" ("id", "nombre", "habilitado", "public_id", "secure_url") VALUES
(1, 'RICOCAT', 't', 'brand/xxsmqwc83hgvogatwslf', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867500/brand/xxsmqwc83hgvogatwslf.webp'),
(2, 'ALICORP', 't', 'brand/smhtqi6aaxoil0zs1eyg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867517/brand/smhtqi6aaxoil0zs1eyg.webp'),
(3, 'GAMAVET', 't', 'brand/hgg6daixb1mvhnnk78yj', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867530/brand/hgg6daixb1mvhnnk78yj.webp'),
(4, 'ALLIN', 't', 'brand/hvahuncrq3cwoo6ake6x', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867539/brand/hvahuncrq3cwoo6ake6x.webp'),
(5, 'AFERSA', 't', 'brand/e7yvqtuqgpr6cao5yldl', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867565/brand/e7yvqtuqgpr6cao5yldl.webp'),
(6, 'BALANTECH', 't', 'brand/d2o1l8hbmjxqqis1jlzc', 'https://res.cloudinary.com/valentine1234/image/upload/v1762867591/brand/d2o1l8hbmjxqqis1jlzc.webp'),
(7, 'VITANOR', 't', 'brand/lkmfkdid6aunlw3spskg', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870439/brand/lkmfkdid6aunlw3spskg.webp'),
(8, 'PURINA', 't', 'brand/f839zyuytwnr0thadbub', 'https://res.cloudinary.com/valentine1234/image/upload/v1762870939/brand/f839zyuytwnr0thadbub.webp'),
(9, 'BEDOCE', 't', 'brand/mosv9q2syatxm7q5viba', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872209/brand/mosv9q2syatxm7q5viba.webp'),
(10, 'CORIMIX', 't', 'brand/vueyieo4rbvzfjwrvec5', 'https://res.cloudinary.com/valentine1234/image/upload/v1762872471/brand/vueyieo4rbvzfjwrvec5.webp');
INSERT INTO "public"."detalle_carrito" ("id", "cantidad", "id_producto", "id_carrito") VALUES
(6, 1, 32, 2),
(7, 1, 31, 2),
(8, 1, 30, 2),
(9, 1, 33, 2);
INSERT INTO "public"."carrito" ("id", "updated_at", "id_usuario") VALUES
(1, '2025-11-11 07:58:26.683', 1),
(2, '2025-11-11 10:55:25.905', 2);
INSERT INTO "public"."tipo_usuario" ("id", "nombre") VALUES
(1, 'administrador'),
(2, 'cliente');
INSERT INTO "public"."entrada" ("id", "fecha", "hora", "habilitado", "total") VALUES
(1, '2025-11-11', '09:54:10', 't', 364);
INSERT INTO "public"."comprobante" ("id", "id_tipo_comprobante", "id_pedido", "ruc", "razon_social", "dni", "nombres") VALUES
(1, 1, 1, NULL, NULL, '76326472', 'vdfv fvdfv');
INSERT INTO "public"."pedido" ("id", "codigo", "fecha", "hora", "total", "direccion", "ultima_fecha", "id_estado_pedido", "id_tipo_entrega", "id_metodo_pago", "id_usuario", "subtotal", "delivery_costo") VALUES
(1, '23dd6299-6c65-4f06-a2c3-ff3e4fcb5085', '2025-11-11', '10:03:23', 1139.00, '(-13.16799897682505,-74.21733498573305)', '2025-11-14', 4, 2, 2, 2, 1139.00, 0.00);
