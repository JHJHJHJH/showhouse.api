import { Test, TestingModule } from '@nestjs/testing';
import { UraScraperController } from './ura-scraper.controller';
import { LocationModule } from '../location/location.module';

describe('UraScraperController', () => {
  let controller: UraScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LocationModule],
      controllers: [UraScraperController],
    }).compile();

    controller = module.get<UraScraperController>(UraScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
