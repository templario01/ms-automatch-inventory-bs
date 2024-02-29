import { Injectable } from '@nestjs/common';
import { VehicleBrand } from '../entities/outbound/vehicle-brand';

@Injectable()
export abstract class BrandRepository {
  abstract filterBrands(word: string): VehicleBrand[];
}
