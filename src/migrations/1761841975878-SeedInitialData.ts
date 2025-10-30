import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1761841975878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
      -- Tipo de usuario
      INSERT INTO "tipo_usuario" ("nombre") VALUES 
        ('administrador'),
        ('cliente');

      -- Tipo de entrega
      INSERT INTO "tipo_entrega" ("nombre") VALUES 
        ('tienda'),
        ('delivery');

      -- Método de pago
      INSERT INTO "metodo_pago" ("nombre") VALUES 
        ('tarjeta'),
        ('yape');

      -- Estado del pedido
      INSERT INTO "estado_pedido" ("nombre") VALUES 
        ('pagado'),
        ('alistado'),
        ('en camino'),
        ('entregado'),
        ('no entregado');

      -- Tipo de comprobante
      INSERT INTO "tipo_comprobante" ("nombre") VALUES 
        ('boleta'),
        ('factura'),
        ('ticket');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM "tipo_usuario" WHERE "nombre" IN ('administrador', 'cliente');
      DELETE FROM "tipo_entrega" WHERE "nombre" IN ('tienda', 'delivery');
      DELETE FROM "metodo_pago" WHERE "nombre" IN ('tarjeta', 'yape');
      DELETE FROM "estado_pedido" WHERE "nombre" IN ('pagado', 'alistado', 'en camino', 'entregado', 'no entregado');
      DELETE FROM "tipo_comprobante" WHERE "nombre" IN ('boleta', 'factura', 'ticket');
    `);
    }

}
