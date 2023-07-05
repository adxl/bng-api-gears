import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { AuctionClick } from './auctions-click.entity';
import { AuctionController } from './auctions.controller';
import { Auction } from './auctions.entity';
import { AuctionService } from './auctions.service';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Auction, AuctionClick]),
    VehiclesModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
