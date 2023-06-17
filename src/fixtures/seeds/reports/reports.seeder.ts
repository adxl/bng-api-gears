import { Report } from '../../../domains/reports/reports.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { reports } from './reports.data';

export class ReportsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.manager.getRepository(Report).insert([...reports]);
  }
}
