import { ICommand } from '@nestjs/cqrs';
import {CreateCarrierDto} from "../../dto/create-carrier.dto"

export class CreateCarrierCommand implements ICommand {
    constructor(public readonly carrierDto: CreateCarrierDto) {}
}