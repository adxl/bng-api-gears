import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateVehicleTypeDto, UpdateVehicleTypeDto } from './vehicles-types.dto';
import { VehicleType } from './vehicles-types.entity';

@Injectable()
export class VehiclesTypesService {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehiclesTypesRepository: Repository<VehicleType>,
  ) {}

  findAll(): Promise<VehicleType[]> {
    return this.vehiclesTypesRepository.find();
  }

  async findOne(id: string): Promise<VehicleType> {
    const data = await this.vehiclesTypesRepository.findOne({
      where: { id },
      relations: ['vehicles'],
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Vehicle type ${id} not found`));
    }

    return data;
  }

  async create(data: CreateVehicleTypeDto): Promise<InsertResult> {
    return this.vehiclesTypesRepository.insert(data);
  }

  async update(id: string, data: UpdateVehicleTypeDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.vehiclesTypesRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.vehiclesTypesRepository.delete(id);
  }
}
