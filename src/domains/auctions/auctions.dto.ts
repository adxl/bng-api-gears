import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsUUID, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from 'src/types';

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

export class CreateAuctionClickDto {
  @IsUUID(4)
  userId: string;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  auction: EntityReference;
}

export class CreateAuctionClickPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAuctionClickDto)
  body: CreateAuctionClickDto;
}
