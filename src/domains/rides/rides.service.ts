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
    private readonly ridesRepository: Repository<Ride>,
    @Inject(VehiclesService) private readonly vehiclesService: VehiclesService,
  ) {}

  findAll(userId?: string): Promise<Ride[]> {
    const relations = {
      vehicle: { type: true },
      startStation: true,
      endStation: true,
    };

    if (userId) {
      return this.ridesRepository.find({ where: { userId }, relations });
    }

    return this.ridesRepository.find({ relations });
  }

  async findOne(id: string): Promise<Ride> {
    const data = await this.ridesRepository.findOne({
      where: { id },
      relations: ['vehicle', 'startStation', 'endStation'],
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Ride ${id} not found`));
    }

    return data;
  }

  async findOneByUser(userId: string): Promise<Ride> {
    const data = await this.ridesRepository.findOne({
      where: { id: userId },
      relations: {
        vehicle: { type: true },
        startStation: true,
        endStation: true,
      },
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`No ride in progress`));
    }

    return data;
  }

  async create(data: CreateRideDto): Promise<InsertResult> {
    const station = (await this.vehiclesService.findOne(data.vehicle.id)).station;

    if (!station) {
      throw new RpcException(new BadRequestException(`Vehicle ${data.vehicle.id} is not available`));
    }

    return this.ridesRepository.insert({ ...data, startStation: station });
  }

  async updateInformation(id: string, data: UpdateRideInformationDto): Promise<UpdateResult> {
    const ride = await this.findOne(id);

    const result = await this.ridesRepository.update(id, { ...data, endedAt: new Date() });

    await this.vehiclesService.update(ride.vehicle.id, { station: data.endStation });

    return result;
  }

  async updateReview(id: string, data: UpdateRideReviewDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.ridesRepository.update(id, data);
  }
}
