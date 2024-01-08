import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import { CreateTrailerDto} from "./dto/create-trailer.dto"
import { CommandBus, QueryBus  } from '@nestjs/cqrs';
import {UpdateTrailerCommand} from "./commands/impl/trailer.update.command"
import {DeleteTrailerCommand} from "./commands/impl/trailer.delete.command"
import {CreateTrailerCommand } from "./commands/impl/trailer.created.command"
import {GetAllTrailerQuery} from "./queries/impl/get.all.trailer.query";
import {GetOneTrailerQuery} from "./queries/impl/get.one.trailer.query"
@Controller('trailer')
export class TrailerController {
  constructor(private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  @Post()
  create(@Body() createTrailerDto: CreateTrailerDto) {
    return this.commandBus.execute(new CreateTrailerCommand(createTrailerDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllTrailerQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetOneTrailerQuery(id));
  }

  @Patch(':id')
  update(@Param('id') trailerId: string, @Body() updateTrailerDto: UpdateTrailerDto) {
    return this.commandBus.execute(new UpdateTrailerCommand(trailerId, updateTrailerDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteTrailerCommand(id));
  }
}
