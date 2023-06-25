import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsOptional, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types';

export class CreateRideDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  vehicle: EntityReference;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  skin: EntityReference;

  @IsUUID(4)
  userId: string;
}

// ---

export class UpdateRideInformationDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  endStation: EntityReference;
}

export class UpdateRideInformationDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateRideInformationDto)
  body: UpdateRideInformationDto;
}

// ---

export class UpdateRideReviewDto {
  @IsInt()
  @Min(0)
  @Max(5)
  review: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateRideReviewDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateRideReviewDto)
  body: UpdateRideReviewDto;
}
