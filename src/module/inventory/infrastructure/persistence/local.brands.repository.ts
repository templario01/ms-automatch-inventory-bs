import { Injectable } from '@nestjs/common';
import { vehicleBrands } from '../database/data/vehicle-brands';
import { plainToInstance } from 'class-transformer';
import { Brand } from '../../domain/entities/outbound/brand.entity';

@Injectable()
export class LocalBrandsRepository {
  public filterBrands(word: string): Brand[] {
    const brands = vehicleBrands.filter((brand) =>
      brand.name.toLowerCase().includes(word.toLowerCase()),
    );

    return plainToInstance(Brand, brands);
  }
}
