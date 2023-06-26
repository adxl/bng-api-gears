import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  CreateVehicleSkinPayload,
  UpdateVehicleSkinImagePayload,
  UpdateVehicleSkinPayload,
} from './vehicles-skins.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { VehiclesSkinsService } from './vehicles-skins.service';
import { VehicleSkin } from './vehicles-skins.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

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
  findOne(@Payload() payload: RequestPayload): Promise<VehicleSkin> {
    return this.vehiclesSkinsService.findOne(payload.id);
  }

  @EventPattern('vehiclesSkins.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(@Payload() payload: CreateVehicleSkinPayload): Promise<InsertResult> {
    return this.vehiclesSkinsService.create(payload.body);
  }

  @EventPattern('vehiclesSkins.update')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  update(@Payload() payload: UpdateVehicleSkinPayload): Promise<UpdateResult> {
    return this.vehiclesSkinsService.update(payload.id, payload.body);
  }

  @EventPattern('vehiclesSkins.uploadFile')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  uploadFile(@Payload() payload: UpdateVehicleSkinImagePayload): Promise<UpdateResult> {
    return this.vehiclesSkinsService.uploadFile(payload.id, payload.file);
  }

  @EventPattern('vehiclesSkins.remove')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  remove(@Payload() payload: RequestPayload): Promise<DeleteResult> {
    return this.vehiclesSkinsService.remove(payload.id);
  }
}
