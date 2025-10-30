import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDefaultValue1761843020852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // producto
    await queryRunner.query(`
      UPDATE producto SET descripcion = 'Descripción...' WHERE descripcion IS NULL;
      ALTER TABLE producto ALTER COLUMN descripcion SET DEFAULT 'Descripción...';
      UPDATE producto SET peso_kg = 0 WHERE peso_kg IS NULL;
      ALTER TABLE producto ALTER COLUMN peso_kg SET DEFAULT 0;
      UPDATE producto SET precio = 0 WHERE precio IS NULL;
      ALTER TABLE producto ALTER COLUMN precio SET DEFAULT 0;
      UPDATE producto SET habilitado = true WHERE habilitado IS NULL;
      ALTER TABLE producto ALTER COLUMN habilitado SET DEFAULT true;
      UPDATE producto SET porcentaje_descuento = 0 WHERE porcentaje_descuento IS NULL;
      ALTER TABLE producto ALTER COLUMN porcentaje_descuento SET DEFAULT 0;
      -- Si id_categoria/id_marca pueden ser NULL, asignar 1 (cuidado: debe existir cat/marca con id=1)
      UPDATE producto SET id_categoria = 1 WHERE id_categoria IS NULL;
      ALTER TABLE producto ALTER COLUMN id_categoria SET DEFAULT 1;
      UPDATE producto SET id_marca = 1 WHERE id_marca IS NULL;
      ALTER TABLE producto ALTER COLUMN id_marca SET DEFAULT 1;
    `);

    // usuario
    await queryRunner.query(`
      UPDATE usuario SET habilitado = true WHERE habilitado IS NULL;
      ALTER TABLE usuario ALTER COLUMN habilitado SET DEFAULT true;
      UPDATE usuario SET id_tipo_usuario = 2 WHERE id_tipo_usuario IS NULL;
      ALTER TABLE usuario ALTER COLUMN id_tipo_usuario SET DEFAULT 2;
    `);

    // tarifa_cobertura
    await queryRunner.query(`
      UPDATE tarifa_cobertura SET radio_cobertura = 0 WHERE radio_cobertura IS NULL;
      ALTER TABLE tarifa_cobertura ALTER COLUMN radio_cobertura SET DEFAULT 0;
      UPDATE tarifa_cobertura SET tarifa_kg_km = 0 WHERE tarifa_kg_km IS NULL;
      ALTER TABLE tarifa_cobertura ALTER COLUMN tarifa_kg_km SET DEFAULT 0;
      UPDATE tarifa_cobertura SET tarifa_minima = 0 WHERE tarifa_minima IS NULL;
      ALTER TABLE tarifa_cobertura ALTER COLUMN tarifa_minima SET DEFAULT 0;
    `);

    // entrada
    await queryRunner.query(`
      UPDATE entrada SET habilitado = true WHERE habilitado IS NULL;
      ALTER TABLE entrada ALTER COLUMN habilitado SET DEFAULT true;
    `);

    // detalle_entrada
    await queryRunner.query(`
      UPDATE detalle_entrada SET cantidad = 1 WHERE cantidad IS NULL;
      ALTER TABLE detalle_entrada ALTER COLUMN cantidad SET DEFAULT 1;
    `);

    // detalle_carrito
    await queryRunner.query(`
      UPDATE detalle_carrito SET cantidad = 1 WHERE cantidad IS NULL;
      ALTER TABLE detalle_carrito ALTER COLUMN cantidad SET DEFAULT 1;
    `);

    // pedido
    await queryRunner.query(`
      UPDATE pedido SET total = 0 WHERE total IS NULL;
      ALTER TABLE pedido ALTER COLUMN total SET DEFAULT 0;
      UPDATE pedido SET id_estado_pedido = 1 WHERE id_estado_pedido IS NULL;
      ALTER TABLE pedido ALTER COLUMN id_estado_pedido SET DEFAULT 1;
      UPDATE pedido SET id_tipo_entrega = 1 WHERE id_tipo_entrega IS NULL;
      ALTER TABLE pedido ALTER COLUMN id_tipo_entrega SET DEFAULT 1;
      -- id_metodo_pago left without default intentionally (you previously wanted it NOT NULL)
    `);

    // detalle_pedido
    await queryRunner.query(`
      UPDATE detalle_pedido SET cantidad = 1 WHERE cantidad IS NULL;
      ALTER TABLE detalle_pedido ALTER COLUMN cantidad SET DEFAULT 1;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revertir los DEFAULTs (quita los defaults que pusimos)
    await queryRunner.query(`
      ALTER TABLE producto ALTER COLUMN descripcion DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN peso_kg DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN precio DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN habilitado DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN porcentaje_descuento DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN id_categoria DROP DEFAULT;
      ALTER TABLE producto ALTER COLUMN id_marca DROP DEFAULT;

      ALTER TABLE usuario ALTER COLUMN habilitado DROP DEFAULT;
      ALTER TABLE usuario ALTER COLUMN id_tipo_usuario DROP DEFAULT;

      ALTER TABLE tarifa_cobertura ALTER COLUMN radio_cobertura DROP DEFAULT;
      ALTER TABLE tarifa_cobertura ALTER COLUMN tarifa_kg_km DROP DEFAULT;
      ALTER TABLE tarifa_cobertura ALTER COLUMN tarifa_minima DROP DEFAULT;

      ALTER TABLE entrada ALTER COLUMN habilitado DROP DEFAULT;

      ALTER TABLE detalle_entrada ALTER COLUMN cantidad DROP DEFAULT;

      ALTER TABLE detalle_carrito ALTER COLUMN cantidad DROP DEFAULT;

      ALTER TABLE pedido ALTER COLUMN total DROP DEFAULT;
      ALTER TABLE pedido ALTER COLUMN id_estado_pedido DROP DEFAULT;
      ALTER TABLE pedido ALTER COLUMN id_tipo_entrega DROP DEFAULT;

      ALTER TABLE detalle_pedido ALTER COLUMN cantidad DROP DEFAULT;
    `);
    }

}
