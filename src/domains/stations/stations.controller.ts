import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateStationDto, UpdateStationDtoWrapper } from './stations.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { StationsService } from './stations.service';
import { Station } from './stations.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @EventPattern('stations.findAll')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findAll(): Promise<Station[]> {
    return this.stationsService.findAll();
  }

  @EventPattern('stations.findOne')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findOne(id: string): Promise<Station> {
    return this.stationsService.findOne(id);
  }

  @EventPattern('stations.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(data: CreateStationDto): Promise<InsertResult> {
    return this.stationsService.create(data);
  }

  @EventPattern('stations.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(data: UpdateStationDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.stationsService.update(data.id, data.body);
  }

  @EventPattern('stations.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.stationsService.remove(id);
  }
}
