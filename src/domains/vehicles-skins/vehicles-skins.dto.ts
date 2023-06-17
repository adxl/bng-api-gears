import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { EntityReference } from 'src/types';

export class CreateVehicleSkinDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  tier: number;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  type: EntityReference;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateVehicleSkinDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  tier: number;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateVehicleSkinDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateVehicleSkinDto)
  body: UpdateVehicleSkinDto;
}

export class UploadFileDto {
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  file: Express.Multer.File;
}
