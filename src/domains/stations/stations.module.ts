import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { AUTH_SERVICE } from '../../constants';
import { AuthGuard } from '../../gears.guard';
import { StationsController } from './stations.controller';
import { Station } from './stations.entity';
import { StationsService } from './stations.service';

@Module({
  imports: [
    ClientProxy(AUTH_SERVICE, process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Station]),
  ],
  controllers: [StationsController],
  providers: [StationsService, AuthGuard, AUTH_SERVICE],
  exports: [StationsService, AuthGuard, AUTH_SERVICE],
})
export class StationsModule {}
