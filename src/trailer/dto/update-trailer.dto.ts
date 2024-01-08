import { IsOptional, IsUUID } from 'class-validator';

export class UpdateTrailerDto {
  @IsOptional()
  trailerNumber: string;

  @IsOptional()
  capacityKg: number;

  @IsOptional()
  currentLocation: string;

  @IsOptional()
  partnerId?: string;

  @IsUUID()
  carrierId: string;
}
