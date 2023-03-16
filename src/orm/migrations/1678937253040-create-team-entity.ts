import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeamEntity1678937253040 implements MigrationInterface {
    name = 'createTeamEntity1678937253040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "team"
        `);
    }

}
