import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGameTeamAssociation1678942514509
  implements MigrationInterface
{
  name = 'createGameTeamAssociation1678942514509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
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
    await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "CHK_95669c5eaab991d5294a4f60a6" CHECK ("homeTeamId" != "awayTeamId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_game"(
                    "id",
                    "nhlId",
                    "seasonId",
                    "homeTeamId",
                    "awayTeamId"
                )
            SELECT "id",
                "nhlId",
                "seasonId",
                "homeTeamId",
                "awayTeamId"
            FROM "game"
        `);
    await queryRunner.query(`
            DROP TABLE "game"
        `);
    await queryRunner.query(`
            ALTER TABLE "temporary_game"
                RENAME TO "game"
        `);
    await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "CHK_95669c5eaab991d5294a4f60a6" CHECK ("homeTeamId" != "awayTeamId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_6454b249c4795083f0233b59535" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_1a206693bb12335a59cb181b355" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_game"(
                    "id",
                    "nhlId",
                    "seasonId",
                    "homeTeamId",
                    "awayTeamId"
                )
            SELECT "id",
                "nhlId",
                "seasonId",
                "homeTeamId",
                "awayTeamId"
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
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "CHK_95669c5eaab991d5294a4f60a6" CHECK ("homeTeamId" != "awayTeamId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "game"(
                    "id",
                    "nhlId",
                    "seasonId",
                    "homeTeamId",
                    "awayTeamId"
                )
            SELECT "id",
                "nhlId",
                "seasonId",
                "homeTeamId",
                "awayTeamId"
            FROM "temporary_game"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_game"
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
                RENAME TO "temporary_game"
        `);
    await queryRunner.query(`
            CREATE TABLE "game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "game"(
                    "id",
                    "nhlId",
                    "seasonId",
                    "homeTeamId",
                    "awayTeamId"
                )
            SELECT "id",
                "nhlId",
                "seasonId",
                "homeTeamId",
                "awayTeamId"
            FROM "temporary_game"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_game"
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
                RENAME TO "temporary_game"
        `);
    await queryRunner.query(`
            CREATE TABLE "game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "FK_a131db71114ac13c4a9cf925232" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
  }
}
