import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateReportDto, UpdateReportDtoWrapper } from './reports.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @EventPattern('reports.findAll')
  findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @EventPattern('reports.findOne')
  findOne(id: string): Promise<Report> {
    return this.reportsService.findOne(id);
  }

  @EventPattern('reports.create')
  create(data: CreateReportDto): Promise<InsertResult> {
    return this.reportsService.create(data);
  }

  @EventPattern('reports.update')
  update(data: UpdateReportDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.reportsService.update(data.id, data.body);
  }
}
