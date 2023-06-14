import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleType } from '../vehicles-types/vehicles-types.entity';

@Entity()
export class VehicleSkin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  tier: number;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @ManyToOne(() => VehicleType, (type) => type.skins, { nullable: false, onDelete: 'CASCADE' })
  type: VehicleType;
}
