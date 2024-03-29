import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InsertResult, UpdateResult } from 'typeorm';
import { AuthGuard, RolesGuard } from '../../auth.guard';
import { RequestPayload } from '../../types';
import { UserRole } from '../../types/user-role';
import { CreateAuctionPayload } from './auctions.dto';
import { Auction } from './auctions.entity';
import { AuctionService } from './auctions.service';

@Controller()
export class AuctionController {
  constructor(private readonly auctionsService: AuctionService) {}

  @EventPattern('auctions.findActive')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findActive(): Promise<Auction> {
    return this.auctionsService.findActive();
  }

  @EventPattern('auctions.create')
  @UseGuards(new RolesGuard([UserRole.TECHNICIAN]), AuthGuard)
  create(@Payload() payload: CreateAuctionPayload): Promise<InsertResult> {
    return this.auctionsService.create(payload.body);
  }

  @EventPattern('auctions.click')
  @UseGuards(new RolesGuard([UserRole.USER]), AuthGuard)
  click(@Payload() payload: RequestPayload): Promise<InsertResult> {
    return this.auctionsService.click(payload);
  }

  @EventPattern('auctions.close')
  @UseGuards(AuthGuard)
  close(@Payload() payload: RequestPayload): Promise<UpdateResult> {
    return this.auctionsService.close(payload);
  }
}
