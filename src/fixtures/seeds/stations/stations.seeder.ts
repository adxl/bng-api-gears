import { Station } from '../../../domains/stations/stations.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { stations } from './stations.data';

export class StationsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Station).insert([...stations]);
  }
}
