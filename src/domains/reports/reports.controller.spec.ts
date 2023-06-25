import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';

import { ReportsController } from './reports.controller';
import { Report, ReportStatus } from './reports.entity';
import { ReportsModule } from './reports.module';
import { ReportsService } from './reports.service';

describe('Tests reports', () => {
  let reportsController: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([Report]), ReportsModule],
      providers: [ReportsService],
      controllers: [ReportsController],
    }).compile();

    reportsController = module.get(ReportsController);
  });

  describe('Test find all reports', () => {
    it('should return an array of reports', async () => {
      const reports = await reportsController.findAll();
      expect(Array.isArray(reports)).toBe(true);
    });
  });

  describe('Test find one report', () => {
    it('should return one report', async () => {
      const report = await reportsController.findOne('66666666-31bb-4b54-98f1-77610bc44b03');

      expect(report.status).toBe(ReportStatus.OPEN);
      expect(report.ride.id).toBe('55555555-b4c5-4aad-887b-ff93aa1a6e08');
    });

    it('should throws a not found exception', async () => {
      await expect(reportsController.findOne('66666666-31bb-4b54-98f1-77610bc44b53')).rejects.toThrow();
    });
  });

  describe('Test create report', () => {
    it('should return an UUID', async () => {
      const data = {
        ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e05' },
      };
      expect((await reportsController.create(data)).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update report', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '66666666-31bb-4b54-98f1-77610bc44b03',
        body: {
          status: ReportStatus.DONE,
        },
      };
      expect((await reportsController.update(data)).affected).toEqual(1);
    });
  });
});
