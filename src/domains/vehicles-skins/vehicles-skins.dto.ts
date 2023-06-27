import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { RequestPayload } from '../../types';

export class CreateVehicleSkinDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  tier: number;

  @IsOptional()
  @IsString()
  image: string;
}

export class CreateVehicleSkinPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateVehicleSkinDto)
  body: CreateVehicleSkinDto;
}

// ---

export class UpdateVehicleSkinDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  tier?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateVehicleSkinPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateVehicleSkinDto)
  body: UpdateVehicleSkinDto;
}

//---

export class UpdateVehicleSkinImagePayload extends RequestPayload {
  @IsNotEmpty()
  file: Express.Multer.File;
}
