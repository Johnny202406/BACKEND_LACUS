import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1761951691413 implements MigrationInterface {
    name = 'AutoMigration1761951691413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrada" ADD "total" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_7eca733e235d15e61c783039093"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_a90f64fa06d462fb4e1faf11653"`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "id_estado_pedido" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "id_tipo_entrega" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_e87a319f3da1b6da5fedd1988be"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_116783c6bfbff483096740514be"`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id_categoria" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id_marca" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_1961b44873a11fcc9640c381834"`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "id_tipo_usuario" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_7eca733e235d15e61c783039093" FOREIGN KEY ("id_estado_pedido") REFERENCES "estado_pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_a90f64fa06d462fb4e1faf11653" FOREIGN KEY ("id_tipo_entrega") REFERENCES "tipo_entrega"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_e87a319f3da1b6da5fedd1988be" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_116783c6bfbff483096740514be" FOREIGN KEY ("id_marca") REFERENCES "marca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_1961b44873a11fcc9640c381834" FOREIGN KEY ("id_tipo_usuario") REFERENCES "tipo_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_1961b44873a11fcc9640c381834"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_116783c6bfbff483096740514be"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_e87a319f3da1b6da5fedd1988be"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_a90f64fa06d462fb4e1faf11653"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_7eca733e235d15e61c783039093"`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "id_tipo_usuario" SET DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_1961b44873a11fcc9640c381834" FOREIGN KEY ("id_tipo_usuario") REFERENCES "tipo_usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id_marca" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "id_categoria" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_116783c6bfbff483096740514be" FOREIGN KEY ("id_marca") REFERENCES "marca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_e87a319f3da1b6da5fedd1988be" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "id_tipo_entrega" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "id_estado_pedido" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_a90f64fa06d462fb4e1faf11653" FOREIGN KEY ("id_tipo_entrega") REFERENCES "tipo_entrega"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_7eca733e235d15e61c783039093" FOREIGN KEY ("id_estado_pedido") REFERENCES "estado_pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entrada" DROP COLUMN "total"`);
    }

}
