import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllCarrierQuery } from "../impl/get.allCarrier.query"
import { CarrierEntity } from 'src/carrier/entities/carrier.entity';

@QueryHandler(GetAllCarrierQuery)
export class GetAllCarrierHandler implements IQueryHandler<GetAllCarrierQuery> {
    constructor(
        @InjectRepository(CarrierEntity)
        private readonly carrierRepository: Repository<CarrierEntity>
    ) { }

    async execute(query: GetAllCarrierQuery) {
        return this.carrierRepository.find();
    }
}