import { MigrationInterface, QueryRunner } from "typeorm";

export class alterStatLines1679091069318 implements MigrationInterface {
    name = 'alterStatLines1679091069318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                "statsId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_0780bf0cdce6a8ea4e805e332bf" UNIQUE ("statsId"),
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
                "statsId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_0780bf0cdce6a8ea4e805e332bf" UNIQUE ("statsId"),
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
                    "seasonId",
                    "statsId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId",
                "statsId"
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
                "statsId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_0780bf0cdce6a8ea4e805e332bf" UNIQUE ("statsId"),
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_7a9b4c2da46f148731e7a38b572" FOREIGN KEY ("statsId") REFERENCES "team_stat_line" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"(
                    "id",
                    "location",
                    "name",
                    "nhlId",
                    "franchiseId",
                    "seasonId",
                    "statsId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId",
                "statsId"
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
                "statsId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_0780bf0cdce6a8ea4e805e332bf" UNIQUE ("statsId"),
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
                    "seasonId",
                    "statsId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId",
                "statsId"
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
                "statsId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_0780bf0cdce6a8ea4e805e332bf" UNIQUE ("statsId"),
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
                    "seasonId",
                    "statsId"
                )
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId",
                "seasonId",
                "statsId"
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
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
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
    }

}
