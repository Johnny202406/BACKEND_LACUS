import { MigrationInterface, QueryRunner } from "typeorm";

export class SetEmail1763407333150 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE usuario SET id_tipo_usuario = 1 
            WHERE correo = 'lacus.peru@gmail.com'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE usuario SET id_tipo_usuario = 2
            WHERE correo = 'lacus.peru@gmail.com'
        `);
    }
}
