import { Type } from 'class-transformer';
import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

export class CreateStationDto {
  @IsString()
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}

export class UpdateStationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsUUID()
  eventId?: string;
}

export class UpdateStationDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateStationDto)
  body: UpdateStationDto;
}
