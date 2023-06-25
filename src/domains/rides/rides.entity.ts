import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/reports.entity';
import { Station } from '../stations/stations.entity';
import { VehicleSkin } from '../vehicles-skins/vehicles-skins.entity';
import { Vehicle } from '../vehicles/vehicles.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.rides, { onDelete: 'CASCADE' })
  vehicle: Vehicle;

  @ManyToOne(() => VehicleSkin, { onDelete: 'CASCADE' })
  skin: VehicleSkin;

  @ManyToOne(() => Station, { onDelete: 'CASCADE' })
  startStation: Station;

  @ManyToOne(() => Station, { nullable: true, onDelete: 'CASCADE' })
  endStation: Station | null;

  @OneToOne(() => Report, (report) => report.ride)
  report: Report;

  @Column('uuid')
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  endedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  review: number | null;

  @Column({ type: 'varchar', nullable: true })
  comment: string | null;
}
