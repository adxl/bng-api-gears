import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientProxy } from '../../config/proxy.config';
import { AUTH_SERVICE } from '../../constants';
import { AuthGuard } from '../../gears.guard';
import { ReportsController } from './reports.controller';
import { Report } from './reports.entity';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    ClientProxy(AUTH_SERVICE, process.env.AUTH_HOST || 'auth-api-service', process.env.AUTH_PORT || '9000'),
    TypeOrmModule.forFeature([Report]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, AuthGuard, AUTH_SERVICE],
  exports: [ReportsService, AuthGuard, AUTH_SERVICE],
})
export class ReportsModule {}
