import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableConfectioner1732486259765 implements MigrationInterface {
  name = 'CreateTableConfectioner1732486259765';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "confectioners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying(50) NOT NULL, "email" character varying(30) NOT NULL, "password" character varying(100) NOT NULL, CONSTRAINT "UQ_b7ea2789a83146d745b34e761e1" UNIQUE ("email"), CONSTRAINT "PK_50b2c5b4fa0c7d65a063ea109b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_1ee96cad1d01e9f67538f48ef3" ON "confectioners" ("deletedAt") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_1ee96cad1d01e9f67538f48ef3"`);
    await queryRunner.query(`DROP TABLE "confectioners"`);
  }
}
