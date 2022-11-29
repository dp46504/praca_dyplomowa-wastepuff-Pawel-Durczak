import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669722471361 implements MigrationInterface {
    name = 'new1669722471361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "activePackId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_d46159a3df7ec3b85f78487fbc0" UNIQUE ("activePackId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0" FOREIGN KEY ("activePackId") REFERENCES "pack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_d46159a3df7ec3b85f78487fbc0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "activePackId"`);
    }

}
