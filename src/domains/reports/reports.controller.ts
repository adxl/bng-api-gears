import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateReportPayload, UpdateReportPayload } from './reports.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { ReportsService } from './reports.service';
import { Report } from './reports.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

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
  findOne(@Payload() payload: RequestPayload): Promise<Report> {
    return this.reportsService.findOne(payload.id);
  }

  @EventPattern('reports.create')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  create(@Payload() payload: CreateReportPayload): Promise<InsertResult> {
    return this.reportsService.create(payload.body);
  }

  @EventPattern('reports.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(@Payload() payload: UpdateReportPayload): Promise<UpdateResult> {
    return this.reportsService.update(payload.id, payload.body);
  }
}
