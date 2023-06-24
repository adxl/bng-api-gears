import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateVehicleDto, UpdateVehicleDtoWrapper } from './vehicles.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { AuthGuard } from '../../gears.guard';

@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @EventPattern('vehicles.findAll')
  @UseGuards(AuthGuard(['*']))
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @EventPattern('vehicles.findOne')
  findOne(id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @EventPattern('vehicles.create')
  create(data: CreateVehicleDto): Promise<InsertResult> {
    return this.vehiclesService.create(data);
  }

  @EventPattern('vehicles.update')
  update(data: UpdateVehicleDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.vehiclesService.update(data.id, data.body);
  }

  @EventPattern('vehicles.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.vehiclesService.remove(id);
  }
}
