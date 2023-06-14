import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateVehicleTypeDto, UpdateVehicleTypeDtoWrapper } from './vehicles-types.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesTypesService } from './vehicles-types.service';
import { VehicleType } from './vehicles-types.entity';

@Controller()
export class VehiclesTypesController {
  constructor(private readonly vehiclesTypesService: VehiclesTypesService) {}

  @EventPattern('vehiclesTypes.findAll')
  findAll(): Promise<VehicleType[]> {
    return this.vehiclesTypesService.findAll();
  }

  @EventPattern('vehiclesTypes.findOne')
  findOne(id: string): Promise<VehicleType> {
    return this.vehiclesTypesService.findOne(id);
  }

  @EventPattern('vehiclesTypes.create')
  create(data: CreateVehicleTypeDto): Promise<InsertResult> {
    return this.vehiclesTypesService.create(data);
  }

  @EventPattern('vehiclesTypes.update')
  update(data: UpdateVehicleTypeDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.vehiclesTypesService.update(data.id, data.body);
  }

  @EventPattern('vehiclesTypes.remove')
  remove(id: string): Promise<DeleteResult> {
    return this.vehiclesTypesService.remove(id);
  }
}
