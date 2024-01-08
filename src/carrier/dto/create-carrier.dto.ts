import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCarrierDto {
  @IsNotEmpty()
  serialNumber: string;

  @IsOptional()
  maxServicePressurePsig: number;

  @IsOptional()
  carrierCapacityKg: number;

  @IsOptional()
  minOperatingTemperatureC: number;

  @IsOptional()
  maxOperatingTemperatureC: number;

  trailerId: string
}
