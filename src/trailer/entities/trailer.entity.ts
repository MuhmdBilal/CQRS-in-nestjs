import { BaseEntity } from 'src/database/base-entity';
import {CarrierEntity} from "../../carrier/entities/carrier.entity"
import { Entity, Column, OneToMany, Index, OneToOne, JoinColumn } from 'typeorm';
import { TrailerInspectionStatus, TrailerLoadingStatus } from '../enums/trailer-status.enum';

@Entity('trailers')
export class TrailerEntity extends BaseEntity {
  @Column({ nullable: false })
  @Index({ unique: true })
  trailerNumber: string;

  @Column({ nullable: true })
  capacityKg: number;

  @Column({ nullable: true })
  currentLocation: string;

  @Column({ nullable: true })
  partnerId: string;

  @Column({ type: "enum", enum: TrailerLoadingStatus, nullable: true })
  loadingStatus: TrailerLoadingStatus;

  @Column({ type: "enum", enum: TrailerInspectionStatus, nullable: true })
  inspectionStatus: TrailerInspectionStatus;

  @Column({ type: "timestamptz", nullable: true })
  lastAnnualDotInspectionAt: Date;


  @OneToOne(
    () => CarrierEntity,
    (carrierEntity) => carrierEntity.trailer,
  )
  @JoinColumn({name: "Carrier_id"})
  carrier: CarrierEntity;
}
