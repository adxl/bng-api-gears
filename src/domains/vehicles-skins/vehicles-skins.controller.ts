import { BadRequestException, Controller, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateVehicleSkinDto, UpdateVehicleSkinDtoWrapper, UploadFileDto } from './vehicles-skins.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesSkinsService } from './vehicles-skins.service';
import { VehicleSkin } from './vehicles-skins.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';

@Controller()
export class VehiclesSkinsController {
  constructor(private readonly vehiclesSkinsService: VehiclesSkinsService) {}

  @EventPattern('vehiclesSkins.findAll')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findAll(): Promise<VehicleSkin[]> {
    return this.vehiclesSkinsService.findAll();
  }

  @EventPattern('vehiclesSkins.findOne')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findOne(id: string): Promise<VehicleSkin> {
    return this.vehiclesSkinsService.findOne(id);
  }

  @EventPattern('vehiclesSkins.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(data: CreateVehicleSkinDto): Promise<InsertResult> {
    return this.vehiclesSkinsService.create(data);
  }

  @EventPattern('vehiclesSkins.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(data: UpdateVehicleSkinDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.vehiclesSkinsService.update(data.id, data.body);
  }

  @EventPattern('vehiclesSkins.uploadFile')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  uploadFile(data: UploadFileDto): Promise<UpdateResult> {
    return this.vehiclesSkinsService.uploadFile(data.id, data.file);
  }

  @EventPattern('vehiclesSkins.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(id: string): Promise<DeleteResult> {
    return this.vehiclesSkinsService.remove(id);
  }
}
