import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ride } from '../rides/rides.entity';
import { Station } from '../stations/stations.entity';
import { VehicleType } from '../vehiclesTypes/vehiclesTypes.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VehicleType, (type) => type.vehicles)
  type: VehicleType;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Station, (station) => station.vehicles)
  station: Station;

  @Column({ type: 'uuid' })
  eventId: string;

  @OneToMany(() => Ride, (ride) => ride.vehicle)
  rides: Ride[];

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'boolean' })
  removed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
