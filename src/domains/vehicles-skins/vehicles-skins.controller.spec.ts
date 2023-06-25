import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from '../../gears.guard';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { ImageryHelper } from './imagery.helper';

import { VehiclesSkinsController } from './vehicles-skins.controller';
import { VehicleSkin } from './vehicles-skins.entity';
import { VehiclesSkinsModule } from './vehicles-skins.module';
import { VehiclesSkinsService } from './vehicles-skins.service';

describe('Tests skins', () => {
  let skinsController: VehiclesSkinsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([VehicleSkin]), VehiclesSkinsModule],
      providers: [VehiclesSkinsService, ImageryHelper, AuthGuard],
      controllers: [VehiclesSkinsController],
    }).compile();

    skinsController = module.get(VehiclesSkinsController);
  });

  describe('Test find all skins', () => {
    it('should return an array of skins', async () => {
      const skins = await skinsController.findAll();
      expect(Array.isArray(skins)).toBe(true);
    });
  });

  describe('Test find one skin', () => {
    it('should return one skin', async () => {
      const vehicleSkin = await skinsController.findOne('44444444-bab3-439d-965d-0522568b0007');

      expect(vehicleSkin.name).toBe('Symbiose Organique');
      expect(vehicleSkin.tier).toBe(7);
    });

    it('should throws a not found exception', async () => {
      await expect(skinsController.findOne('44444444-bab3-439d-965d-0522568b0777')).rejects.toThrow();
    });
  });

  describe('Test create skin', () => {
    it('should return an UUID', async () => {
      const data = {
        name: 'Fibre de carbone',
        tier: 5,
        image: 'image_url',
      };
      expect((await skinsController.create(data)).identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test update skin', () => {
    it('should return the number of affected resources', async () => {
      const data = {
        id: '44444444-bab3-439d-965d-0522568b0003',
        body: {
          name: 'Éclipse Rouge',
        },
      };

      expect((await skinsController.update(data)).affected).toEqual(1);
    });
  });

  describe('Test remove one skin', () => {
    it('should return the number of affected resources', async () => {
      const data = '44444444-bab3-439d-965d-0522568b0005';
      expect((await skinsController.remove(data)).affected).toEqual(1);
    });
  });
});
