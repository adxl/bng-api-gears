import { DeepPartial } from 'typeorm';
import { Report, ReportStatus } from '../../../domains/reports/reports.entity';

export const reports: DeepPartial<Report>[] = [
  {
    id: '66666666-31bb-4b54-98f1-77610bc44b01',
    ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e09' },
    status: ReportStatus.OPEN,
  },

  {
    id: '66666666-31bb-4b54-98f1-77610bc44b02',
    ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e06' },
    status: ReportStatus.IN_PROGRESS,
  },
  {
    id: '66666666-31bb-4b54-98f1-77610bc44b03',
    ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e08' },
    status: ReportStatus.OPEN,
  },
  {
    id: '66666666-31bb-4b54-98f1-77610bc44b04',
    ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e03' },
    status: ReportStatus.DONE,
  },
  {
    id: '66666666-31bb-4b54-98f1-77610bc44b05',
    ride: { id: '55555555-b4c5-4aad-887b-ff93aa1a6e02' },
    status: ReportStatus.DONE,
  },
];
