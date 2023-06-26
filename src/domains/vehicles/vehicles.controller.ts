import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateVehiclePayload, UpdateVehiclePayload } from './vehicles.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

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
  findOne(@Payload() payload: RequestPayload): Promise<Vehicle> {
    return this.vehiclesService.findOne(payload.id);
  }

  @EventPattern('vehicles.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(@Payload() payload: CreateVehiclePayload): Promise<InsertResult> {
    return this.vehiclesService.create(payload.body);
  }

  @EventPattern('vehicles.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(@Payload() payload: UpdateVehiclePayload): Promise<UpdateResult> {
    return this.vehiclesService.update(payload.id, payload.body);
  }

  @EventPattern('vehicles.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.vehiclesService.remove(payload.id);
  }
}
