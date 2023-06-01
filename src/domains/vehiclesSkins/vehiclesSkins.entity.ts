import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleType } from '../vehiclesTypes/vehiclesTypes.entity';

@Entity()
export class VehicleSkin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => VehicleType, (type) => type.skins)
  type: VehicleType;

  @Column({ type: 'int' })
  tier: number;

  @Column({ type: 'varchar' })
  image: string;
}
