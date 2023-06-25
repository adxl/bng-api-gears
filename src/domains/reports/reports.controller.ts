import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateReportDto, UpdateReportDtoWrapper } from './reports.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @EventPattern('reports.findAll')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN]), AuthGuard)
  findAll(): Promise<Report[]> {
    return this.reportsService.findAll();
  }

  @EventPattern('reports.findOne')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN]), AuthGuard)
  findOne(id: string): Promise<Report> {
    return this.reportsService.findOne(id);
  }

  @EventPattern('reports.create')
  @UseGuards(new RolesGuard([UserRole.USER, UserRole.TECHNICIAN]), AuthGuard)
  create(data: CreateReportDto): Promise<InsertResult> {
    return this.reportsService.create(data);
  }

  @EventPattern('reports.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(data: UpdateReportDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.reportsService.update(data.id, data.body);
  }
}
