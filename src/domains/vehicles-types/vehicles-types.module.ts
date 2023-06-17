import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesTypesController } from './vehicles-types.controller';
import { VehicleType } from './vehicles-types.entity';
import { VehiclesTypesService } from './vehicles-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehiclesTypesController],
  providers: [VehiclesTypesService],
})
export class VehiclesTypesModule {}
