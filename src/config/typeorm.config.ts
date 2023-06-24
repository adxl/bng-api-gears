import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Report } from '../domains/reports/reports.entity';
import { Ride } from '../domains/rides/rides.entity';
import { Station } from '../domains/stations/stations.entity';
import { VehicleSkin } from '../domains/vehicles-skins/vehicles-skins.entity';
import { VehicleType } from '../domains/vehicles-types/vehicles-types.entity';
import { Vehicle } from '../domains/vehicles/vehicles.entity';

const IS_LOCAL: boolean = process.env.STAGE === 'local' || process.env.STAGE === 'test';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Vehicle, Station, Ride, Report, VehicleType, VehicleSkin],
  synchronize: IS_LOCAL,
  ssl: !IS_LOCAL,
  extra: IS_LOCAL
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      },
};
