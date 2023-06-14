import { DeepPartial } from 'typeorm';
import { VehicleType } from '../../../domains/vehicles-types/vehicles-types.entity';

export const vehiclesTypes: DeepPartial<VehicleType>[] = [
  {
    id: '33333333-bab3-439d-965d-0522568b0000',
    name: 'Hoverboard',
    capsMilestone: 0,
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0001',
    name: 'Chaussures à propulsion',
    capsMilestone: 50,
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0002',
    name: 'Capsule pneumatique',
    capsMilestone: 100,
  },
  {
    id: '33333333-bab3-439d-965d-0522568b0003',
    name: 'Exosquelette motorisé',
    capsMilestone: 200,
  },
];
