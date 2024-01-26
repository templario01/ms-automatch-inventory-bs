import { Injectable } from '@nestjs/common';
import { BrandsRepository } from '../domain/repositories/brands.repository';
import { Brand } from '../domain/entities/outbound/brand.entity';

@Injectable()
export class BrandsUseCase {
  constructor(private readonly brandsRepository: BrandsRepository) {}

  public getFilteredBrands(word: string): Brand[] {
    return this.brandsRepository.filterBrands(word);
  }
}
