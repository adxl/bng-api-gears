import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { vehiclesTypes } from './vehicles-types.data';
import { VehicleType } from '../../../domains/vehicles-types/vehicles-types.entity';

export class VehiclesTypesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(VehicleType).insert([...vehiclesTypes]);
  }
}
