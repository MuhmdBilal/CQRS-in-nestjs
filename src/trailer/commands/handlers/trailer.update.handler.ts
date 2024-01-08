import {BadRequestException,} from "@nestjs/common";
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {TrailerEntity} from "../../entities/trailer.entity"
import {UpdateTrailerCommand} from "../impl/trailer.update.command"
import { CarrierEntity } from "src/carrier/entities/carrier.entity";

@CommandHandler(UpdateTrailerCommand)
export class TrailerUpdateHandler implements ICommandHandler<UpdateTrailerCommand>{
    constructor(
        @InjectRepository(TrailerEntity)
        private readonly trailerRepository: Repository<TrailerEntity>,
        @InjectRepository(CarrierEntity)
        private readonly carrierRepository: Repository<CarrierEntity>
      ) {}

       async execute(command: UpdateTrailerCommand){
          const {trailerId, trailerDto} = command;
          const updatedTrailer = await this.trailerRepository.findOne({
            where: { id: trailerId },
          })
          if (!updatedTrailer) {
            throw new BadRequestException(
              `Trailer with ID ${updatedTrailer} not found.`,
            );
          }
          updatedTrailer.trailerNumber = trailerDto.trailerNumber;
          updatedTrailer.capacityKg = trailerDto.capacityKg;
          updatedTrailer.currentLocation = trailerDto.currentLocation;
          updatedTrailer.partnerId = trailerDto.partnerId;
          
          const carrier = await this.carrierRepository.findOne(
            {
              where: { id: trailerDto.carrierId },
            }
          );
          if (!carrier) {
            throw new BadRequestException(`Carrier with ID ${trailerDto.carrierId} not found.`);
          }
      
          updatedTrailer.carrier = carrier;

          await this.trailerRepository.update(
            { id: trailerId },
            updatedTrailer,
          )

          return { message: "Trailer updated successfully." };
      }
}

