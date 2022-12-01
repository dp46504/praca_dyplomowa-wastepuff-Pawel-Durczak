import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669834695619 implements MigrationInterface {
    name = 'new1669834695619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastSmoked"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastSmoked" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastSmoked"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastSmoked" date`);
    }

}
