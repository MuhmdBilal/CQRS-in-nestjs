import { IQuery } from '@nestjs/cqrs';

export class GetOneTrailerQuery implements IQuery {
    constructor(public readonly id: string) { }
}