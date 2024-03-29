import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';

export class CreateAuctionDto {
  @IsInt()
  basePrice: number;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  vehicle: EntityReference;

  @IsInt()
  clickPrice: number;
}

export class CreateAuctionPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAuctionDto)
  body: CreateAuctionDto;
}
