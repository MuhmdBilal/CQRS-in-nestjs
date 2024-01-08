import { ICommand } from '@nestjs/cqrs';
import {UpdateTrailerDto} from "../../dto/update-trailer.dto"
export class UpdateTrailerCommand implements ICommand {
 constructor(public readonly trailerId: string, public readonly trailerDto: UpdateTrailerDto) {}
}