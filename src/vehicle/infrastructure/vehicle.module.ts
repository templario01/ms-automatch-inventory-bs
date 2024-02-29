import { Module } from '@nestjs/common';
import { InventoryController } from './api/controllers/inventory.controller';
import { InventoryRepository } from '../domain/repositories/inventory.repository';
import { InventoryInfrastructure } from './inventory.infrastructure';
import { InventoryUseCase } from '../application/inventory.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { VehicleBrandController } from './api/controllers/vehicle-brand.controller';
import { BrandRepository } from '../domain/repositories/brand.repository';
import { BrandInfrastructure } from './brand.infrastructure';
import { VehicleBrandUseCase } from '../application/vehicle-brand.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController, VehicleBrandController],
  providers: [
    InventoryUseCase,
    VehicleBrandUseCase,
    { provide: InventoryRepository, useClass: InventoryInfrastructure },
    { provide: BrandRepository, useClass: BrandInfrastructure },
  ],
})
export class InventoryModule {}
