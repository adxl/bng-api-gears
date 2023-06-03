import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.dto';
import { Vehicle } from './vehicles.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehiclesRepository: Repository<Vehicle>,
  ) {}

  findAll(): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({
      relations: ['station'],
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const data = await this.vehiclesRepository.findOneBy({ id });

    if (!data) {
      throw new RpcException(new NotFoundException());
    }

    return data;
  }

  async create(data: CreateVehicleDto): Promise<InsertResult> {
    return this.vehiclesRepository.insert(data);
  }

  async update(id: string, data: UpdateVehicleDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.vehiclesRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.vehiclesRepository.delete(id);
  }
}
