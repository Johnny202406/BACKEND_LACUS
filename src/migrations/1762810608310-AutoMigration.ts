import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1762810608310 implements MigrationInterface {
    name = 'AutoMigration1762810608310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_carrito" DROP CONSTRAINT "FK_6de25637302f36d153e4b80af47"`);
        await queryRunner.query(`ALTER TABLE "detalle_carrito" ALTER COLUMN "id_carrito" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_carrito" ADD CONSTRAINT "FK_6de25637302f36d153e4b80af47" FOREIGN KEY ("id_carrito") REFERENCES "carrito"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detalle_carrito" DROP CONSTRAINT "FK_6de25637302f36d153e4b80af47"`);
        await queryRunner.query(`ALTER TABLE "detalle_carrito" ALTER COLUMN "id_carrito" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "detalle_carrito" ADD CONSTRAINT "FK_6de25637302f36d153e4b80af47" FOREIGN KEY ("id_carrito") REFERENCES "carrito"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
