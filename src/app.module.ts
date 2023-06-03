import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { VehiclesModule } from './domains/vehicles/vehicles.module';
import { RidesModule } from './domains/rides/rides.module';
import { ReportsModule } from './domains/reports/reports.module';
import { StationsModule } from './domains/stations/stations.module';
import { VehiclesSkinsModule } from './domains/vehicles-skins/vehicles-skins.module';
import { VehiclesTypesModule } from './domains/vehicles-types/vehicles-types.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    VehiclesModule,
    RidesModule,
    ReportsModule,
    StationsModule,
    VehiclesSkinsModule,
    VehiclesTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
