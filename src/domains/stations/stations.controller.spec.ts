import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';
import { StationsModule } from './stations.module';
import { Station } from './stations.entity';
import { AuthGuard } from '../../auth.guard';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests stations', () => {
  let stationsController: StationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Station]),
        StationsModule,
      ],
      providers: [StationsService, AuthGuard],
      controllers: [StationsController],
    }).compile();

    stationsController = module.get(StationsController);
  });

  describe('Test find all stations', () => {
    it('should return an array of stations', async () => {
      const stations = await stationsController.findAll();
      expect(Array.isArray(stations)).toBe(true);
    });
  });

  describe('Test find one station', () => {
    it('should return one station', async () => {
      const station = await stationsController.findOne({ id: '11111111-bab3-439d-965d-0522568b0004' });

      expect(station.latitude).toBe(48.87923064626206);
      expect(station.longitude).toBe(2.30969070719186);
    });

    it('should throws a not found exception', async () => {
      await expect(stationsController.findOne({ id: '11111111-bab3-439d-965d-0522568b0222' })).rejects.toThrow();
    });
  });

  describe('Test create station', () => {
    it('should return an UUID', async () => {
      const body = {
        name: 'Nation ruins',
        latitude: 48.485415274157,
        longitude: 2.55771897412,
      };
      expect((await stationsController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update station', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '11111111-bab3-439d-965d-0522568b0007',
        body: {
          active: false,
        },
      };
      expect((await stationsController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one station', () => {
    it('should return the number of affected resources', async () => {
      const data = '11111111-bab3-439d-965d-0522568b0000';
      expect((await stationsController.remove({ id: data })).affected).toEqual(1);
    });
  });
});
