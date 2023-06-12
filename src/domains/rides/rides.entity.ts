import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Report } from '../reports/reports.entity';
import { Station } from '../stations/stations.entity';
import { Vehicle } from '../vehicles/vehicles.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.rides)
  vehicle: Vehicle;

  @ManyToOne(() => Station)
  startStation: Station;

  @ManyToOne(() => Station, { nullable: true })
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
