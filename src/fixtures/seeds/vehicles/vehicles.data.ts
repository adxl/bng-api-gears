import { DeepPartial } from 'typeorm';
import { Vehicle } from '../../../domains/vehicles/vehicles.entity';
import { faker } from '@faker-js/faker';

const vehiclesStations = [
  ...Array(0).fill(0),
  ...Array(23).fill(1),
  ...Array(10).fill(2),
  ...Array(8).fill(3),
  ...Array(17).fill(4),
  ...Array(9).fill(5),
  ...Array(4).fill(6),
  ...Array(7).fill(7),
  ...Array(13).fill(8),
  ...Array(9).fill(9), //
];

const vehicleTypes = [
  '0211231300023011001211200',
  '0012010202000102230310100',
  '1211010311002100000122332',
  '1021210100012012213110003',
]
  .reduce((a, segment) => a + segment, '')
  .split('');

export const vehicles: DeepPartial<Vehicle>[] = vehiclesStations.map((stationIndex, i) => ({
  id: `22222222-bab3-439d-965d-0522568b0${String(i).padStart(3, '0')}`,
  type: { id: `33333333-bab3-439d-965d-0522568b000${vehicleTypes[i]}` },
  station: { id: `11111111-bab3-439d-965d-0522568b000${stationIndex}` },
  year: faker.number.int({ min: 2000, max: 3000 }),
  active: ![2, 12, 15, 20, 60].includes(i),
}));
