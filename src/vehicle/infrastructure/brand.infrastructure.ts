import { Injectable } from '@nestjs/common';
import { vehicleBrands } from '../../core/database/data/vehicle-brands';
import { plainToInstance } from 'class-transformer';
import { VehicleBrand } from '../domain/entities/outbound/vehicle-brand';
import { BrandRepository } from '../domain/repositories/brand.repository';

@Injectable()
export class BrandInfrastructure implements BrandRepository {
  public filterBrands(word: string): VehicleBrand[] {
    const brands = vehicleBrands.filter((brand) =>
      brand.name.toLowerCase().includes(word.toLowerCase()),
    );

    return plainToInstance(VehicleBrand, brands);
  }
}
