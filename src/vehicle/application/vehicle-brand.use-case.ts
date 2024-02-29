import { Injectable } from '@nestjs/common';
import { BrandRepository } from '../domain/repositories/brand.repository';
import { Brand } from '../domain/entities/outbound/brand.entity';

@Injectable()
export class VehicleBrandUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  public getFilteredBrands(word: string): Brand[] {
    return this.brandRepository.filterBrands(word);
  }
}
