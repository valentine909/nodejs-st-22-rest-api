import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1659185361634 implements MigrationInterface {
  name = 'migrations1659185361634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"        uuid              NOT NULL DEFAULT uuid_generate_v4(),
                                 "login"     character varying NOT NULL,
                                 "password"  character varying NOT NULL,
                                 "age"       integer           NOT NULL,
                                 "isDeleted" boolean           NOT NULL DEFAULT false,
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
