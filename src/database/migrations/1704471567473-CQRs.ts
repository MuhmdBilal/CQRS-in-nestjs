import { MigrationInterface, QueryRunner } from "typeorm";

export class CQRs1704471567473 implements MigrationInterface {
    name = 'CQRs1704471567473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."trailers_loading_status_enum" AS ENUM('Unavailable', 'RequiresAttention', 'AwaitingCarrierInspection', 'AwaitingTrailerInspection', 'FillReady', 'Filled')`);
        await queryRunner.query(`CREATE TYPE "public"."trailers_inspection_status_enum" AS ENUM('Due', 'Compliant', 'Approaching')`);
        await queryRunner.query(`CREATE TABLE "trailers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "trailer_number" character varying NOT NULL, "capacity_kg" integer, "current_location" character varying, "partner_id" character varying, "loading_status" "public"."trailers_loading_status_enum", "inspection_status" "public"."trailers_inspection_status_enum", "last_annual_dot_inspection_at" TIMESTAMP WITH TIME ZONE, "Carrier_id" uuid, CONSTRAINT "REL_ac646e28e3347be27eeffc5dc9" UNIQUE ("Carrier_id"), CONSTRAINT "PK_598af6bec45fafbf70437f32b8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9d12f016230a915f0b03203553" ON "trailers" ("trailer_number") `);
        await queryRunner.query(`CREATE TABLE "carriers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "serial_number" character varying NOT NULL, "max_service_pressure_psig" integer, "carrier_capacity_kg" integer, "min_operating_temperature_c" integer, "max_operating_temperature_c" integer, "asset_id" character varying, CONSTRAINT "PK_fe886e72b3d9f67da3ce70f4368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_490bbdcd59fec0e3c2a83afee1" ON "carriers" ("serial_number") `);
        await queryRunner.query(`ALTER TABLE "trailers" ADD CONSTRAINT "FK_ac646e28e3347be27eeffc5dc9b" FOREIGN KEY ("Carrier_id") REFERENCES "carriers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trailers" DROP CONSTRAINT "FK_ac646e28e3347be27eeffc5dc9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_490bbdcd59fec0e3c2a83afee1"`);
        await queryRunner.query(`DROP TABLE "carriers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d12f016230a915f0b03203553"`);
        await queryRunner.query(`DROP TABLE "trailers"`);
        await queryRunner.query(`DROP TYPE "public"."trailers_inspection_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."trailers_loading_status_enum"`);
    }

}
