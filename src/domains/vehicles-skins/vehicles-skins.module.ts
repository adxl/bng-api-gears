import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesSkinsController } from './vehicles-skins.controller';
import { VehicleSkin } from './vehicles-skins.entity';
import { VehiclesSkinsService } from './vehicles-skins.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleSkin])],
  controllers: [VehiclesSkinsController],
  providers: [VehiclesSkinsService],
})
export class VehiclesSkinsModule {}
