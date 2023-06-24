import { INestMicroservice } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfig } from './config/typeorm.config';
import { ReportsModule } from './domains/reports/reports.module';
import { RidesModule } from './domains/rides/rides.module';
import { StationsModule } from './domains/stations/stations.module';
import { VehiclesSkinsModule } from './domains/vehicles-skins/vehicles-skins.module';
import { VehiclesTypesModule } from './domains/vehicles-types/vehicles-types.module';
import { VehiclesModule } from './domains/vehicles/vehicles.module';

import { bootstrap } from './main';

describe('Tests entrypoint', () => {
  let appController: AppController;
  let appInstance: INestMicroservice;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([
          ReportsModule,
          RidesModule,
          StationsModule,
          VehiclesModule,
          VehiclesSkinsModule,
          VehiclesTypesModule,
        ]),
      ],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    appController = module.get(AppController);
    appInstance = await bootstrap();
  });

  afterAll((done) => {
    appInstance.close();
    done();
  });

  describe('Start the server', () => {
    it('it should start the server', () => {
      expect(appInstance).toBeDefined();
    });
  });

  describe('Test call index', () => {
    it('should return a welcome string', () => {
      expect(appController.index()).toEqual('Welcome to Gears API');
    });
  });

  describe('Test kill', () => {
    it('should return exception ServiceUnavailableException', () => {
      expect(() => appController.kill()).toThrow();
    });
  });
});
