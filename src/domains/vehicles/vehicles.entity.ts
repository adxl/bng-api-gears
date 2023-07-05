import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ride } from '../rides/rides.entity';
import { Station } from '../stations/stations.entity';
import { VehicleType } from '../vehicles-types/vehicles-types.entity';
import { Auction } from '../auctions/auctions.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VehicleType, (type) => type.vehicles, { nullable: false, onDelete: 'CASCADE' })
  type: VehicleType;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Station, (station) => station.vehicles, { nullable: true, onDelete: 'CASCADE' })
  station: Station;

  @OneToMany(() => Ride, (ride) => ride.vehicle)
  rides: Ride[];

  @OneToOne(() => Auction, (auction) => auction.vehicle, { nullable: true })
  auction: Auction;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
