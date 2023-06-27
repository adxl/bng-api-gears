import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateStationPayload, UpdateStationEventPayload, UpdateStationPayload } from './stations.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { StationsService } from './stations.service';
import { Station } from './stations.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

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
  findOne(@Payload() payload: RequestPayload): Promise<Station> {
    return this.stationsService.findOne(payload.id);
  }

  @EventPattern('stations.findMany')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findMany(@Payload() payload: RequestPayload): Promise<Station[]> {
    return this.stationsService.findMany(payload.ids);
  }

  @EventPattern('stations.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(@Payload() payload: CreateStationPayload): Promise<InsertResult> {
    return this.stationsService.create(payload.body);
  }

  @EventPattern('stations.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(@Payload() payload: UpdateStationPayload): Promise<UpdateResult> {
    return this.stationsService.update(payload.id, payload.body);
  }

  @EventPattern('stations.event.update')
  @UseGuards(new RolesGuard([UserRole.ORGANIZER]), AuthGuard)
  updateEvent(@Payload() payload: UpdateStationEventPayload): Promise<UpdateResult> {
    return this.stationsService.update(payload.id, payload.body);
  }

  @EventPattern('stations.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.stationsService.remove(payload.id);
  }
}
