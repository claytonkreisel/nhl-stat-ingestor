import { MigrationInterface, QueryRunner } from "typeorm";

export class createSeasonsAndGames1678939889326 implements MigrationInterface {
    name = 'createSeasonsAndGames1678939889326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "season" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "startYear" integer NOT NULL,
                CONSTRAINT "UQ_554901009e86f7c622fcb4c8c4b" UNIQUE ("startYear")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_game"("id", "nhlId", "seasonId")
            SELECT "id",
                "nhlId",
                "seasonId"
            FROM "game"
        `);
        await queryRunner.query(`
            DROP TABLE "game"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_game"
                RENAME TO "game"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game"
                RENAME TO "temporary_game"
        `);
        await queryRunner.query(`
            CREATE TABLE "game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "game"("id", "nhlId", "seasonId")
            SELECT "id",
                "nhlId",
                "seasonId"
            FROM "temporary_game"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_game"
        `);
        await queryRunner.query(`
            DROP TABLE "game"
        `);
        await queryRunner.query(`
            DROP TABLE "season"
        `);
    }

}
