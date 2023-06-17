import { Ride } from '../../../domains/rides/rides.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { rides } from './rides.data';

export class RidesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Ride).insert([...rides]);
  }
}
