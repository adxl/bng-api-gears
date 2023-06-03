import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './vehicles-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [],
  providers: [],
})
export class VehiclesTypesModule {}
