import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { RequestPayload } from '../../types';

export class CreateVehicleTypeDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  capsMilestone: number;
}

export class CreateVehicleTypePayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateVehicleTypePayload)
  body: CreateVehicleTypeDto;
}

// ---

export class UpdateVehicleTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capsMilestone?: number;
}

export class UpdateVehicleTypePayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateVehicleTypeDto)
  body: UpdateVehicleTypeDto;
}
