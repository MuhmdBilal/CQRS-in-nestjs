import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {TrailerEntity} from "../../entities/trailer.entity"
import {GetOneTrailerQuery } from "../impl/get.one.trailer.query"
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetOneTrailerQuery)
export class GetOneTrailerHandler implements IQueryHandler<GetOneTrailerQuery> {
    constructor(
        @InjectRepository(TrailerEntity)
        private readonly trailerRepository: Repository<TrailerEntity>,
      ) {}

     async execute(query: GetOneTrailerQuery) {
          const {id} = query;
          if (!id) {
            throw new NotFoundException("ID not found");
          }

          const getOneTrailer = await this.trailerRepository.findOne({
            where : {id: id}
          })

          if (!getOneTrailer) {
            throw new NotFoundException(
              `Trailer with ID ${id} not found`,
            );
          }
      
          return getOneTrailer;
      }
}