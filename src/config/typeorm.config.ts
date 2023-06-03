import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Report } from 'src/domains/reports/reports.entity';
import { Ride } from 'src/domains/rides/rides.entity';
import { Station } from 'src/domains/stations/stations.entity';
import { VehicleSkin } from 'src/domains/vehicles-skins/vehicles-skins.entity';
import { VehicleType } from 'src/domains/vehicles-types/vehicles-types.entity';
import { Vehicle } from 'src/domains/vehicles/vehicles.entity';

const IS_LOCAL: boolean = process.env.STAGE === 'local';

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
