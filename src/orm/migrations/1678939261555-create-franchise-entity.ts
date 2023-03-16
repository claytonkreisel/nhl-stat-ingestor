import { MigrationInterface, QueryRunner } from "typeorm";

export class createFranchiseEntity1678939261555 implements MigrationInterface {
    name = 'createFranchiseEntity1678939261555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "franchise" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" bigint NOT NULL,
                CONSTRAINT "UQ_b209412e69a3f5fe77ec9d31e0b" UNIQUE ("name"),
                CONSTRAINT "UQ_4f8c57c7b3c62231e4b7e47f5a2" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                "franchiseId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_team"("id", "location", "name", "nhlId")
            SELECT "id",
                "location",
                "name",
                "nhlId"
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
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
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
            CREATE TABLE "temporary_team" (
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
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
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
            ALTER TABLE "team"
                RENAME TO "temporary_team"
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                "franchiseId" integer,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
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
            ALTER TABLE "team"
                RENAME TO "temporary_team"
        `);
        await queryRunner.query(`
            CREATE TABLE "team" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "location" varchar NOT NULL,
                "name" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                CONSTRAINT "UQ_f7137c2f3c5d2698f0e74837af2" UNIQUE ("nhlId")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "team"("id", "location", "name", "nhlId")
            SELECT "id",
                "location",
                "name",
                "nhlId"
            FROM "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_team"
        `);
        await queryRunner.query(`
            DROP TABLE "franchise"
        `);
    }

}
