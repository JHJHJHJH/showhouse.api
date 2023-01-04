import { IsNumber } from 'class-validator';

export class GetLocationBoundingBoxDto {
  @IsNumber()
  minLon: number;
  @IsNumber()
  minLat: number;
  @IsNumber()
  maxLon: number;
  @IsNumber()
  maxLat: number;
}
