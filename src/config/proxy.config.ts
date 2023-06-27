import { ClientsModule, Transport } from '@nestjs/microservices';

export const ClientProxy = (service: string, host: string, port: string) =>
  ClientsModule.register([
    {
      name: service,
      transport: Transport.TCP,
      options: {
        host,
        port: Number(port) || 9000,
      },
    },
  ]);
