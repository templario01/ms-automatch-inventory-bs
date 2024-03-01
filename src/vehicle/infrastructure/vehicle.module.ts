import { Module } from '@nestjs/common';
import { InventoryController } from './api/controllers/inventory.controller';
import { IInventoryRepository } from '../domain/repositories/inventory.repository';
import { PrismaInventoryRepository } from './prisma-inventory.repository';
import { InventoryUseCase } from '../application/inventory.use-case';
import { PrismaModule } from '../../core/database/prisma.module';
import { VehicleBrandController } from './api/controllers/vehicle-brand.controller';
import { IBrandRepository } from '../domain/repositories/brand.repository';
import { PrismaBrandRepository } from './prisma-brand.repository';
import { VehicleBrandUseCase } from '../application/vehicle-brand.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [InventoryController, VehicleBrandController],
  providers: [
    InventoryUseCase,
    VehicleBrandUseCase,
    { provide: IInventoryRepository, useClass: PrismaInventoryRepository },
    { provide: IBrandRepository, useClass: PrismaBrandRepository },
  ],
})
export class InventoryModule {}
