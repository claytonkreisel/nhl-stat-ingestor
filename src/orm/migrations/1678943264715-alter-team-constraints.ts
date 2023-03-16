import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTeamConstraints1678943264715 implements MigrationInterface {
    name = 'alterTeamConstraints1678943264715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "FK_1a206693bb12335a59cb181b355" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_6454b249c4795083f0233b59535" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
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
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "team"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_team"
                RENAME TO "team"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "team"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_team"
                RENAME TO "team"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_game" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "nhlId" bigint NOT NULL,
                "seasonId" integer,
                "homeTeamId" integer,
                "awayTeamId" integer,
                CONSTRAINT "UQ_480280afd475ebf910d54554bea" UNIQUE ("nhlId"),
                CONSTRAINT "CHK_6b81931470c1528ba38b177f1b" CHECK ("homeTeamId" != "awayTeamId"),
                CONSTRAINT "FK_1a206693bb12335a59cb181b355" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_6454b249c4795083f0233b59535" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
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
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "team"
        `);
        await queryRunner.query(`
            DROP TABLE "team"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_team"
                RENAME TO "team"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "team"
                RENAME TO "temporary_team"
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team"
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
                CONSTRAINT "FK_1a206693bb12335a59cb181b355" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_6454b249c4795083f0233b59535" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
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
            ALTER TABLE "team"
                RENAME TO "temporary_team"
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team"
        `);
        await queryRunner.query(`
            ALTER TABLE "team"
                RENAME TO "temporary_team"
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId"
            FROM "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team"
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
                CONSTRAINT "CHK_95669c5eaab991d5294a4f60a6" CHECK (("homeTeamId" != "awayTeamId")),
                CONSTRAINT "FK_1a206693bb12335a59cb181b355" FOREIGN KEY ("awayTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_6454b249c4795083f0233b59535" FOREIGN KEY ("homeTeamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
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
    }

}
