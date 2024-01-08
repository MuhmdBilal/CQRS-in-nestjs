import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {TrailerEntity} from "../../entities/trailer.entity"
import {GetAllTrailerQuery} from "../impl/get.all.trailer.query"

@QueryHandler(GetAllTrailerQuery)
export class GetAllTrailerHandler implements IQueryHandler<GetAllTrailerQuery>{

    constructor(
        @InjectRepository(TrailerEntity)
        private readonly trailerRepository: Repository<TrailerEntity>,
      ) {}

       async execute(query: GetAllTrailerQuery) {
        return this.trailerRepository.find(
          {
            relations : {carrier: true}
          }
        )
      }
}
