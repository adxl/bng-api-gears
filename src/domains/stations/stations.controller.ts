import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateStationDto, UpdateStationDtoWrapper } from './stations.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { StationsService } from './stations.service';
import { Station } from './stations.entity';

@Controller()
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @EventPattern('stations.findAll')
  findAll(): Promise<Station[]> {
    return this.stationsService.findAll();
  }

  @EventPattern('stations.findOne')
  findOne(id: string): Promise<Station> {
    return this.stationsService.findOne(id);
  }

  @EventPattern('stations.create')
  create(data: CreateStationDto): Promise<InsertResult> {
    return this.stationsService.create(data);
  }

  @EventPattern('stations.update')
  update(data: UpdateStationDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.stationsService.update(data.id, data.body);
  }

  @EventPattern('stations.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.stationsService.remove(id);
  }
}