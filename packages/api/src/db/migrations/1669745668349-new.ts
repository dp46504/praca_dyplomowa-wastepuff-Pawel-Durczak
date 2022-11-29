import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669745668349 implements MigrationInterface {
    name = 'new1669745668349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pack" DROP CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150"`);
        await queryRunner.query(`ALTER TABLE "pack" ADD CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pack" DROP CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150"`);
        await queryRunner.query(`ALTER TABLE "pack" ADD CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
