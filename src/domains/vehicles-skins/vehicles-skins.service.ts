import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateVehicleSkinDto, UpdateVehicleSkinDto } from './vehicles-skins.dto';
import { VehicleSkin } from './vehicles-skins.entity';
import { ImageryHelper } from './imagery.helper';
import * as crypto from 'crypto';

@Injectable()
export class VehiclesSkinsService {
  constructor(
    @Inject(ImageryHelper) private readonly imageryHelper: ImageryHelper,
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
    const uuid: string = crypto.randomUUID() + data.file.filename;

    await this.imageryHelper.upload(uuid, data.file.buffer);

    data.image = uuid;

    return this.vehiclesSkinsRepository.insert(data);
  }

  async update(id: string, data: UpdateVehicleSkinDto, file: Express.Multer.File): Promise<UpdateResult> {
    await this.findOne(id);

    if (file) {
      if (!file.mimetype.match(/(^image)(\/)(jpe?g|png)/gm))
        throw new RpcException(new BadRequestException('You must provide a png, jpeg, or jpg image'));

      const uuid: string = crypto.randomUUID() + (file.filename ? file.filename : file.originalname);

      await this.imageryHelper.upload(uuid, file.buffer);

      data.image = process.env.BUCKET_URL + uuid;
    }

    return this.vehiclesSkinsRepository.update(id, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    const skin: VehicleSkin = await this.findOne(id);

    await this.imageryHelper.remove(skin.image.substring(skin.image.lastIndexOf('/')));

    return this.vehiclesSkinsRepository.delete(id);
  }
}
