import { Type } from 'class-transformer';
import { IsEnum, IsNotEmptyObject, IsUUID, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types';
import { ReportStatus } from './reports.entity';

export class CreateReportDto {
  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  ride: EntityReference;
}

export class UpdateReportDto {
  @IsEnum(ReportStatus)
  status: ReportStatus;
}

export class UpdateReportDtoWrapper {
  @IsUUID(4)
  id: string;

  @ValidateNested()
  @Type(() => UpdateReportDto)
  body: UpdateReportDto;
}
