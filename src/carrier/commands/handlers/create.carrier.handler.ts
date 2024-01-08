import { UpdateTrailerDto } from './../../../trailer/dto/update-trailer.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
    BadRequestException, NotFoundException
} from "@nestjs/common";
import { CommandBus, QueryBus  } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarrierCommand } from "../impl/create.carrier.command"
import { CarrierEntity } from 'src/carrier/entities/carrier.entity';
import { UpdateTrailerCommand } from 'src/trailer/commands/impl/trailer.update.command';
import { TrailerEntity } from 'src/trailer/entities/trailer.entity';

@CommandHandler(CreateCarrierCommand)
export class CreateCarrierHandler implements ICommandHandler<CreateCarrierCommand>{
    constructor(
        @InjectRepository(CarrierEntity)
        private readonly carrierRepository: Repository<CarrierEntity>,
        @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
        private readonly commandBus: CommandBus
    ) { }

    async execute(command: CreateCarrierCommand) {
        const newCarrier = new CarrierEntity();
        newCarrier.serialNumber = command.carrierDto.serialNumber;
        newCarrier.maxServicePressurePsig = command.carrierDto.maxServicePressurePsig;
        newCarrier.carrierCapacityKg = command.carrierDto.carrierCapacityKg;
        newCarrier.minOperatingTemperatureC =
            command.carrierDto.minOperatingTemperatureC;
        newCarrier.maxOperatingTemperatureC =
            command.carrierDto.maxOperatingTemperatureC;
        newCarrier.serialNumber = command.carrierDto.serialNumber;

        const newCarrierEntity = await this.carrierRepository.save(newCarrier);
 
        const trailer = await this.trailerRepository.findOne(
            {
              where: { id: command.carrierDto.trailerId },
            }
          );

          if (!trailer) {
            throw new BadRequestException(`Trailer with ID ${command.carrierDto.trailerId} not found.`);
          }

        const updateTrailerDto: UpdateTrailerDto = {
            carrierId: newCarrierEntity.id,
            trailerNumber: trailer.trailerNumber,
            capacityKg: trailer.capacityKg,
            currentLocation: trailer.currentLocation
        };
        this.commandBus.execute(new UpdateTrailerCommand(command.carrierDto.trailerId, updateTrailerDto))
        return {result: newCarrierEntity, message: "Carrier saved successfully"};
    }
}