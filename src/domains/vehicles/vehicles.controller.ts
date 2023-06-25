import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateVehicleDto, UpdateVehicleDtoWrapper } from './vehicles.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @EventPattern('vehicles.findAll')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN, UserRole.INSTRUCTOR]), AuthGuard)
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @EventPattern('vehicles.findOne')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN, UserRole.INSTRUCTOR]), AuthGuard)
  findOne(id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }

  @EventPattern('vehicles.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(data: CreateVehicleDto): Promise<InsertResult> {
    return this.vehiclesService.create(data);
  }

  @EventPattern('vehicles.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(data: UpdateVehicleDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.vehiclesService.update(data.id, data.body);
  }

  @EventPattern('vehicles.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.vehiclesService.remove(id);
  }
}
