import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailerModule } from './trailer/trailer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierModule } from './carrier/carrier.module';
import * as dotenv from "dotenv";
import { ormConfig } from './ormconfig';
dotenv.config();
@Module({
  imports: [
    TrailerModule,
    CarrierModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
