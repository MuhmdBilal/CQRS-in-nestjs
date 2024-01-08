import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {NotFoundException} from "@nestjs/common";
import {DeleteTrailerCommand} from "../impl/trailer.delete.command"
import {TrailerEntity} from "../../entities/trailer.entity"

@CommandHandler(DeleteTrailerCommand)
export class DeleteTrailerHandler implements ICommandHandler<DeleteTrailerCommand> {
    constructor(
        @InjectRepository(TrailerEntity)
        private readonly trailerRepository: Repository<TrailerEntity>,
      ) {}

     async execute(command: DeleteTrailerCommand): Promise<any> {
           const {id} = command

           if (!id) {
            throw new NotFoundException("ID not found");
          }

          const updatedTrailer = await this.trailerRepository.findOne({
            where: { id: id },
          })
          if (!updatedTrailer) {
            throw new NotFoundException(
              `Trailer with ID ${id} not found.`,
            );
          }

          await this.trailerRepository.remove(updatedTrailer)
          return { message: "Trailer deleted successfully." };
      }
}
