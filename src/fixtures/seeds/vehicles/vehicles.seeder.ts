import { Vehicle } from '../../../domains/vehicles/vehicles.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { vehicles } from './vehicles.data';

export class VehiclesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Vehicle).insert([...vehicles]);
  }
}
