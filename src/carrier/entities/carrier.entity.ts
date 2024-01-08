
import { BaseEntity } from 'src/database/base-entity';
import {TrailerEntity} from "../../trailer/entities/trailer.entity"
import { Column, Entity, Index, OneToMany, OneToOne } from "typeorm";

@Entity("carriers")
export class CarrierEntity extends BaseEntity  {
    @Column({ nullable: false })
    @Index({ unique: true })
    serialNumber: string;
  
    @Column({ nullable: true })
    maxServicePressurePsig: number;
  
    @Column({ nullable: true })
    carrierCapacityKg: number;
  
    @Column({ nullable: true })
    minOperatingTemperatureC: number;
  
    @Column({ nullable: true })
    maxOperatingTemperatureC: number;

    @Column({ nullable: true })
    assetId: string;

    @OneToOne(
        () => TrailerEntity,
        (trailerEntity) => trailerEntity.carrier,
      )
      trailer: TrailerEntity;
}
