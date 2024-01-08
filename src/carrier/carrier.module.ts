import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CarrierController } from './carrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierEntity } from './entities/carrier.entity';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { TrailerEntity } from 'src/trailer/entities/trailer.entity';

@Module({
  controllers: [CarrierController],
  providers: [...CommandHandlers, ...QueryHandlers ],
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TrailerEntity]),
    TypeOrmModule.forFeature([CarrierEntity])
  ]
})
export class CarrierModule {}
