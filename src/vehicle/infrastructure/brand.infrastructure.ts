import { Injectable } from '@nestjs/common';
import { vehicleBrands } from '../../core/database/data/vehicle-brands';
import { plainToInstance } from 'class-transformer';
import { Brand } from '../domain/entities/outbound/brand.entity';
import { BrandRepository } from '../domain/repositories/brand.repository';

@Injectable()
export class BrandInfrastructure implements BrandRepository {
  public filterBrands(word: string): Brand[] {
    const brands = vehicleBrands.filter((brand) =>
      brand.name.toLowerCase().includes(word.toLowerCase()),
    );

    return plainToInstance(Brand, brands);
  }
}
