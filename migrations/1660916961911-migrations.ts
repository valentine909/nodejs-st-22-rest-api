import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1660916961911 implements MigrationInterface {
  name = 'migrations1660916961911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        ADD "refresh" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh"`);
  }
}
