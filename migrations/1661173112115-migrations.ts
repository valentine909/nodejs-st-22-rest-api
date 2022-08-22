import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1661173112115 implements MigrationInterface {
  name = 'migrations1661173112115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "permissions" text NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "deleted_at" TIMESTAMP, "refresh" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_groups_groups" ("usersId" uuid NOT NULL, "groupsId" uuid NOT NULL, CONSTRAINT "PK_1cf09013aa7a345778eaeb5a421" PRIMARY KEY ("usersId", "groupsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b46034fbd69664807cb4afb16" ON "users_groups_groups" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_270e39efd76d142903fd6ed528" ON "users_groups_groups" ("groupsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_1b46034fbd69664807cb4afb16f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" ADD CONSTRAINT "FK_270e39efd76d142903fd6ed528f" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_270e39efd76d142903fd6ed528f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_groups_groups" DROP CONSTRAINT "FK_1b46034fbd69664807cb4afb16f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_270e39efd76d142903fd6ed528"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b46034fbd69664807cb4afb16"`,
    );
    await queryRunner.query(`DROP TABLE "users_groups_groups"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}
