import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ride } from '../rides/rides.entity';

export enum ReportStatus {
  OPEN = 'Ouvert',
  IN_PROGRESS = 'En cours',
  DONE = 'Terminé',
}

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Ride, (ride) => ride.report, { nullable: false })
  @JoinColumn()
  ride: Ride;

  @Column({ type: 'enum', enum: ReportStatus, default: ReportStatus.OPEN })
  status: ReportStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
