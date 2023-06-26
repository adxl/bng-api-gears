import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmptyObject, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

export class CreateVehicleDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  type: EntityReference;

  @IsInt()
  @Min(2000)
  @Max(3000)
  year: number;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  station: EntityReference;
}

export class CreateVehiclePayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateVehicleDto)
  body: CreateVehicleDto;
}

// ---

export class UpdateVehicleDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => EntityReference)
  type?: EntityReference;

  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(3000)
  year?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => EntityReference)
  station?: EntityReference;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateVehiclePayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateVehicleDto)
  body: UpdateVehicleDto;
}
