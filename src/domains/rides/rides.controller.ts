import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateRidePayload, UpdateRideInformationPayload, UpdateRideReviewPayload } from './rides.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { RidesService } from './rides.service';
import { Ride } from './rides.entity';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { UserRole } from '../../types/user-role';
import { RequestPayload } from '../../types';

@Controller()
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @EventPattern('rides.findAll')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR]), AuthGuard)
  findAll(): Promise<Ride[]> {
    return this.ridesService.findAll();
  }

  @EventPattern('rides.self.findAll')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  findAllSelf(@Payload() payload: RequestPayload): Promise<Ride[]> {
    return this.ridesService.findAll(payload.userId);
  }

  @EventPattern('rides.findOne')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN]), AuthGuard)
  findOne(@Payload() payload: RequestPayload): Promise<Ride> {
    return this.ridesService.findOne(payload.id);
  }

  @EventPattern('rides.self.findCurrent')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  findOneSelf(@Payload() payload: RequestPayload): Promise<Ride> {
    return this.ridesService.findOneByUser(payload.userId);
  }

  @EventPattern('rides.create')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  create(@Payload() payload: CreateRidePayload): Promise<InsertResult> {
    return this.ridesService.create(payload.body);
  }

  @EventPattern('rides.info.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  updateInformation(@Payload() payload: UpdateRideInformationPayload): Promise<UpdateResult> {
    return this.ridesService.updateInformation(payload.id, payload.body);
  }

  @EventPattern('rides.review.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  updateReview(@Payload() payload: UpdateRideReviewPayload): Promise<UpdateResult> {
    return this.ridesService.updateReview(payload.id, payload.body);
  }
}
