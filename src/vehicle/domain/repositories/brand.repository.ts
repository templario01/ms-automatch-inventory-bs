import { Injectable } from '@nestjs/common';
import { VehicleBrand } from '../entities/outbound/vehicle-brand';

@Injectable()
export abstract class IBrandRepository {
  abstract filterBrands(word: string): VehicleBrand[];
}
