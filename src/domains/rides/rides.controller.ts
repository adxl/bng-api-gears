import { BadRequestException, Controller, Req, UseGuards } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateRideDto, UpdateRideInformationDtoWrapper, UpdateRideReviewDtoWrapper } from './rides.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { RidesService } from './rides.service';
import { Ride } from './rides.entity';
import { AuthGuard, RolesGuard } from '../../gears.guard';
import { UserRole } from '../../types/user-role';
import { RequestToken } from '../../types/token';

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
  findAllSelf(@Req() request: RequestToken): Promise<Ride[]> {
    return this.ridesService.findAll(request.userId);
  }

  @EventPattern('rides.findOne')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR, UserRole.TECHNICIAN]), AuthGuard)
  findOne(id: string): Promise<Ride> {
    return this.ridesService.findOne(id);
  }

  @EventPattern('rides.self.findCurrent')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  findOneSelf(@Req() request: RequestToken): Promise<Ride> {
    return this.ridesService.findOne(request.userId);
  }

  @EventPattern('rides.create')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  create(data: CreateRideDto): Promise<InsertResult> {
    return this.ridesService.create(data);
  }

  @EventPattern('rides.info.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  updateInformation(data: UpdateRideInformationDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.ridesService.updateInformation(data.id, data.body);
  }

  @EventPattern('rides.review.update')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  updateReview(data: UpdateRideReviewDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.ridesService.updateReview(data.id, data.body);
  }
}
