import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { CommandBus, QueryBus  } from '@nestjs/cqrs';
import {CreateCarrierCommand} from "./commands/impl/create.carrier.command"
import {GetAllCarrierQuery} from "./queries/impl/get.allCarrier.query"
import {GetOneCarrierQuery} from "./queries/impl/get.oneCarrier.query"

@Controller('carrier')
export class CarrierController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  @Post()
  create(@Body() createCarrierDto: CreateCarrierDto) {  
    return this.commandBus.execute(new CreateCarrierCommand(createCarrierDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllCarrierQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetOneCarrierQuery(id));
  }
}
