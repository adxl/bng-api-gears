import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '../../config/proxy.config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { AuctionClick } from './auctions-click.entity';
import { AuctionController } from './auctions.controller';
import { Auction } from './auctions.entity';
import { AuctionModule } from './auctions.module';
import { AuctionService } from './auctions.service';
import { of } from 'rxjs';

describe('Tests auctions', () => {
  let auctionsController: AuctionController;
  let auctionsService: AuctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Auction, AuctionClick]),
        AuctionModule,
        VehiclesModule,
      ],
      providers: [AuctionService, JwtService],
      controllers: [AuctionController],
    }).compile();

    auctionsController = module.get(AuctionController);
    auctionsService = module.get(AuctionService);

    jest.spyOn(auctionsService, 'getCurrentUser').mockReturnValue(of({ id: '163a4bd1-cabd-44ee-b911-9ee2533dd003' }));
    jest.spyOn(auctionsService, 'updateUserCaps').mockReturnValue(of(null));
  });

  describe('Test create auction', () => {
    it('should return an UUID', async () => {
      const body = {
        vehicle: { id: '22222222-bab3-439d-965d-0522568b0089' },
        basePrice: 100,
        clickPrice: 10,
      };
      expect((await auctionsController.create({ body })).identifiers[0].id).toHaveLength(36);
    });

    it('should return an error', async () => {
      const body = {
        vehicle: { id: '22222222-bab3-439d-965d-0522568b0089' },
        basePrice: 100,
        clickPrice: 10,
      };
      await expect(auctionsController.create({ body })).rejects.toThrow();
    });
  });

  describe('Test find active auction', () => {
    it('should return an UUID', async () => {
      const auction = await auctionsController.findActive();
      expect(auction.id).toHaveLength(36);
    });
  });

  describe('Test click on auction', () => {
    it('should return an UUID', async () => {
      const auction = await auctionsController.findActive();
      const data = {
        id: auction.id,
        userId: '163a4bd1-cabd-44ee-b911-9ee2533dd003',
      };
      const result = await auctionsController.click(data);
      expect(result.identifiers[0].id).toHaveLength(36);
    });
  });

  describe('Test close auction', () => {
    it('should return an UUID', async () => {
      const auction = await auctionsController.findActive();
      const data = {
        id: auction.id,
      };
      const result = await auctionsController.close(data);
      expect(result.affected).toEqual(1);
    });
  });

  describe('Test find active auction', () => {
    it('should return an error', async () => {
      await expect(auctionsController.findActive()).rejects.toThrow();
    });
  });
});
