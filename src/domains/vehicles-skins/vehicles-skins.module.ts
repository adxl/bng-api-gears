import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSkin } from './vehicles-skins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleSkin])],
  controllers: [],
  providers: [],
})
export class VehiclesSkinsModule {}
