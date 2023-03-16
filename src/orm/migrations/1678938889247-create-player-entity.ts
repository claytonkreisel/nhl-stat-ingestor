import { MigrationInterface, QueryRunner } from "typeorm";

export class createPlayerEntity1678938889247 implements MigrationInterface {
    name = 'createPlayerEntity1678938889247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "player" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" varchar NOT NULL,
                "lastName" varchar NOT NULL,
                "nhlId" integer NOT NULL,
                CONSTRAINT "UQ_50ed498fa09497d153258a7a280" UNIQUE ("nhlId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "player"
        `);
    }

}
