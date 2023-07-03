import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auctions.entity';
import { AuctionClick } from './auctions-click.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateAuctionClickDto, CreateAuctionClickPayload, CreateAuctionDto } from './auctions.dto';
import { catchError, firstValueFrom, of } from 'rxjs';
import { RequestPayload } from 'src/types';

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

  @Inject('AUTH_SERVICE')
  private readonly authProxy: ClientProxy;

  public async findAll(): Promise<Auction[]> {
    return this.auctionRepository.find({
      where: {
        active: true,
      },
      relations: {
        clicks: true,
      },
    });
  }

  public async findOne(id: string): Promise<Auction> {
    const auction: Auction | null = await this.auctionRepository.findOne({
      where: { id, active: true },
      relations: {
        clicks: true,
      },
    });

    if (!auction) throw new RpcException(new NotFoundException(`Auction not found for id ${id} !`));

    return auction;
  }

  public async create(data: CreateAuctionDto): Promise<InsertResult> {
    const exists: Auction | null = await this.auctionRepository.findOne({
      where: {
        vehicle: {
          id: data.vehicle.id,
        },
        active: true,
      },
      relations: {
        vehicle: true,
      },
    });

    if (exists) throw new RpcException(new BadRequestException('An auction already exists for this vehicle'));

    return this.auctionRepository.insert(data);
  }

  public async click(data: CreateAuctionClickPayload): Promise<InsertResult> {
    const body: CreateAuctionClickDto = data.body;

    const userResponse = this.authProxy.send('auth.me', { token: data.token }).pipe(catchError((error) => of(error)));

    const user: User | null = await firstValueFrom(userResponse);

    const auction: Auction | null = await this.findOne(body.auction.id);

    if (!user || !auction)
      throw new RpcException(new BadRequestException('Please provide all the necessary informations'));

    if (user.caps < auction.basePrice + auction.clicks.length + auction.clickPrice)
      throw new RpcException(new BadRequestException('User does not have the necessary caps for this purchase'));

    await this.authProxy.send('users.updateCaps', {
      id: body.userId,
      body: { caps: -auction.clickPrice },
      token: data.token,
    });

    return this.auctionClickRepository.insert({ ...body, timestamp: new Date() });
  }

  public async close(data: RequestPayload): Promise<UpdateResult> {
    const auction: Auction = await this.findOne(data.id);
    const lastAuctionClick: AuctionClick = await this.auctionClickRepository.findOne({
      where: { auction },
      order: {
        timestamp: 'DESC',
      },
    });

    await this.authProxy.send('users.updateCaps', {
      id: lastAuctionClick.userId,
      body: { caps: -auction.basePrice - auction.clicks.length },
      token: data.token,
    });

    return this.auctionRepository.update(data.id, { active: false });
  }
}
