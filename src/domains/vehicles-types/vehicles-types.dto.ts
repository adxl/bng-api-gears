import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

export class CreateVehicleTypeDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  capsMilestone: number;
}

export class UpdateVehicleTypeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capsMilestone: number;
}

export class UpdateVehicleTypeDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateVehicleTypeDto)
  body: UpdateVehicleTypeDto;
}
