import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsController } from './stations.controller';
import { Station } from './stations.entity';
import { StationsService } from './stations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService],
})
export class StationsModule {}
