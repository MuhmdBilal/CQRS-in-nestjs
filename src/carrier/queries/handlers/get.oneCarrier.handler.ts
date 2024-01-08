import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetOneCarrierQuery } from "../impl//get.oneCarrier.query"
import { CarrierEntity } from 'src/carrier/entities/carrier.entity';

@QueryHandler(GetOneCarrierQuery)
export class GetOneCarrierHandler implements IQueryHandler<GetOneCarrierQuery>{
    constructor(
        @InjectRepository(CarrierEntity)
        private readonly carrierRepository: Repository<CarrierEntity>
    ) { }

    async execute(query: GetOneCarrierQuery) {
        const { id } = query;
        const carrier = await this.carrierRepository.findOne({
            where: { id: id }
        });

        if (!carrier) {
            throw new NotFoundException(`Carrier with ID ${id} not found`);
        }
        return carrier;
    }
}