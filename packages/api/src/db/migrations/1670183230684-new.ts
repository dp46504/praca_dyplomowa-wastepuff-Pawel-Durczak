import { MigrationInterface, QueryRunner } from "typeorm";

export class new1670183230684 implements MigrationInterface {
    name = 'new1670183230684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pack" DROP CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150"`);
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pack" ADD CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983"`);
        await queryRunner.query(`ALTER TABLE "pack" DROP CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pack" ADD CONSTRAINT "FK_d50e9dbc3ea2236470f0ee9d150" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
