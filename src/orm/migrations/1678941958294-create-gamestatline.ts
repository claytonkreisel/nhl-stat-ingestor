import { MigrationInterface, QueryRunner } from "typeorm";

export class createGamestatline1678941958294 implements MigrationInterface {
    name = 'createGamestatline1678941958294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "game_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "gameId" integer,
                "teamPlayerId" integer,
                CONSTRAINT "UQ_GameTeamPlayer" UNIQUE ("gameId", "teamPlayerId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_game_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "gameId" integer,
                "teamPlayerId" integer,
                CONSTRAINT "UQ_GameTeamPlayer" UNIQUE ("gameId", "teamPlayerId"),
                CONSTRAINT "FK_4d7de4daeabf964f287844fb934" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_efff97af60320915677c38d33c8" FOREIGN KEY ("teamPlayerId") REFERENCES "team_player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_game_stat_line"(
                    "id",
                    "goals",
                    "assists",
                    "points",
                    "hits",
                    "penaltyMinutes",
                    "gameId",
                    "teamPlayerId"
                )
            SELECT "id",
                "goals",
                "assists",
                "points",
                "hits",
                "penaltyMinutes",
                "gameId",
                "teamPlayerId"
            FROM "game_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "game_stat_line"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_game_stat_line"
                RENAME TO "game_stat_line"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "game_stat_line"
                RENAME TO "temporary_game_stat_line"
        `);
        await queryRunner.query(`
            CREATE TABLE "game_stat_line" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "goals" integer NOT NULL,
                "assists" integer NOT NULL,
                "points" integer NOT NULL,
                "hits" integer NOT NULL,
                "penaltyMinutes" float NOT NULL,
                "gameId" integer,
                "teamPlayerId" integer,
                CONSTRAINT "UQ_GameTeamPlayer" UNIQUE ("gameId", "teamPlayerId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "game_stat_line"(
                    "id",
                    "goals",
                    "assists",
                    "points",
                    "hits",
                    "penaltyMinutes",
                    "gameId",
                    "teamPlayerId"
                )
            SELECT "id",
                "goals",
                "assists",
                "points",
                "hits",
                "penaltyMinutes",
                "gameId",
                "teamPlayerId"
            FROM "temporary_game_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_game_stat_line"
        `);
        await queryRunner.query(`
            DROP TABLE "game_stat_line"
        `);
    }

}
