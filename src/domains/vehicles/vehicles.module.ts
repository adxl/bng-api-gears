import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from '../stations/stations.module';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicles.entity';
import { VehiclesService } from './vehicles.service';
import { ClientProxy } from '../../config/proxy.config';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Vehicle]),
    StationsModule,
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [VehiclesService],
})
export class VehiclesModule {}
