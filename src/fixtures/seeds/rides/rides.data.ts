import { DeepPartial } from 'typeorm';
import { Ride } from '../../../domains/rides/rides.entity';
import { faker } from '@faker-js/faker';

export const rides: DeepPartial<Ride>[] = [
  // USER 1
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e00',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0050' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0003' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0001' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
    //
    createdAt: '2023-06-15T22:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e01',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0014' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0004' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0002' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0007' },
    //
    createdAt: '2023-06-15T22:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e02',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0088' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0005' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0003' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0005' },
    //
    createdAt: '2023-06-15T22:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e03',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0069' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0003' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0003' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0004' },
    //
    createdAt: '2023-06-15T22:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },

  // USER 2

  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e04',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd022',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0023' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0006' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0002' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0007' },
    //
    createdAt: '2023-06-15T22:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e05',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd022',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0088' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0003' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0003' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0005' },
    //
    createdAt: '2023-06-15T21:13:54.220Z',
    endedAt: '2023-06-15T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e06',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd022',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0069' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0002' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0003' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0009' },
    //
    createdAt: '2023-06-14T22:13:54.220Z',
    endedAt: '2023-06-15T00:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },

  // user 3

  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e07',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd024',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0064' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0004' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0005' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
    //
    createdAt: '2023-06-11T22:13:54.220Z',
    endedAt: '2023-06-11T23:13:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },

  // user 4

  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e08',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd017',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0048' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0003' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0008' },
    //
    createdAt: '2023-06-11T23:13:54.220Z',
    endedAt: '2023-06-11T23:18:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },

  // user 5

  {
    id: '55555555-b4c5-4aad-887b-ff93aa1a6e09',
    userId: 'c63a4bd1-cabd-44ee-b911-9ee2533dd014',
    //
    vehicle: { id: '22222222-bab3-439d-965d-0522568b0034' },
    skin: { id: '44444444-bab3-439d-965d-0522568b0007' },
    //
    startStation: { id: '11111111-bab3-439d-965d-0522568b0002' },
    endStation: { id: '11111111-bab3-439d-965d-0522568b0006' },
    //
    createdAt: '2023-06-11T23:13:54.220Z',
    endedAt: '2023-05-11T10:18:54.220Z',
    //
    review: faker.number.int({ min: 0, max: 5 }),
    comment: faker.lorem.sentence({ min: 5, max: 12 }),
  },
];
