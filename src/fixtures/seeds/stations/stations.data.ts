import { DeepPartial } from 'typeorm';
import { Station } from '../../../domains/stations/stations.entity';
import { faker } from '@faker-js/faker';

function getCoorditates() {
  const originLatitude = degToRad(48.8566);
  const originLongitude = degToRad(2.3522);

  const radius = faker.number.int({ min: 0, max: 5 }) / 6371;

  const brng = faker.number.int({ min: 0, max: 359 });
  const teta = degToRad(brng);

  const latitude = Math.asin(
    Math.sin(originLatitude) * Math.cos(radius) + Math.cos(originLatitude) * Math.sin(radius) * Math.cos(teta),
  );

  const longitude =
    ((originLongitude +
      Math.atan2(
        Math.sin(teta) * Math.sin(radius) * Math.cos(originLatitude),
        Math.cos(radius) - Math.sin(originLatitude) * Math.sin(latitude),
      ) +
      3 * Math.PI) %
      (2 * Math.PI)) -
    Math.PI;

  return { latitude: radToDeg(latitude), longitude: radToDeg(longitude) };
}

function degToRad(deg: number) {
  return deg * (Math.PI / 180);
}

function radToDeg(rad: number) {
  return rad * (180 / Math.PI);
}

export const stations: DeepPartial<Station>[] = [
  {
    id: '11111111-bab3-439d-965d-0522568b0000',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0001',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0002',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0003',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0004',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0005',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0006',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0007',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0008',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
  {
    id: '11111111-bab3-439d-965d-0522568b0009',
    name: faker.location.street(),
    eventId: null,
    active: true,
    ...getCoorditates(),
  },
];
