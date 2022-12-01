import { MigrationInterface, QueryRunner } from "typeorm";

export class new1669847405951 implements MigrationInterface {
    name = 'new1669847405951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "nameOfCigarette" character varying NOT NULL, "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "quantitySmoked" integer`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_cea2ed3a494729d4b21edbd2983"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "quantitySmoked"`);
        await queryRunner.query(`DROP TABLE "log"`);
    }

}
