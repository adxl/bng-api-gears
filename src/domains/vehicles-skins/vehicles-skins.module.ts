import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSkin } from './vehicles-skins.entity';
import { VehiclesSkinsController } from './vehicles-skins.controller';
import { VehiclesSkinsService } from './vehicles-skins.service';
import { ImageryHelper } from './imagery.helper';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleSkin])],
  controllers: [VehiclesSkinsController],
  providers: [VehiclesSkinsService, ImageryHelper],
})
export class VehiclesSkinsModule {}
