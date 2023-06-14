import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateStationDto, UpdateStationDto } from './stations.dto';
import { Station } from './stations.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationsRepository: Repository<Station>,
  ) {}

  findAll(): Promise<Station[]> {
    return this.stationsRepository.find();
  }

  async findOne(id: string): Promise<Station> {
    const data = await this.stationsRepository.findOne({
      relations: {
        vehicles: true,
      },
      where: {
        id,
        vehicles: {
          active: true,
        },
      },
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Station ${id} not found`));
    }

    return data;
  }

  async create(data: CreateStationDto): Promise<InsertResult> {
    return this.stationsRepository.insert(data);
  }

  async update(id: string, data: UpdateStationDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.stationsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.stationsRepository.delete(id);
  }
}
