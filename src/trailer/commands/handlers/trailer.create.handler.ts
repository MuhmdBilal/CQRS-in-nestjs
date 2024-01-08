import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException
} from "@nestjs/common";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailerEntity } from "../../entities/trailer.entity"
import { CreateTrailerCommand } from "../impl/trailer.created.command"
import { TrailerInspectionStatus, TrailerLoadingStatus } from 'src/trailer/enums/trailer-status.enum';

@CommandHandler(CreateTrailerCommand)
export class TrailerCreatedHandler implements ICommandHandler<CreateTrailerCommand> {
  constructor(
    @InjectRepository(TrailerEntity)
    private readonly trailerRepository: Repository<TrailerEntity>,
  ) { }

  async execute(command: CreateTrailerCommand) {

    const existingTrailer = await this.trailerRepository.findOne({
      where: { trailerNumber: command.trailerDto.trailerNumber },
    });

    if (existingTrailer) {
      throw new BadRequestException(
        `Trailer with serial number ${command.trailerDto.trailerNumber} already exists`,
      );
    }
    const newTrailer = new TrailerEntity();
    newTrailer.capacityKg = command.trailerDto.capacityKg;
    newTrailer.trailerNumber = command.trailerDto.trailerNumber;
    newTrailer.lastAnnualDotInspectionAt = command.trailerDto.lastAnnualDotInspectionAt;
    newTrailer.currentLocation = command.trailerDto.currentLocation;
    newTrailer.partnerId = command.trailerDto.partnerId;
    newTrailer.loadingStatus = TrailerLoadingStatus.FillReady;
    newTrailer.inspectionStatus = TrailerInspectionStatus.Approaching;

    let addTrailer = await this.trailerRepository.save(newTrailer);
    return {result: addTrailer, message: "Trailer added successfully"}
  }
}