import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmptyObject, IsOptional, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { EntityReference } from 'src/types';

export class CreateVehicleDto {
  @ValidateNested()
  @Type(() => EntityReference)
  // @IsNotEmptyObject()
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

export class UpdateVehicleDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateVehicleDto)
  body: UpdateVehicleDto;
}
