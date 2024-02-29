import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../domain/repositories/brand.repository';
import { VehicleBrand } from '../domain/entities/outbound/vehicle-brand';

@Injectable()
export class VehicleBrandUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  public getFilteredBrands(word: string): VehicleBrand[] {
    return this.brandRepository.filterBrands(word);
  }
}
