import { DeepPartial } from 'typeorm';
import { Vehicle } from '../../../domains/vehicles/vehicles.entity';
import { faker } from '@faker-js/faker';

export const vehicles: DeepPartial<Vehicle>[] = [
  {
    id: '22222222-bab3-439d-965d-0522568b0000',
    type: { id: '33333333-bab3-439d-965d-0522568b0000' },
    station: { id: '11111111-bab3-439d-965d-0522568b0000' },
    year: faker.number.int({ min: 2000, max: 3000 }),
    active: true,
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0001',
    type: { id: '33333333-bab3-439d-965d-0522568b0002' },
    station: { id: '11111111-bab3-439d-965d-0522568b0003' },
    year: faker.number.int({ min: 2000, max: 3000 }),
    active: true,
  },
  {
    id: '22222222-bab3-439d-965d-0522568b0002',
    type: { id: '33333333-bab3-439d-965d-0522568b0001' },
    station: { id: '11111111-bab3-439d-965d-0522568b0000' },
    year: faker.number.int({ min: 2000, max: 3000 }),
    active: true,
  },
];
