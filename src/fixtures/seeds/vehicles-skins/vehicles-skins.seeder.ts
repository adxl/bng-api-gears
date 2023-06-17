import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { skins } from './vehicles-skins.data';
import { VehicleSkin } from '../../../domains/vehicles-skins/vehicles-skins.entity';

export class VehiclesSkinsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(VehicleSkin).insert([...skins]);
  }
}
