import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { StationsSeeder } from './stations/stations.seeder';
import { VehiclesSeeder } from './vehicles/vehicles.seeder';
import { VehiclesTypesSeeder } from './vehicles-types/vehicles-types.seeder';
import { VehiclesSkinsSeeder } from './vehicles-skins/vehicles-skins.seeder';
import { RidesSeeder } from './rides/rides.seeder';
import { ReportsSeeder } from './reports/reports.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.synchronize(true);

    await runSeeder(dataSource, StationsSeeder);
    await runSeeder(dataSource, VehiclesTypesSeeder);
    await runSeeder(dataSource, VehiclesSkinsSeeder);
    await runSeeder(dataSource, VehiclesSeeder);
    await runSeeder(dataSource, RidesSeeder);
    await runSeeder(dataSource, ReportsSeeder);
  }
}
