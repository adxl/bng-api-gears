import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../vehicles/vehicles.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'boolean' })
  primary: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.station)
  vehicles: Vehicle[];

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'boolean' })
  removed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
