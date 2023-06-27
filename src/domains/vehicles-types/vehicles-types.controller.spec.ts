import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../auth.guard';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { VehicleSkin } from '../vehicles-skins/vehicles-skins.entity';
import { ClientProxy } from '../../config/proxy.config';
import { VehiclesTypesController } from './vehicles-types.controller';
import { VehicleType } from './vehicles-types.entity';
import { VehiclesTypesModule } from './vehicles-types.module';
import { VehiclesTypesService } from './vehicles-types.service';

describe('Tests types', () => {
  let typesController: VehiclesTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([VehicleType, VehicleSkin]),
        VehiclesTypesModule,
      ],
      providers: [VehiclesTypesService, AuthGuard],
      controllers: [VehiclesTypesController],
    }).compile();

    typesController = module.get(VehiclesTypesController);
  });

  describe('Test find all types', () => {
    it('should return an array of types', async () => {
      const types = await typesController.findAll();
      expect(Array.isArray(types)).toBe(true);
    });
  });

  describe('Test find one type', () => {
    it('should return one type', async () => {
      const vehicleType = await typesController.findOne({ id: '33333333-bab3-439d-965d-0522568b0003' });

      expect(vehicleType.name).toBe('Exosquelette motorisé');
      expect(vehicleType.capsMilestone).toBe(200);
    });

    it('should throws a not found exception', async () => {
      await expect(typesController.findOne({ id: '33333333-bab3-439d-965d-0522568b0333' })).rejects.toThrow();
    });
  });

  describe('Test create type', () => {
    it('should return an UUID', async () => {
      const body = {
        name: 'Armure de combat',
        capsMilestone: 600,
      };
      expect((await typesController.create({ body })).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update type', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '33333333-bab3-439d-965d-0522568b0000',
        body: {
          name: 'Hoverboard à vapeur',
        },
      };

      expect((await typesController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one type', () => {
    it('should return the number of affected resources', async () => {
      const data = '33333333-bab3-439d-965d-0522568b0002';
      expect((await typesController.remove({ id: data })).affected).toEqual(1);
    });
  });
});
