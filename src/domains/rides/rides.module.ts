import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './rides.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ride])],
  controllers: [],
  providers: [],
})
export class RidesModule {}
