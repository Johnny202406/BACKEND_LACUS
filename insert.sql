-- Insertar tipos de entrega
INSERT INTO "tipo_entrega" ("nombre")
VALUES
  ('tienda'),
  ('delivery');

-- Insertar tipos de usuario
INSERT INTO "tipo_usuario" ("nombre")
VALUES
  ('administrador'),
  ('cliente');

-- Insertar métodos de pago
INSERT INTO "metodo_pago" ("nombre")
VALUES
  ('tarjeta'),
  ('yape');

-- Insertar estados de pedido
INSERT INTO "estado_pedido" ("nombre")
VALUES
  ('pagado'),
  ('alistado'),
  ('en camino'),
  ('entregado'),
  ('no entregado');

-- Insertar tipos de comprobante
INSERT INTO "tipo_comprobante" ("nombre")
VALUES
  ('boleta'),
  ('factura'),
  ('ticket');
