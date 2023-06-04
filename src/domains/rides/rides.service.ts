import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { VehiclesService } from '../vehicles/vehicles.service';
import { CreateRideDto, UpdateRideInformationDto, UpdateRideReviewDto } from './rides.dto';
import { Ride } from './rides.entity';

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly ridessRepository: Repository<Ride>,
    @Inject(VehiclesService) private readonly vehiclesService: VehiclesService,
  ) {}

  findAll(): Promise<Ride[]> {
    return this.ridessRepository.find({
      relations: ['vehicle', 'startStation', 'endStation'],
    });
  }

  async findOne(id: string): Promise<Ride> {
    const data = await this.ridessRepository.findOne({
      where: {
        id,
      },
      relations: ['vehicle', 'startStation', 'endStation'],
    });

    if (!data) {
      throw new RpcException(new NotFoundException());
    }

    return data;
  }

  async create(data: CreateRideDto): Promise<InsertResult> {
    const station = (await this.vehiclesService.findOne(data.vehicle.id)).station;

    if (!station) {
      throw new RpcException(new BadRequestException(`Vehicle ${data.vehicle.id} is not available`));
    }

    return this.ridessRepository.insert({ ...data, startStation: station });
  }

  async updateInformation(id: string, data: UpdateRideInformationDto): Promise<UpdateResult> {
    const ride = await this.findOne(id);

    const result = await this.ridessRepository.update(id, { ...data, endedAt: new Date() });

    await this.vehiclesService.update(ride.vehicle.id, { station: data.endStation });

    return result;
  }

  async updateReview(id: string, data: UpdateRideReviewDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.ridessRepository.update(id, data);
  }
}
