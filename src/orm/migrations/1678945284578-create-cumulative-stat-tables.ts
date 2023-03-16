import { MigrationInterface, QueryRunner } from "typeorm";

export class createCumulativeStatTables1678945284578 implements MigrationInterface {
    name = 'createCumulativeStatTables1678945284578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            CREATE TABLE "player_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "team_player_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "team_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "franchise_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "season_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "seasonId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_SeasonPlayer" UNIQUE ("seasonId", "playerId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_50ed498fa09497d153258a7a280" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_802bac49bac34c9987a877308ce" UNIQUE ("statsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_player"("id", "firstName", "lastName", "nhlId")
            SELECT "id",
                "firstName",
                "lastName",
                "nhlId"
            FROM "player"
        `);
        await queryRunner.query(`
            DROP TABLE "player"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_player"
                RENAME TO "player"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_franchise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_4f8c57c7b3c62231e4b7e47f5a2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_b209412e69a3f5fe77ec9d31e0b" UNIQUE ("name"),
                CONSTRAINT "UQ_0ed2dcb3a4174c6bda81503459c" UNIQUE ("statsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_franchise"("id", "name", "nhlId")
            SELECT "id",
                "name",
                "nhlId"
            FROM "franchise"
        `);
        await queryRunner.query(`
            DROP TABLE "franchise"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_franchise"
                RENAME TO "franchise"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "franchiseId" integer,
                "seasonId" integer,
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            CREATE TABLE "temporary_player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_50ed498fa09497d153258a7a280" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_802bac49bac34c9987a877308ce" UNIQUE ("statsId"),
                CONSTRAINT "FK_b68b06a74590adfda58ffc1f1e8" FOREIGN KEY ("statsId") REFERENCES "player_stat_line" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_player"(
                    "id",
                    "firstName",
                    "lastName",
                    "nhlId",
                    "statsId"
                )
            SELECT "id",
                "firstName",
                "lastName",
                "nhlId",
                "statsId"
            FROM "player"
        `);
        await queryRunner.query(`
            DROP TABLE "player"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_player"
                RENAME TO "player"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_franchise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_4f8c57c7b3c62231e4b7e47f5a2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_b209412e69a3f5fe77ec9d31e0b" UNIQUE ("name"),
                CONSTRAINT "UQ_0ed2dcb3a4174c6bda81503459c" UNIQUE ("statsId"),
                CONSTRAINT "FK_dedf6ea957c76be966f4786500a" FOREIGN KEY ("statsId") REFERENCES "franchise_stat_line" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_franchise"("id", "name", "nhlId", "statsId")
            SELECT "id",
                "name",
                "nhlId",
                "statsId"
            FROM "franchise"
        `);
        await queryRunner.query(`
            DROP TABLE "franchise"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_franchise"
                RENAME TO "franchise"
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_season_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "seasonId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_SeasonPlayer" UNIQUE ("seasonId", "playerId"),
                CONSTRAINT "FK_1971bc216d438cab56b4e961311" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_7d111add872ba912907464e0e15" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_season_stat_line"(
                    "id",
                    "goals",
                    "assists",
                    "points",
                    "hits",
                    "penaltyMinutes",
                    "seasonId",
                    "playerId"
                )
            SELECT "id",
                "goals",
                "assists",
                "points",
                "hits",
                "penaltyMinutes",
                "seasonId",
                "playerId"
            FROM "season_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "season_stat_line"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_season_stat_line"
                RENAME TO "season_stat_line"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "season_stat_line"
                RENAME TO "temporary_season_stat_line"
        `);
        await queryRunner.query(`
            CREATE TABLE "season_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "seasonId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_SeasonPlayer" UNIQUE ("seasonId", "playerId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "season_stat_line"(
                    "id",
                    "goals",
                    "assists",
                    "points",
                    "hits",
                    "penaltyMinutes",
                    "seasonId",
                    "playerId"
                )
            SELECT "id",
                "goals",
                "assists",
                "points",
                "hits",
                "penaltyMinutes",
                "seasonId",
                "playerId"
            FROM "temporary_season_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_season_stat_line"
        `);
        await queryRunner.query(`
            ALTER TABLE "franchise"
                RENAME TO "temporary_franchise"
        `);
        await queryRunner.query(`
            CREATE TABLE "franchise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_4f8c57c7b3c62231e4b7e47f5a2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_b209412e69a3f5fe77ec9d31e0b" UNIQUE ("name"),
                CONSTRAINT "UQ_0ed2dcb3a4174c6bda81503459c" UNIQUE ("statsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "franchise"("id", "name", "nhlId", "statsId")
            SELECT "id",
                "name",
                "nhlId",
                "statsId"
            FROM "temporary_franchise"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_franchise"
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
                RENAME TO "temporary_player"
        `);
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                "statsId" integer,
                CONSTRAINT "UQ_50ed498fa09497d153258a7a280" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_802bac49bac34c9987a877308ce" UNIQUE ("statsId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "player"(
                    "id",
                    "firstName",
                    "lastName",
                    "nhlId",
                    "statsId"
                )
            SELECT "id",
                "firstName",
                "lastName",
                "nhlId",
                "statsId"
            FROM "temporary_player"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_player"
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
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "franchise"
                RENAME TO "temporary_franchise"
        `);
        await queryRunner.query(`
            CREATE TABLE "franchise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                CONSTRAINT "UQ_4f8c57c7b3c62231e4b7e47f5a2" UNIQUE ("nhlId"),
                CONSTRAINT "UQ_b209412e69a3f5fe77ec9d31e0b" UNIQUE ("name")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "franchise"("id", "name", "nhlId")
            SELECT "id",
                "name",
                "nhlId"
            FROM "temporary_franchise"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_franchise"
        `);
        await queryRunner.query(`
            ALTER TABLE "player"
                RENAME TO "temporary_player"
        `);
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                CONSTRAINT "UQ_50ed498fa09497d153258a7a280" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "player"("id", "firstName", "lastName", "nhlId")
            SELECT "id",
                "firstName",
                "lastName",
                "nhlId"
            FROM "temporary_player"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_player"
        `);
        await queryRunner.query(`
            DROP TABLE "season_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "franchise_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "team_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "team_player_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "player_stat_line"
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
                CONSTRAINT "UQ_FranchiseSeason" UNIQUE ("franchiseId", "seasonId"),
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_20d85cf5a9c2477eae5bb563877" FOREIGN KEY ("seasonId") REFERENCES "season" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
