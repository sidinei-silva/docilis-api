import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAdmin1731861979165 implements MigrationInterface {
    name = 'CreateTableAdmin1731861979165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admins" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "email" character varying(30) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c06ce78e9eb2b8fed71a5c752" ON "admins" ("deletedAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6c06ce78e9eb2b8fed71a5c752"`);
        await queryRunner.query(`DROP TABLE "admins"`);
    }

}
