import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TrailerController } from './trailer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailerEntity } from './entities/trailer.entity';
import {CommandHandlers} from "./commands/handlers/index"
import {QueryHandlers} from "./queries/handlers/index"
import { CarrierEntity } from 'src/carrier/entities/carrier.entity';
@Module({
  imports: [CqrsModule,
    TypeOrmModule.forFeature([TrailerEntity]),
    TypeOrmModule.forFeature([CarrierEntity])
  ],
  controllers: [TrailerController],
  providers: [...CommandHandlers, ...QueryHandlers ],
})
export class TrailerModule {}
 