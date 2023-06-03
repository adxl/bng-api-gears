import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleSkin } from '../vehicles-skins/vehicles-skins.entity';
import { Vehicle } from '../vehicles/vehicles.entity';

@Entity()
export class VehicleType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  caps: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.type)
  vehicles: Vehicle[];

  @OneToMany(() => VehicleSkin, (skin) => skin.type)
  skins: VehicleSkin[];
}
