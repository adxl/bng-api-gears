import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { RequestPayload } from '../../types';

export class CreateStationDto {
  @IsString()
  name: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}

export class CreateStationPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateStationDto)
  body: CreateStationDto;
}

// ---

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

export class UpdateStationPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateStationDto)
  body: UpdateStationDto;
}
