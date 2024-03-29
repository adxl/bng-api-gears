import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateStationDto, UpdateStationDto, UpdateStationEventDto } from './stations.dto';
import { Station } from './stations.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationsRepository: Repository<Station>,
  ) {}

  async findAll(): Promise<Station[]> {
    return await this.stationsRepository.find({
      relations: {
        vehicles: {
          type: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<Station> {
    const data = await this.stationsRepository.findOne({
      relations: {
        vehicles: {
          type: true,
        },
      },
      where: { id },
    });

    if (!data) {
      throw new RpcException(new NotFoundException(`Station ${id} not found`));
    }

    return data;
  }

  async findMany(ids: string[]): Promise<Station[]> {
    return await this.stationsRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(data: CreateStationDto): Promise<InsertResult> {
    return this.stationsRepository.insert(data);
  }

  async update(id: string, data: UpdateStationDto | UpdateStationEventDto): Promise<UpdateResult> {
    await this.findOne(id);
    return this.stationsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.stationsRepository.delete(id);
  }
}
