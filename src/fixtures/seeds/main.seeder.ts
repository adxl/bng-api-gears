import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { StationsSeeder } from './stations/stations.seeder';
import { VehiclesSeeder } from './vehicles/vehicles.seeder';
import { VehiclesTypesSeeder } from './vehicles-types/vehicles-types.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.synchronize(true);

    await runSeeder(dataSource, StationsSeeder);
    await runSeeder(dataSource, VehiclesTypesSeeder);
    await runSeeder(dataSource, VehiclesSeeder);
  }
}
