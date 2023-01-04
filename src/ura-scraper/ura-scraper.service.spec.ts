import { Test, TestingModule } from '@nestjs/testing';
import { UraScraperService } from './ura-scraper.service';

describe('UraScraperService', () => {
  let service: UraScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UraScraperService],
    }).compile();

    service = module.get<UraScraperService>(UraScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
