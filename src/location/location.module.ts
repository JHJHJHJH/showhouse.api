import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../transaction/transaction.entity';
import { LocationEntity } from './location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, TransactionEntity])],
  providers: [LocationService],
  exports: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
