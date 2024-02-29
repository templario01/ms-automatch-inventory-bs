import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/outbound/brand.entity';

@Injectable()
export abstract class BrandRepository {
  abstract filterBrands(word: string): Brand[];
}
