import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  index(): string {
    return 'Gears API';
  }

  kill(): void {
    throw new RpcException(new ServiceUnavailableException('Service killed successfully'));
  }
}
