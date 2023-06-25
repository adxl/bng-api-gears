import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { AUTH_SERVICE } from '../../constants';
import { AuthGuard } from '../../gears.guard';
import { VehiclesTypesController } from './vehicles-types.controller';
import { VehicleType } from './vehicles-types.entity';
import { VehiclesTypesService } from './vehicles-types.service';

@Module({
  imports: [
    ClientProxy(AUTH_SERVICE, process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([VehicleType]),
  ],
  controllers: [VehiclesTypesController],
  providers: [VehiclesTypesService, AuthGuard, AUTH_SERVICE],
  exports: [VehiclesTypesService, AuthGuard, AUTH_SERVICE],
})
export class VehiclesTypesModule {}
