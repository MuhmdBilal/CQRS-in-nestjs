import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class CreateTrailerDto {
  @IsNotEmpty()
  trailerNumber: string;

  @IsOptional()
  @IsNumber()
  capacityKg?: number;

  @IsDateString()
  lastAnnualDotInspectionAt?: Date;

  currentLocation?: string;

  carrier : string;
  partnerId?: string;
}
