import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../vehicles/vehicles.entity';
import { AuctionClick } from './auctions-click.entity';

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: 0 })
  basePrice: number;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: Vehicle;

  @OneToMany(() => AuctionClick, (click) => click.auction)
  clicks: AuctionClick[];

  @Column({ nullable: false, default: 1 })
  clickPrice: number;

  @Column({ nullable: false, default: true })
  active: boolean;
}
