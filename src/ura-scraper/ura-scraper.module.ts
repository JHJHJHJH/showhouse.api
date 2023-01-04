import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from 'src/transaction/transaction.module';
import { LocationEntity } from '../location/location.entity';
import { LocationModule } from '../location/location.module';
import { UraScraperController } from './ura-scraper.controller';
import { UraScraperService } from './ura-scraper.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationEntity]),
    HttpModule,
    LocationModule,
    TransactionModule,
  ],
  controllers: [UraScraperController],
  providers: [UraScraperService],
})
export class UraScraperModule {}
