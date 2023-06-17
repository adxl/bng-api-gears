import { ClientsModule, Transport } from '@nestjs/microservices';
import { Service } from 'src/constants';

export const ClientProxy = (name: Service, host: string, port: string) =>
  ClientsModule.register([
    {
      name,
      transport: Transport.TCP,
      options: {
        host,
        port: Number(port) || 9000,
      },
    },
  ]);
