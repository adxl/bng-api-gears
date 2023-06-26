import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { StationsModule } from '../stations/stations.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { RidesController } from './rides.controller';
import { Ride } from './rides.entity';
import { RidesService } from './rides.service';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Ride]),
    StationsModule,
    VehiclesModule,
  ],
  controllers: [RidesController],
  providers: [RidesService],
  exports: [RidesService],
})
export class RidesModule {}
