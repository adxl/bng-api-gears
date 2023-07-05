import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { AuctionClick } from './auctions-click.entity';
import { AuctionController } from './auctions.controller';
import { Auction } from './auctions.entity';
import { AuctionModule } from './auctions.module';
import { AuctionService } from './auctions.service';

describe('Tests auctions', () => {
  let auctionsController: AuctionController;
  let jwtService: JwtService;
  let jwt = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
        ClientProxy('AUTH_SERVICE', 'auth-api-service', '9000'),
        TypeOrmModule.forRoot(TypeOrmConfig),
        TypeOrmModule.forFeature([Auction, AuctionClick]),
        AuctionModule,
        VehiclesModule,
      ],
      providers: [AuctionService, JwtService],
      controllers: [AuctionController],
    }).compile();

    auctionsController = module.get(AuctionController);
    jwtService = module.get(JwtService);

    jwt = {
      token: 'Bearer ' + jwtService.sign({ id: '44444444-bab3-439d-965d-0522568b0000' }, { privateKey: 'esgi' }),
    };
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
        token: jwt.token,
        id: auction.id,
        userId: '44444444-bab3-439d-965d-0522568b0000',
      };
      const result = await auctionsController.click(data);
      expect(result.identifiers[0].id).toHaveLength(36);
    });

    it('should return an error user not found', async () => {
      const auction = await auctionsController.findActive();
      jwt = {
        token: 'Bearer ' + jwtService.sign({ id: '44444444-bab3-439d-965d-0522568b000b' }, { privateKey: 'esgi' }),
      };
      const data = {
        token: jwt.token,
        id: auction.id,
        userId: '44444444-bab3-439d-965d-0522568b0000',
      };
      await expect(auctionsController.click(data)).rejects.toThrow();
    });

    it('should return an error user not found', async () => {
      const auction = await auctionsController.findActive();
      jwt = {
        token: 'Bearer ' + jwtService.sign({ id: '44444444-bab3-439d-965d-0522568b000b' }, { privateKey: 'esgi' }),
      };
      const data = {
        token: jwt.token,
        id: auction.id,
        userId: '44444444-bab3-439d-965d-0522568b0000',
      };
      await expect(auctionsController.click(data)).rejects.toThrow();
    });

    it('should return an error user not enough caps', async () => {
      const auction = await auctionsController.findActive();
      jwt = {
        token: 'Bearer ' + jwtService.sign({ id: '163a4bd1-cabd-44ee-b911-9ee2533dd006' }, { privateKey: 'esgi' }),
      };
      const data = {
        token: jwt.token,
        id: auction.id,
        userId: '163a4bd1-cabd-44ee-b911-9ee2533dd006',
      };
      await expect(auctionsController.click(data)).rejects.toThrow();
    });
  });

  describe('Test close auction', () => {
    it('should return an UUID', async () => {
      const auction = await auctionsController.findActive();
      const data = {
        token: jwt.token,
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
