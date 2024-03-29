import { DeepPartial } from 'typeorm';
import { Station } from '../../../domains/stations/stations.entity';
import { faker } from '@faker-js/faker';

export const stations: DeepPartial<Station>[] = [
  {
    id: '11111111-bab3-439d-965d-0522568b0000',
    name: faker.location.street(),
    eventId: null,
    active: false,
    latitude: 48.834679,
    longitude: 2.2989181942754104,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0001',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.89191147040009,
    longitude: 2.3417602470781023,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0002',
    name: faker.location.street(),
    eventId: '77777777-06e5-4e9e-aa76-d7e12eba4a11',
    active: true,
    latitude: 48.86174095289671,
    longitude: 2.3924566215033307,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0003',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.82490534523368,
    longitude: 2.377780486210763,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0004',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.87923064626206,
    longitude: 2.30969070719186,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0005',
    name: faker.location.street(),
    eventId: null,
    active: false,
    latitude: 48.88667701877244,
    longitude: 2.3830193867713336,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0006',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.85660000000001,
    longitude: 2.3521999999999523,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0007',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.85157050224621,
    longitude: 2.3408693336250295,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0008',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.86283408482771,
    longitude: 2.2983494126204533,
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0009',
    name: faker.location.street(),
    eventId: null,
    active: true,
    latitude: 48.82461795661449,
    longitude: 2.3277285305293254,
  },
];
