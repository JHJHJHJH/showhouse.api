import { Point } from 'geojson';
import { ITransaction } from 'src/transaction/transaction.interface';

export interface ILocation {
  street: string;
  x: number;
  y: number;
  project: string;
  transactions: ITransaction[];
  marketSegment: string;
  coordinates: Point;
}
