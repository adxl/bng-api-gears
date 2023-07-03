import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from 'src/config/proxy.config';
import { Auction } from './auctions.entity';
import { AuctionController } from './auctions.controller';
import { AuctionService } from './auctions.service';
import { AuctionClick } from './auctions-click.entity';

@Module({
  imports: [
    ClientProxy('AUTH_SERVICE', process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Auction, AuctionClick]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
