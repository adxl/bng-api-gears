import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSkin } from './vehicles-skins.entity';
import { VehiclesSkinsController } from './vehicles-skins.controller';
import { VehiclesSkinsService } from './vehicles-skins.service';
import { ImageryHelper } from './imagery.helper';
import { ClientProxy } from '../../config/proxy.config';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([VehicleSkin]),
  ],
  controllers: [VehiclesSkinsController],
  providers: [VehiclesSkinsService, ImageryHelper],
  exports: [VehiclesSkinsService, ImageryHelper],
})
export class VehiclesSkinsModule {}
