import { Type } from 'class-transformer';
import { IsEnum, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { EntityReference, RequestPayload } from '../../types';
import { ReportStatus } from './reports.entity';

export class CreateReportDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  ride: EntityReference;
}

export class CreateReportPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateReportDto)
  body: CreateReportDto;
}

export class UpdateReportDto {
  @IsEnum(ReportStatus)
  status: ReportStatus;
}

export class UpdateReportPayload extends RequestPayload {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateReportDto)
  body: UpdateReportDto;
}
