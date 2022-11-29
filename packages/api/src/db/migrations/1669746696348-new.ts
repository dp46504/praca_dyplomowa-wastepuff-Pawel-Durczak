import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669746696348 implements MigrationInterface {
    name = 'new1669746696348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0" FOREIGN KEY ("activePackId") REFERENCES "pack"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_d46159a3df7ec3b85f78487fbc0" FOREIGN KEY ("activePackId") REFERENCES "pack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
