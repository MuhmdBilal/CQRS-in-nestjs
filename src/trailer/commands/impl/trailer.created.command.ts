import { ICommand } from '@nestjs/cqrs';
import {CreateTrailerDto} from "../../dto/create-trailer.dto"

export class CreateTrailerCommand implements ICommand {
    constructor(public readonly trailerDto: CreateTrailerDto) {}
}