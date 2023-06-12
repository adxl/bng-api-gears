import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateReportDto, UpdateReportDto } from './reports.dto';
import { Report, ReportStatus } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  findAll(): Promise<Report[]> {
    return this.reportsRepository.find();
  }

  async findOne(id: string): Promise<Report> {
    const data = await this.reportsRepository.findOne({
      where: { id },
      relations: ['ride'],
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Report ${id} not found`));
    }

    return data;
  }

  async create(data: CreateReportDto): Promise<InsertResult> {
    console.log(data);
    return this.reportsRepository.insert({
      ...data,
      status: ReportStatus.OPEN,
    });
  }

  async update(id: string, data: UpdateReportDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.reportsRepository.update(id, data);
  }
}
