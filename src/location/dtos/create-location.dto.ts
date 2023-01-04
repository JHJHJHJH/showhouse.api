import { IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  street: string;
  @IsNumber()
  x: number;
  @IsNumber()
  y: number;
  @IsString()
  project: string;

  @IsString()
  marketSegment: string;
}
