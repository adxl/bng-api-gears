import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateVehicleTypePayload, UpdateVehicleTypePayload } from './vehicles-types.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesTypesService } from './vehicles-types.service';
import { VehicleType } from './vehicles-types.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class VehiclesTypesController {
  constructor(private readonly vehiclesTypesService: VehiclesTypesService) {}

  @EventPattern('vehiclesTypes.findAll')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findAll(): Promise<VehicleType[]> {
    return this.vehiclesTypesService.findAll();
  }

  @EventPattern('vehiclesTypes.findOne')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findOne(@Payload() payload: RequestPayload): Promise<VehicleType> {
    return this.vehiclesTypesService.findOne(payload.id);
  }

  @EventPattern('vehiclesTypes.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(@Payload() payload: CreateVehicleTypePayload): Promise<InsertResult> {
    return this.vehiclesTypesService.create(payload.body);
  }

  @EventPattern('vehiclesTypes.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(@Payload() payload: UpdateVehicleTypePayload): Promise<UpdateResult> {
    return this.vehiclesTypesService.update(payload.id, payload.body);
  }

  @EventPattern('vehiclesTypes.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.vehiclesTypesService.remove(payload.id);
  }
}
