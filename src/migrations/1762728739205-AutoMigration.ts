import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1762728739205 implements MigrationInterface {
    name = 'AutoMigration1762728739205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "xml"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "cdr"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "comprobante"`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "ruc" character varying(11)`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "razon_social" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "dni" character varying(8)`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "nombres" character varying(510)`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "subtotal" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "delivery_costo" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "direccion" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "direccion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "delivery_costo"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "nombres"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "dni"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "razon_social"`);
        await queryRunner.query(`ALTER TABLE "comprobante" DROP COLUMN "ruc"`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "comprobante" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "cdr" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "comprobante" ADD "xml" character varying(500)`);
    }

}
