import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from '../stations/stations.module';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { RidesController } from './rides.controller';
import { Ride } from './rides.entity';
import { RidesService } from './rides.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ride]), StationsModule, VehiclesModule],
  controllers: [RidesController],
  providers: [RidesService],
})
export class RidesModule {}
