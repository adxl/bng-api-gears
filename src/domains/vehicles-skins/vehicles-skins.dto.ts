import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min, ValidateNested } from 'class-validator';

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
