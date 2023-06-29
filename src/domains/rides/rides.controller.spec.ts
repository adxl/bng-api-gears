import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../auth.guard';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { Station } from '../stations/stations.entity';
import { StationsService } from '../stations/stations.service';
import { Vehicle } from '../vehicles/vehicles.entity';
import { VehiclesService } from '../vehicles/vehicles.service';
import { RidesController } from './rides.controller';
import { Ride } from './rides.entity';
import { RidesModule } from './rides.module';
import { RidesService } from './rides.service';
import { ClientProxy } from '../../config/proxy.config';

describe('Tests rides', () => {
  let ridesController: RidesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Ride, Vehicle, Station]),
        RidesModule,
      ],
      providers: [RidesService, VehiclesService, StationsService, AuthGuard],
      controllers: [RidesController],
    }).compile();

    ridesController = module.get(RidesController);
  });

  describe('Test find all rides', () => {
    it('should return an array of rides', async () => {
      const rides = await ridesController.findAll();
      expect(Array.isArray(rides)).toBe(true);
    });
  });

  describe('Test find one ride', () => {
    it('should return one ride', async () => {
      const ride = await ridesController.findOne({ id: '55555555-b4c5-4aad-887b-ff93aa1a6e03' });

      expect(ride.vehicle.id).toBe('22222222-bab3-439d-965d-0522568b0069');
      expect(ride.userId).toBe('c63a4bd1-cabd-44ee-b911-9ee2533dd003');
    });

    it('should throws a not found exception', async () => {
      await expect(ridesController.findOne({ id: '55555555-b4c5-4aad-887b-ff93aa1a6e55' })).rejects.toThrow();
    });
  });

  describe('Test create ride', () => {
    it('should return an UUID', async () => {
      const body = {
        vehicle: { id: '22222222-bab3-439d-965d-0522568b0089' },
        userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd003',
        skin: { id: '44444444-bab3-439d-965d-0522568b0001' },
      };
      expect((await ridesController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update ride information', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '55555555-b4c5-4aad-887b-ff93aa1a6e07',
        body: {
          endStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
        },
      };
      expect((await ridesController.updateInformation(data)).affected).toEqual(1);
    });
  });

  describe('Test end ride', () => {
    it('should return the ending string', async () => {
      const data = {
        id: '55555555-b4c5-4aad-887b-ff93aa1a6e07',
        body: {
          endStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
        },
      };
      expect(typeof (await ridesController.endRide(data))).toBe('string');
    });
  });

  describe('Test update ride review', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '55555555-b4c5-4aad-887b-ff93aa1a6e08',
        body: {
          review: 5,
          comment: 'Équipement de qualité !',
        },
      };
      expect((await ridesController.updateReview(data)).affected).toEqual(1);
    });
  });
});
