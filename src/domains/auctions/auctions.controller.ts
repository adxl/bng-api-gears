import { Controller, UseGuards } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthGuard, RolesGuard } from 'src/auth.guard';
import { Auction } from './auctions.entity';
import { AuctionService } from './auctions.service';
import { RequestPayload } from 'src/types';
import { UserRole } from 'src/types/user-role';
import { CreateAuctionPayload } from './auctions.dto';
import { InsertResult, UpdateResult } from 'typeorm';

@Controller()
export class AuctionController {
  constructor(private readonly auctionsService: AuctionService) {}

  @EventPattern('auctions.findAll')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findAll(): Promise<Auction[]> {
    return this.auctionsService.findAll();
  }

  @EventPattern('auctions.findOne')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  findOne(@Payload() payload: RequestPayload): Promise<Auction> {
    return this.auctionsService.findOne(payload.id);
  }

  @EventPattern('auctions.create')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR]), AuthGuard)
  create(@Payload() payload: CreateAuctionPayload): Promise<InsertResult> {
    return this.auctionsService.create(payload.body);
  }

  @EventPattern('auctions.click')
  @UseGuards(new RolesGuard('*'), AuthGuard)
  click(@Payload() payload: RequestPayload): Promise<InsertResult> {
    return this.auctionsService.click(payload);
  }

  @EventPattern('auctions.close')
  @UseGuards(new RolesGuard([UserRole.ADMINISTRATOR]), AuthGuard)
  close(@Payload() payload: RequestPayload): Promise<UpdateResult> {
    return this.auctionsService.close(payload);
  }
}
