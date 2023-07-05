import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom, of } from 'rxjs';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { RequestPayload } from '../../types';
import { VehiclesService } from '../vehicles/vehicles.service';
import { AuctionClick } from './auctions-click.entity';
import { CreateAuctionDto } from './auctions.dto';
import { Auction } from './auctions.entity';

type User = {
  id: string;

  caps: number;
};

@Injectable()
export class AuctionService {
  @InjectRepository(Auction)
  private readonly auctionRepository: Repository<Auction>;

  @InjectRepository(AuctionClick)
  private readonly auctionClickRepository: Repository<AuctionClick>;

  @Inject(VehiclesService)
  private readonly vehicleService: VehiclesService;

  @Inject('AUTH_SERVICE')
  private readonly authProxy: ClientProxy;

  public async findOne(id: string): Promise<Auction> {
    const auction: Auction | null = await this.auctionRepository.findOne({
      where: { id, active: true },
      relations: {
        clicks: true,
        vehicle: true,
      },
    });

    if (!auction) throw new RpcException(new NotFoundException(`Auction not found for id ${id} !`));

    return auction;
  }

  public async findActive(): Promise<Auction> {
    const auction: Auction | null = await this.auctionRepository.findOne({
      where: { active: true },
      relations: {
        clicks: true,
        vehicle: {
          type: true,
        },
      },
    });

    if (!auction) throw new RpcException(new NotFoundException(`No auction found`));

    return auction;
  }

  public async create(data: CreateAuctionDto): Promise<InsertResult> {
    try {
      await this.findActive();
    } catch (e) {
      return this.auctionRepository.insert(data);
    }
    throw new RpcException(new BadRequestException('An auction already underway'));
  }

  public async click(data: RequestPayload): Promise<InsertResult> {
    const userResponse = this.authProxy.send('auth.me', { token: data.token }).pipe(catchError((error) => of(error)));

    const user: User | null = await firstValueFrom(userResponse);

    const auction: Auction = await this.findOne(data.id);

    if (!user) throw new RpcException(new BadRequestException('Please provide all the necessary informations'));

    if (user.caps < auction.basePrice + auction.clicks.length + auction.clickPrice)
      throw new RpcException(new BadRequestException('User does not have the necessary caps for this purchase'));

    const observableResponse = this.authProxy.send('users.updateCaps', {
      id: data.userId,
      body: { caps: -auction.clickPrice },
      token: data.token,
    });

    await firstValueFrom(observableResponse);

    return this.auctionClickRepository.insert({ auction, userId: user.id, timestamp: new Date() });
  }

  public async close(data: RequestPayload): Promise<UpdateResult> {
    const auction: Auction = await this.findOne(data.id);
    const lastAuctionClick: AuctionClick = await this.auctionClickRepository.findOne({
      where: {
        auction: {
          id: data.id,
        },
      },
      order: {
        timestamp: 'DESC',
      },
      relations: {
        auction: true,
      },
    });

    const observableResponse = this.authProxy.send('users.updateCaps', {
      id: lastAuctionClick.userId,
      body: { caps: -auction.basePrice - auction.clicks.length },
      token: data.token,
    });

    await firstValueFrom(observableResponse);

    this.vehicleService.remove(auction.vehicle.id);

    return this.auctionRepository.update(data.id, { active: false });
  }
}
