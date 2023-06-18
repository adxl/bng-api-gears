import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Station } from '../domains/stations/stations.entity';
import { MainSeeder } from './seeds/main.seeder';
import { Vehicle } from '../domains/vehicles/vehicles.entity';
import { VehicleType } from '../domains/vehicles-types/vehicles-types.entity';
import { VehicleSkin } from '../domains/vehicles-skins/vehicles-skins.entity';
import { Ride } from '../domains/rides/rides.entity';
import { Report } from '../domains/reports/reports.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // ssl: false,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
  entities: [Station, Vehicle, Ride, Report, VehicleType, VehicleSkin],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
