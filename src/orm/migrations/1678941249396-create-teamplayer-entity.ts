import { MigrationInterface, QueryRunner } from "typeorm";

export class createTeamplayerEntity1678941249396 implements MigrationInterface {
    name = 'createTeamplayerEntity1678941249396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "team_player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "teamId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_PlayerTeam" UNIQUE ("playerId", "teamId")
            )
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
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"("id", "location", "name", "nhlId", "franchiseId")
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId"
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
            CREATE TABLE "temporary_team_player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "teamId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_PlayerTeam" UNIQUE ("playerId", "teamId"),
                CONSTRAINT "FK_ba439df2ee27e9bf3dd1e380b65" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_869480e0ee5775a480eb7d92a44" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team_player"("id", "teamId", "playerId")
            SELECT "id",
                "teamId",
                "playerId"
            FROM "team_player"
        `);
        await queryRunner.query(`
            DROP TABLE "team_player"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_team_player"
                RENAME TO "team_player"
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
            ALTER TABLE "team_player"
                RENAME TO "temporary_team_player"
        `);
        await queryRunner.query(`
            CREATE TABLE "team_player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "teamId" integer,
                "playerId" integer,
                CONSTRAINT "UQ_PlayerTeam" UNIQUE ("playerId", "teamId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team_player"("id", "teamId", "playerId")
            SELECT "id",
                "teamId",
                "playerId"
            FROM "temporary_team_player"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team_player"
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
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId"),
                CONSTRAINT "FK_652e04e862dac0c611e6a929ab3" FOREIGN KEY ("franchiseId") REFERENCES "franchise" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team"("id", "location", "name", "nhlId", "franchiseId")
            SELECT "id",
                "location",
                "name",
                "nhlId",
                "franchiseId"
            FROM "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "team_player"
        `);
    }

}
