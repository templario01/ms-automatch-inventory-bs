import { Injectable } from '@nestjs/common';
import { Brand } from '../entities/outbound/brand.entity';

@Injectable()
export abstract class BrandsRepository {
  abstract filterBrands(word: string): Brand[];
}
