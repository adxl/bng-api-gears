import { VehicleSkin } from '../../../domains/vehicles-skins/vehicles-skins.entity';
import { DeepPartial } from 'typeorm';
import { sk } from '@faker-js/faker';

/*
fcd75db9-b0fe-49f3-8f17-4a0d39ca1ad8Original.jpg
f8dab76b-e84f-4080-81c8-3a439dbc784aFlammes_incandescantes2.jpg
ebdecd48-8a17-4b78-b1eb-0fc23593888aflash_argente2.jpg
ea17ddcf-aa84-4a48-9f1e-6b5b57f89a0dCybernetique_rouge2.jpg
8f6bf8c7-8a19-4ef2-b9ac-1ea19c72379dEclipse_noire.jpg
84db9cda-68d8-444b-b74d-34a2710b61f9Flammes_incandescentes.jpg
774c759d-61c9-4151-b278-323cf4ad07e9Symbiose_organique.jpg
736d1457-a9e7-4f71-9d29-7810f1cba4e0Eclipse_noire2.jpg
6f52018b-0244-4342-bd05-f13871f61ac8Chroma_spectrum.jpg
6eb969dc-f118-4f45-bd80-9d9a2c4e04b1Cammouflage_urbain.jpg
4f3b29c9-b366-40b0-b140-5f3e61309483Mecanique_steampunk2jpg.jpg
424bab5e-cd2e-4fa8-910f-ecda1f20c73dMecanique_steampunk.jpg
4168161c-2f36-4779-b067-ee9c8b1b993fSymbiose_organique2.jpg
11ee8b95-0bea-47a4-a587-4b4c9728d03dHologramme_technologique2.jpg
1157ec1b-7970-4c8d-940c-77466374e8b0Camouflage_urbain2.jpg
0e28cca9-2571-4bf2-9b40-84d652e4c54bflash_argente.jpg
0c66ea08-aadb-423f-9d06-7a9d76ac24fbHologramme_technologique.jpg
* */

const PUBLIC_BUCKET_URL = 'https://board-n-go-bucket.s3.eu-west-3.amazonaws.com/';

export const skins: DeepPartial<VehicleSkin>[] = [
  {
    id: '44444444-bab3-439d-965d-0522568b0000',
    name: 'Original',
    tier: 0,
    image: 'fcd75db9-b0fe-49f3-8f17-4a0d39ca1ad8Original.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0005',
    name: 'Flammes Incandescentes',
    tier: 1,
    image: '84db9cda-68d8-444b-b74d-34a2710b61f9Flammes_incandescentes.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0002',
    name: 'Camouflage Urbain',
    tier: 2,
    image: '6eb969dc-f118-4f45-bd80-9d9a2c4e04b1Cammouflage_urbain.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0001',
    name: 'Mécanique Steampunk',
    tier: 3,
    image: '424bab5e-cd2e-4fa8-910f-ecda1f20c73dMecanique_steampunk.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0004',
    name: 'Flash Argenté',
    tier: 4,
    image: 'ebdecd48-8a17-4b78-b1eb-0fc23593888aflash_argente2.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0003',
    name: 'Éclipse Noire',
    tier: 5,
    image: '8f6bf8c7-8a19-4ef2-b9ac-1ea19c72379dEclipse_noire.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0006',
    name: 'Hologramme Technologique',
    tier: 6,
    image: '0c66ea08-aadb-423f-9d06-7a9d76ac24fbHologramme_technologique.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0007',
    name: 'Symbiose Organique',
    tier: 7,
    image: '774c759d-61c9-4151-b278-323cf4ad07e9Symbiose_organique.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0008',
    name: 'Cybernétique Rouge',
    tier: 8,
    image: 'ea17ddcf-aa84-4a48-9f1e-6b5b57f89a0dCybernetique_rouge2.jpg',
  },
  {
    id: '44444444-bab3-439d-965d-0522568b0009',
    name: 'Chroma Spectrum',
    tier: 9,
    image: '6f52018b-0244-4342-bd05-f13871f61ac8Chroma_spectrum.jpg',
  },
].map((skin) => ({ ...skin, image: PUBLIC_BUCKET_URL + skin.image }));
