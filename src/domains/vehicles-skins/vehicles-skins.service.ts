import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateVehicleSkinDto, UpdateVehicleSkinDto } from './vehicles-skins.dto';
import { VehicleSkin } from './vehicles-skins.entity';

@Injectable()
export class VehiclesSkinsService {
  constructor(
    @InjectRepository(VehicleSkin)
    private readonly vehiclesSkinsRepository: Repository<VehicleSkin>,
  ) {}

  findAll(): Promise<VehicleSkin[]> {
    return this.vehiclesSkinsRepository.find();
  }

  async findOne(id: string): Promise<VehicleSkin> {
    const data = await this.vehiclesSkinsRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Vehicle skin ${id} not found`));
    }

    return data;
  }

  async create(data: CreateVehicleSkinDto): Promise<InsertResult> {
    return this.vehiclesSkinsRepository.insert(data);
  }

  async update(id: string, data: UpdateVehicleSkinDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.vehiclesSkinsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.vehiclesSkinsRepository.delete(id);
  }
}
