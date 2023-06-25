import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from '../constants';

export const ClientProxy = (service: Service, host: string, port: string) =>
  ClientsModule.register([
    {
      name: service.name,
      transport: Transport.TCP,
      options: {
        host,
        port: Number(port) || 9000,
      },
    },
  ]);
