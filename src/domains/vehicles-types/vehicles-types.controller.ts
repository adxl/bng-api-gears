import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateVehicleTypeDto, UpdateVehicleTypeDtoWrapper } from './vehicles-types.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesTypesService } from './vehicles-types.service';
import { VehicleType } from './vehicles-types.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';

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
  findOne(id: string): Promise<VehicleType> {
    return this.vehiclesTypesService.findOne(id);
  }

  @EventPattern('vehiclesTypes.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(data: CreateVehicleTypeDto): Promise<InsertResult> {
    return this.vehiclesTypesService.create(data);
  }

  @EventPattern('vehiclesTypes.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(data: UpdateVehicleTypeDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.vehiclesTypesService.update(data.id, data.body);
  }

  @EventPattern('vehiclesTypes.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.vehiclesTypesService.remove(id);
  }
}
