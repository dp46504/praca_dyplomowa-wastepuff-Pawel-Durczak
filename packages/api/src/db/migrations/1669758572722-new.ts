import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669758572722 implements MigrationInterface {
    name = 'new1669758572722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wasted"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wasted" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "wasted"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "wasted" numeric(10,2) NOT NULL DEFAULT '0'`);
    }

}
