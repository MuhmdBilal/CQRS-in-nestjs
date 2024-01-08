import { ICommand } from '@nestjs/cqrs';

export class DeleteTrailerCommand implements ICommand {
    constructor(public readonly id: string) {}
}