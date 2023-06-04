import { BadRequestException, Controller } from '@nestjs/common';
import { EventPattern, RpcException } from '@nestjs/microservices';
import { CreateRideDto, UpdateRideInformationDtoWrapper, UpdateRideReviewDtoWrapper } from './rides.dto';
import { InsertResult, UpdateResult } from 'typeorm';
import { RidesService } from './rides.service';
import { Ride } from './rides.entity';

@Controller()
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @EventPattern('rides.findAll')
  findAll(): Promise<Ride[]> {
    return this.ridesService.findAll();
  }

  @EventPattern('rides.findOne')
  findOne(id: string): Promise<Ride> {
    return this.ridesService.findOne(id);
  }

  @EventPattern('rides.create')
  create(data: CreateRideDto): Promise<InsertResult> {
    return this.ridesService.create(data);
  }

  @EventPattern('rides.info.update')
  updateInformation(data: UpdateRideInformationDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.ridesService.updateInformation(data.id, data.body);
  }

  @EventPattern('rides.review.update')
  updateReview(data: UpdateRideReviewDtoWrapper): Promise<UpdateResult> {
    if (Object.keys(data.body).length === 0) {
      throw new RpcException(new BadRequestException('Payload must not be empty'));
    }
    return this.ridesService.updateReview(data.id, data.body);
  }
}
