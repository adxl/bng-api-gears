import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { Station } from '../stations/stations.entity';
import { StationsService } from '../stations/stations.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicles.entity';
import { VehiclesModule } from './vehicles.module';
import { VehiclesService } from './vehicles.service';

describe('Tests vehicles', () => {
  let vehiclesController: VehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Vehicle, Station]),
        VehiclesModule,
      ],
      providers: [VehiclesService, StationsService],
      controllers: [VehiclesController],
    }).compile();

    vehiclesController = module.get(VehiclesController);
  });

  describe('Test find all vehicles', () => {
    it('should return an array of vehicles', async () => {
      const vehicles = await vehiclesController.findAll();
      expect(Array.isArray(vehicles)).toBe(true);
    });
  });

  describe('Test find one vehicle', () => {
    it('should return one vehicle', async () => {
      const vehicle = await vehiclesController.findOne({ id: '22222222-bab3-439d-965d-0522568b0012' });

      expect(vehicle.type.id).toBe('33333333-bab3-439d-965d-0522568b0003');
      expect(vehicle.station.id).toBe('11111111-bab3-439d-965d-0522568b0001');
    });

    it('should throws a not found exception', async () => {
      await expect(vehiclesController.findOne({ id: '22222222-bab3-439d-965d-0522568b0222' })).rejects.toThrow();
    });
  });

  describe('Test create vehicle', () => {
    it('should return an UUID', async () => {
      const body = {
        year: 2085,
        type: { id: '33333333-bab3-439d-965d-0522568b0000' },
        station: { id: '11111111-bab3-439d-965d-0522568b0004' },
      };
      expect((await vehiclesController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update vehicle', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '22222222-bab3-439d-965d-0522568b0012',
        body: {
          year: 2333,
          active: false,
        },
      };
      expect((await vehiclesController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one vehicle', () => {
    it('should return the number of affected resources', async () => {
      const data = '22222222-bab3-439d-965d-0522568b0058';
      expect((await vehiclesController.remove({ id: data })).affected).toEqual(1);
    });
  });
});
