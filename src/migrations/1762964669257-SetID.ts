import { MigrationInterface, QueryRunner } from "typeorm";

export class SetID1762964669257 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tables = [
            'carrito', 'categoria', 'comprobante', 'detalle_carrito',
            'detalle_entrada', 'detalle_pedido', 'entrada', 'estado_pedido',
            'imagen_producto', 'marca', 'metodo_pago', 'migrations',
            'pedido', 'producto', 'publicacion', 'tarifa_cobertura',
            'tipo_comprobante', 'tipo_entrega', 'tipo_usuario', 'usuario'
        ];

        for (const table of tables) {
            await queryRunner.query(`
                SELECT setval(pg_get_serial_sequence('"${table}"','id'), 
                              (SELECT COALESCE(MAX(id), 0) FROM "${table}") + 1, true);
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
