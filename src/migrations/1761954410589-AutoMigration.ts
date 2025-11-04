import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1761954410589 implements MigrationInterface {
    name = 'AutoMigration1761954410589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrada" ALTER COLUMN "total" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entrada" ALTER COLUMN "total" SET NOT NULL`);
    }

}
